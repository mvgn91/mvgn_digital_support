# MVGN Authority Map — Priority Hierarchy

> Define la prioridad absoluta entre capas del sistema. Versión compartida.

---

## 1. Prioridad absoluta

| Prioridad | Capa | Rol |
|-----------|------|-----|
| **P1** | **session-contract** | Comportamiento IA |
| **P2** | **kernel-spec** | Orquestación |
| **P3** | **recovery-protocol** | Resiliencia |
| **P4** | **finalization-protocol** | Finalización |
| **P5** | **system-rules** | Política |
| **P6** | **execution-engine** | Ejecución |

## 2. Tabla de resolución rápida

```
AUTHORITY_MAP = {
  "P1": "session-contract.md",
  "P2": "kernel-spec.md",
  "P3": "recovery-protocol.md",
  "P4": "finalization-protocol.md",
  "P5": "system-rules.md",
  "P6": "execution-engine.md",
  "resolution": {
    "contract_vs_all":            "P1 wins",
    "kernel_vs_recovery":         "P2 wins (unless CORRUPTED, then P3)",
    "kernel_vs_rules":            "P2 wins",
    "kernel_vs_engine":           "P2 wins",
    "recovery_vs_rules":          "P3 wins",
    "recovery_vs_engine":         "P3 wins",
    "finalization_vs_rules":      "P4 wins",
    "finalization_vs_engine":     "P4 wins",
    "rules_vs_engine":            "P5 wins",
    "human_vs_all":               "HUMAN wins (logged)"
  }
}
```

## 3. Regla final: override humano

Cualquier instrucción humana explícita puede override cualquier capa.

---

**Historial:**
- 2026-06-24: Versión compartida del Authority Map
