<#
.SYNOPSIS
    MVGN Agent Registration — auto-registro de identidad del agente IA en el runtime manifest.
.DESCRIPTION
    Cada agente (Kimchi, OpenCode, Freebuff, etc.) ejecuta este script al iniciar sesión
    para registrar su identidad, modelo y proveedor en mvgn-runtime.json.
    La telemetría lee esta información para mostrarla en el Timeline.
.PARAMETER Name
    Nombre del agente (ej: "Kimchi", "OpenCode", "Freebuff")
.PARAMETER Model
    Modelo de IA (ej: "deepseek-v4-flash", "gpt-4o", "claude-sonnet-4")
.PARAMETER Provider
    Proveedor (ej: "deepseek", "openai", "anthropic")
.PARAMETER Id
    (Opcional) ID único del agente. Default: "agent-{Name lowercase}"
.EXAMPLE
    .\tools\register-agent.ps1 -Name "Buffy" -Model "deepseek-v4-flash" -Provider "deepseek"
.EXAMPLE
    .\tools\register-agent.ps1 -Name "Kimchi" -Model "gpt-4o" -Provider "openai" -Id "agent-kimchi-pro"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$Name,
    
    [Parameter(Mandatory = $true)]
    [string]$Model,
    
    [Parameter(Mandatory = $true)]
    [string]$Provider,
    
    [Parameter(Mandatory = $false)]
    [string]$Id = ""
)

# Auto-generate ID if not provided
if (-not $Id) {
    $Id = "agent-$($Name.ToLower().Replace(' ', '-'))"
}

# Determine manifest path (runtime-state/mvgn-runtime.json or mvgn-runtime.json)
$manifestPaths = @(
    "runtime-state/mvgn-runtime.json",
    "mvgn-runtime.json"
)

$manifestPath = $null
foreach ($p in $manifestPaths) {
    if (Test-Path $p) {
        $manifestPath = $p
        break
    }
}

if (-not $manifestPath) {
    # Create new manifest at root
    $manifestPath = "mvgn-runtime.json"
    $manifest = @{
        runtime_version = "3.0.0"
        schema_version  = "1.0.0"
        profile         = "lite"
        capabilities    = @{
            telemetry      = $true
            traceability   = $true
            analytics      = $false
            event_history  = $true
        }
        actors          = @()
        skills          = @()
        policies        = @{
            feature_cost              = $true
            deprecation               = $true
            context_budget_protection = $true
        }
        adapters        = @()
    }
} else {
    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
}

# Check if agent already exists
$existingIdx = -1
for ($i = 0; $i -lt $manifest.actors.Count; $i++) {
    if ($manifest.actors[$i].id -eq $Id) {
        $existingIdx = $i
        break
    }
}

$actorEntry = @{
    id       = $Id
    type     = "ai"
    name     = $Name
    model    = $Model
    provider = $Provider
}

if ($existingIdx -ge 0) {
    # Update existing entry
    $manifest.actors[$existingIdx] = $actorEntry
    Write-Host "✓ Agent '$Name' updated in $manifestPath (id: $Id)"
} else {
    # Add new entry at the beginning (most recent first)
    $manifest.actors = @($actorEntry) + $manifest.actors
    Write-Host "✓ Agent '$Name' registered in $manifestPath (id: $Id)"
}

# Write manifest
$manifest | ConvertTo-Json -Depth 10 | Set-Content $manifestPath -Encoding UTF8

Write-Host "  Model: $Model"
Write-Host "  Provider: $Provider"
Write-Host ""
Write-Host "✅ Registration complete. Telemetry will now show this agent in the Timeline."
