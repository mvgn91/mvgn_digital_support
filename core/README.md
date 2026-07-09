# MVGN Core

> Capas compartidas entre todos los perfiles MVGN (Full, Lite, etc.).

Este directorio contiene los archivos de sistema que NO cambian entre perfiles:

| Archivo | Propósito |
|---------|-----------|
| `authority-map.md` | Jerarquía de prioridad entre capas |
| `kernel-spec.md` | Especificación del Kernel (orquestador) |
| `session-contract.md` | Contrato de comportamiento de la IA |
| `mvgn-loader.ps1` | Cargador de contexto multiformato |

Cada perfil (Full, Lite) referencia estos archivos y añade sus propias capas específicas.
