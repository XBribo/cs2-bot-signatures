# NadeSystem

- **Last updated:** October 29, 2026 at 12:55:22 AM GMT
- Repository: https://github.com/ed0ard/CS2-Bot-NadeSystem

## Sources

- [NadeSystem.cs](https://github.com/ed0ard/CS2-Bot-NadeSystem/blob/main/NadeSystem.cs)

## Signatures

### NadeSystem.smokeCreate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 4C 89 C1 48 89 E5 41 57 41 56 49 89 FE 41 55 45 89 CD 41 54 4D 89 C4` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 57 41 56 41 57 48 83 EC ? 48 8B B4 24 ? ? ? ? 4D 8B F8` |

### NadeSystem.heCreate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 4C 89 C1 48 89 E5 41 57 49 89 FF 41 56 49 89 D6` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 57 48 83 EC ? 48 8B AC 24 ? ? ? ? 49 8B F8` |

### NadeSystem.molotovCreate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 41 56 41 55 41 54 49 89 FC 53 48 81 EC ? ? ? ? 4C 8D 35` |
| ✅ | Windows | server | `48 8B C4 48 89 58 ? 48 89 70 ? 48 89 78 ? 4C 89 40 ? 55 41 54 41 55 41 56 41 57 48 8D 6C 24` |
