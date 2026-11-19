# BotVision

- **Last updated:** November 19, 2026 at 5:22:30 PM GMT
- Repository: https://github.com/XBribo/CS2-Bot-Vision
- Gamedata: [https://github.com/XBribo/CS2-Bot-Vision/blob/main/configs/addons/BotVision/gamedata.json](https://github.com/XBribo/CS2-Bot-Vision/blob/main/configs/addons/BotVision/gamedata.json)

## Signatures

### CBotManager::IsVisibleThroughSmoke

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 49 89 D7 41 56 49 89 F6 41 55 48 8D 35` |
| ✅ | Windows | server | `4C 8B DC 49 89 5B ? 49 89 6B ? 49 89 73 ? 49 89 7B ? 41 54 41 56 41 57 48 81 EC ? ? ? ? 49 C7 43 ? ? ? ? ? 48 8D 05 ? ? ? ? 49 89 43 ? 49 8B E8` |

### g_AutoList_SmokeProj_Head_Server

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B 1D ? ? ? ? 48 85 DB 0F 84 ? ? ? ? 49 89 FD 49 89 F4` |
| ✅ | Windows | server | `48 8B 1D ? ? ? ? 48 8B EA 0F 29 74 24` |

### GetSmokeDensityInLine

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 48 8D 45 ? 41 55 49 89 FD 41 54 49 89 F4 53 48 89 D3 48 8D 55 ? 48 83 EC ? 66 48 0F 6E FA` |
| ✅ | Windows | server | `40 55 53 56 41 55 41 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 0F 29 BC 24` |

### SmokeVolume::DensityVisitor

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8D 05 ? ? ? ? 66 48 0F 3A 22 F8 01 0F 29 BD ? ? ? ? 48 85 DB` |
| ✅ | Windows | server | `48 8D 0D ? ? ? ? 44 0F 29 8C 24 ? ? ? ? 45 33 E4 F3 44 0F 10 0D` |

### CHEGrenadeProjectile::Detonate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 53 48 89 FB 48 83 EC ? E8 ? ? ? ? 48 85 C0 0F 84 ? ? ? ? 4C 8D 3D` |
| ✅ | Windows | server | `48 8B C4 55 57 48 8D 68 ? 48 81 EC ? ? ? ? 48 89 58 ? 48 89 70` |

### BulletPelletTrace

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 49 89 FF 41 56 48 8D 85 ? ? ? ? 45 89 C6` |
| ✅ | Windows | server | `48 89 54 24 ? 55 56 41 57 48 8D AC 24 ? ? ? ? B8` |

### BulletPelletTraceResult

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 66 41 0F 7E C7 41 56 41 55 49 89 FD` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 57 48 81 EC ? ? ? ? 48 8B E9 0F 29 74 24` |

### CCSPlayer_WeaponServices::GetSlot

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 53 89 F3 48 83 EC ? 48 63 77` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 48 89 7C 24 ? 41 54 41 56 41 57 48 83 EC ? 45 33 E4 45 8B F0` |

### CCSBot::IsVisiblePos

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 4C 8D BD ? ? ? ? 41 56 41 55` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 48 89 7C 24 ? 55 41 54 41 55 41 56 41 57 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 48 8D 05` |

### CCSBot::IsVisiblePlayer

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 89 E5 41 57 4C 8D 7D ? 41 56 41 89 D6` |
| ✅ | Windows | server | `48 89 5C 24 ? 44 88 44 24 ? 55 56 57 41 54 41 55 41 56 41 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8D 05` |

### CBaseCSGrenadeProjectile::PublishEffect

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 49 89 D5 41 54 53 48 89 FB 48 89 F7 48 81 EC ? ? ? ? E8 ? ? ? ? 49 89 C4 48 85 C0` |
| ✅ | Windows | server | `48 89 5C 24 ? 55 56 57 48 83 EC ? 48 8B E9 49 8B F8 48 8D 4C 24 ?` |

### SmokeVolume::Traverse

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 49 89 D5 41 54 49 89 F4 53 48 89 FB 48 81 EC ? ? ? ? F3 0F 7E 87 D4 00 00 00` |
| ✅ | Windows | server | `48 8B C4 48 89 58 ? 48 89 78 ? 55 41 56 41 57 48 8D A8 ? ? ? ?` |

### SmokeVolume::PointDensity

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 83 7F 70 00 0F 84 ? ? ? ? 55 48 89 F2 48 89 E5 53 48 89 FB 48 8D 7D ? 48 83 EC ? 48 89 DE E8 ? ? ? ? 0F B6 45 ? 0F B6 4D ? 0F B6` |
| ✅ | Windows | server | `40 53 48 83 EC ? 48 83 79 70 00 48 8B D9 0F 29 74 24 ? 0F 57 F6 0F 84 ? ? ? ?` |

### SmokeVolume::InitializeReady

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 66 41 0F 7E C7 41 56 41 55 41 54 49 89 FC 53 48 83 EC ? C6 07 01 48 8B 06 48 89 87 D4 00 00 00 8B 46 08 89 87 DC 00 00 00 48` |
| ✅ | Windows | server | `48 89 5C 24 ? 57 48 83 EC ? C6 01 01 48 8B F9 F2 0F 10 02 F2 0F 11 81 D4 00 00 00 8B 42 08 BA 10 B0 10 00` |

### CSmokeGrenadeProjectile::Ready

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 15 ? ? ? ? B9 01 00 00 00 48 89 E5 41 57 41 56 41 55 41 54 53 48 89 FB 4C 8D A3 18 0E 00 00` |
| ✅ | Windows | server | `48 8B C4 55 48 8D 68 ? 48 81 EC ? ? ? ? 48 89 58 ? 4C 8D 05 ? ? ? ? 48 89 70 ? 48 8D 99 40 0B 00 00` |
