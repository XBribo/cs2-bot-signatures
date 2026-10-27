# BotHider

- Last updated: 2026-10-27T08:30:35.747Z
- Repository: https://github.com/XBribo/CS2-Bot-Hider
- Gamedata: [https://github.com/XBribo/CS2-Bot-Hider/blob/main/configs/addons/BotHider/gamedata.json](https://github.com/XBribo/CS2-Bot-Hider/blob/main/configs/addons/BotHider/gamedata.json)

## Signatures

### UTIL_Remove

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 89 FE 48 85 FF 74 ? 48 8D 05 ? ? ? ? 48` |
| ✅ | Windows | server | `48 85 C9 74 ? 48 8B D1 48 8B 0D ? ? ? ?` |

### CCSBotManager::MaintainBotQuota

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 31 F6 48 89 E5 41 57 49 89 FF` |
| ✅ | Windows | server | `40 55 41 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 4C 8B F9 FF 15` |

### CBaseIssue::CountPotentialVoters

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 49 89 FE 41 55 41 54 53 31 DB 48 83 EC ? 4C 8D 2D ? ? ? ? 49 8B 45 ? 44 8B 60 ? 45 85 E4 0F 8E ? ? ? ? C7 45 ? ? ? ? ? 31 FF E8 ? ? ? ? 49 8B 55 ? 44 8B 62 ? 48 85 C0 0F 84 ? ? ? ? 45 31 FF 44 39 E3 0F 85` |
| ✅ | Windows | server | `48 89 5C 24 ? 48 89 74 24 ? 57 41 56 41 57 48 83 EC ? 48 8B 05 ? ? ? ? 45 33 F6` |

### CCSPlayerController::HandleCommand_JoinTeam

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 41 89 F4 53 48 89 FB 48 81 EC ? ? ? ? 48 8D 05` |
| ✅ | Windows | server | `48 89 5C 24 ? 44 88 44 24 ? 55 56 57 41 54 41 55 41 56 41 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8B 3D` |

### MpHumanTeam_ApplyRestriction

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 53 48 81 EC ? ? ? ? E8 ? ? ? ? 89 C3` |
| ✅ | Windows | server | `40 55 57 48 8D 6C 24 ? 48 81 EC ? ? ? ? 48 8B 05 ? ? ? ? 48 8D 0D` |

### CNetworkGameServer::PackEntities

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | engine2 | `55 48 89 E5 41 57 41 89 D7 41 56 49 89 CE 41 55 41 54` |
| ✅ | Windows | engine2 | `4C 89 4C 24 ? 44 89 44 24 ? 48 89 54 24 ? 48 89 4C 24 ? 55 53 56 57 41 54 41 55 41 56 41 57 48 8D AC 24 ? ? ? ? B8 ? ? ? ? E8 ? ? ? ? 48 2B E0 4C 8B E9` |

### CCSGameRules::EndMatchState

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 57 41 56 41 55 41 54 53 48 81 EC ? ? ? ? 48 89 BD ? ? ? ? E8` |
| ✅ | Windows | server | `48 8B C4 55 41 57 48 8D A8 ? ? ? ? 48 81 EC ? ? ? ? 80 3D` |

### CSPlayerController::ScriptIsBot

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 BE 01 00 00 00 48 89 E5 41 56 41 55 41 54 49 89 FC 53 48 83 EC 20 48 8D 1D ? ? ? ? 8B 3B E8 ? ? ? ? 84 C0 0F 85 43 01 00 00` |
| ✅ | Windows | server | `40 55 56 41 56 48 83 EC 50 48 8B F1 BA 01 00 00 00 8B 0D ? ? ? ? FF 15 ? ? ? ? 4C 8D 35 ? ? ? ? 84 C0 74 24 8B 0D ? ? ? ? 4C 8D 0D ? ? ? ? 4C 8D 05 ? ? ? ? 4C 89 74 24 20 BA 01 00 00 00 FF 15 ? ? ? ? 48 89 5C 24 70 48 89 BC 24 80 00 00 00 E8 ? ? ? ? 48 8B D0 48 8D 4C 24 30 48 8B E8 E8 ? ? ? ? E8 ? ? ? ? 48 85 C0 75 0C 48 8D 15 ? ? ? ? E9 67 01 00 00` |
