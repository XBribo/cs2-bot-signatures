# BotState

- **Last updated:** October 31, 2026 at 1:04:01 AM GMT
- Repository: https://github.com/ed0ard/CS2-Smarter-Bot

## Sources

- [BotFovSignatures.cs](https://github.com/ed0ard/CS2-Smarter-Bot/blob/main/BotFovSignatures.cs)
- [BotState.Bomb.cs](https://github.com/ed0ard/CS2-Smarter-Bot/blob/main/BotState.Bomb.cs)
- [BotState.Flashbang.cs](https://github.com/ed0ard/CS2-Smarter-Bot/blob/main/BotState.Flashbang.cs)
- [BotState.FovPatches.cs](https://github.com/ed0ard/CS2-Smarter-Bot/blob/main/BotState.FovPatches.cs)

## Signatures

### BotState.FOV.Player

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 4C 8D 7D ? 41 56 41 89 D6 41 55 4C 89 FA 41 54 49 89 FC 53 48 8D 3D ? ? ? ? 48 89 F3 48 8D 35 ? ? ? ? 48 83 EC ? 48 89 45 ? 48 8D 05 ? ? ? ? 48 89 4D ?` |
| ✅ | Windows | server | `48 89 5C 24 ? 44 88 44 24 ? 55 56 57 41 54 41 55 41 56 41 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8D 05 ? ? ? ? 48 C7 45 ? ? ? ? ? 48 89 45 ? ? ? ? ? 0F 10 45 ? 48 8D 05 ? ? ? ? 4C 8B F2` |

### BotState.FOV.Position

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 4C 8D BD ? ? ? ? 41 56 41 55 41 54 49 89 CC 53 48 89 FB 48 8D 3D ? ? ? ? 48 81 EC ? ? ? ? 48 89 B5 ? ? ? ? 89 95 ? ? ? ? 4C 89 FA` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 48 89 7C 24 ? 55 41 54 41 55 41 56 41 57 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 48 8D 05 ? ? ? ? 48 C7 45 ? ? ? ? ? 48 89 45 ? ? ? ? ? 0F 10 45 ? 48 8D 05 ? ? ? ? 4C 8B E2` |

### BotState.DefuseBomb

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8D B7 00 04 00 00 E9 ? ? ? ?` |
| ✅ | Windows | server | `48 8D 91 08 04 00 00 E9 ? ? ? ?` |

### BotState.BotBlind

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 35 ? ? ? ? B8 ? ? ? ? F3 0F 5A D2` |
| ✅ | Windows | server | `40 53 48 81 EC ? ? ? ? 0F 29 B4 24 ? ? ? ? 48 8D 15` |

### BotState.IsVisiblePos_IgnoreFOV

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `80 BD ? ? ? ? ? 74 ? 48 8B 7B ? 48 8B B5` |
| ✅ | Windows | server | `48 8D 05 ? ? ? ? 48 C7 45 ? ? ? ? ? 48 89 45 ? 45 0F B6 E8` |

### BotState.IsVisiblePlayer_IgnoreFOV

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `45 84 F6 0F 85 ? ? ? ? 48 89 DF FF 90` |
| ✅ | Windows | server | `48 8D 05 ? ? ? ? 48 C7 45 ? ? ? ? ? 48 89 45 ? 41 0F B6 D8` |
