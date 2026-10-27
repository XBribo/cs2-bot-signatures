# BotController

- Last updated: 2026-10-27T08:30:35.747Z
- Repository: https://github.com/XBribo/CS2-Bot-Controller
- Gamedata: [https://github.com/XBribo/CS2-Bot-Controller/blob/main/configs/addons/BotController/gamedata.json](https://github.com/XBribo/CS2-Bot-Controller/blob/main/configs/addons/BotController/gamedata.json)

## Signatures

### CCSBot::EquipBestWeapon

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 56 41 55 41 54 53 48 89 FB 48 83 EC ? 40 84 F6` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 57 48 83 EC ? 48 8B D9 84 D2 75 ? 4C 8D 81 ? ? ? ? 48 8D 0D ? ? ? ? 48 8D 54 24 ? E8 ? ? ? ? 80 38 ? 75 ? 48 8D 54 24 ? 48 8D 8B ? ? ? ? E8 ? ? ? ? 48 8D 93 ? ? ? ? 48 8B C8 E8 ? ? ? ? F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 87 ? ? ? ? 48 8B 43 ? 33 D2 41 B8` |

### CCSBot::EquipPistol

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 53 48 89 FB 48 83 EC ? 40 84 F6 75 ? F3 0F 10 8F` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 57 48 83 EC ? 48 8B D9 84 D2 75 ? 4C 8D 81 ? ? ? ? 48 8D 0D ? ? ? ? 48 8D 54 24 ? E8 ? ? ? ? 80 38 ? 75 ? 48 8D 54 24 ? 48 8D 8B ? ? ? ? E8 ? ? ? ? 48 8D 93 ? ? ? ? 48 8B C8 E8 ? ? ? ? F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 87 ? ? ? ? 48 8B 05 ? ? ? ? 80 78 ? ? 0F 84` |

### CCSPlayer_WeaponServices::SelectItem

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 89 D6 41 55 49 89 FD 41 54 49 89 F4 53 48 83 EC` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 57 48 83 EC ? 41 8B E8 48 8B DA 48 8B F9 E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B CF E8` |

### CCSPlayer_WeaponServices::GetSlot

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 53 89 F3 48 83 EC ? 48 63 77` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 6C 24 ? 48 89 74 24 ? 48 89 7C 24 ? 41 54 41 56 41 57 48 83 EC ? 45 33 E4 45 8B F0 44 8B FA 48 8B E9 41 8B FC 44 39 61` |

### CCSBot::Update

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 8D 35 ? ? ? ? 48 89 E5 41 57 41 56 41 55 4C 8D AD ? ? ? ? 41 54 4C 89 EA 53 48 89 FB 48 81 EC` |
| ✅ | Windows | server | `40 55 56 57 41 54 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 48 8D 05 ? ? ? ? C6 81 ? ? ? ? ? 48 89 44 24 ? 4C 8D 45 ? 48 8D 05` |

### CCSBot::Upkeep

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 8D 35 ? ? ? ? 48 89 E5 41 55 41 54 48 8D 55 ? 53 48 89 FB 48 8D 3D ? ? ? ? 48 83 EC ? 48 89 45 ? 48 8D 05` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 48 89 7C 24 ? 55 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8D 05` |

### BuyState::OnUpdate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8D 05 ? ? ? ? 48 8B 00 80 B8 ? ? ? ? ? 0F 84 ? ? ? ? 55` |
| ✅ | Windows | server | `48 89 54 24 ? 48 89 4C 24 ? 55 53 41 55 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 48 8B 05 ? ? ? ? 4C 8B EA 48 8B D9 80 B8` |

### CCSBot::UpdateLookAngles

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 8D 35 ? ? ? ? 48 89 E5 41 55 4C 8D 6D ? 41 54 53` |
| ✅ | Windows | server | `40 55 53 56 41 56 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8D 05 ? ? ? ? 48 C7 45 ? ? ? ? ? 48 89 45 ? 4C 8D 45 ? 0F 10 45 ? 48 8D 05` |

### CCSPlayerPawn::SetEyeAngles

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 49 89 FF 48 89 F7 41 56 41 55 41 54 53 48 81 EC ? ? ? ? E8` |
| ✅ | Windows | server | `48 89 7C 24 ? 55 48 8B EC 48 81 EC ? ? ? ? 48 8B F9 48 8D 4D ? E8 ? ? ? ? F2 0F 10 87 ? ? ? ? 48 8B CF 8B 87 ? ? ? ? F2 0F 11 87` |

### CCSPlayer_MovementServices::ProcessMovement

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 49 89 F5 41 54 53 48 89 FB 48 83 EC ? 48 8B 7F` |
| ✅ | Windows | server | `40 57 41 57 48 81 EC ? ? ? ? 48 83 79 ? ? 4C 8B FA 48 8B F9 75 ? E8 ? ? ? ? 4C 8B 4F ? 41 8B 91 ? ? ? ? 83 FA ? 0F 84` |

### CBasePlayerController::OnSimulateUserCommands

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D 05 ? ? ? ? 48 8D 35 ? ? ? ? 48 89 E5 41 57 41 56 41 55 41 54 53 48 89 FB 48 8D 3D` |
| ✅ | Windows | server | `40 55 53 56 57 41 55 41 56 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 4C 8B F1 48 C7 44 24 ? ? ? ? ? 48 8D 1D ? ? ? ? 45 33 ED 48 89 5C 24` |

### DropReleasePose::OuterDrop

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 85 F6 0F 84 ? ? ? ? 55 48 89 E5 41 57 41 56 49 89 F6 41 55 41 54 53 48 83 EC ? 48 8B 46` |
| ✅ | Windows | server | `48 89 5C 24 ? 4C 89 4C 24 ? 44 89 44 24 ? 55 56 57 41 54 41 55 41 56 41 57 48 8D 6C 24` |

### DropReleasePose::BuildTransform

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 49 89 FE 41 55 41 54 49 89 F4 53 48 81 EC` |
| ✅ | Windows | server | `48 89 74 24 ? 55 57 41 55 41 56 41 57 48 8D AC 24 ? ? ? ? 48 81 EC ? ? ? ? 4C 8B EA` |
