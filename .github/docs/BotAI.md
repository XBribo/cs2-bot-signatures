# BotAI

- **Last updated:** November 7, 2026 at 12:05:48 PM GMT
- Repository: https://github.com/ed0ard/CS2-BotAI

## Sources

- [WindowsPatchDefinitions.cs](https://github.com/ed0ard/CS2-BotAI/blob/main/WindowsPatchDefinitions.cs)
- [LinuxPatchDefinitions.cs](https://github.com/ed0ard/CS2-BotAI/blob/main/LinuxPatchDefinitions.cs)

## Signatures

### BotAI.HasVisitedEnemySpawn

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 C7 83 20 02 00 00 00 00 00 00 0F 2E A3 00 06 00 00 C6 83 F5 05 00 00 00 0F 8A ? ? ? ? 0F 85 ? ? ? ?` |
| ✅ | Windows | server | `4C 89 B7 ? ? 00 00 48 8D 8C 24 ? ? ? ? 44 88 B7 FD 05 00 00 E8 ? ? ? ? F3 0F 10 87 ? ? 00 00 48 8B F0` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `C6 83 F5 05 00 00 00` | `C6 83 F5 05 00 00 01` | `C6 83 F5 05 00 00 00` |
| ✅ | Windows | 15 | `44 88 B7 FD 05 00 00` | `C6 87 FD 05 00 00 01` | `44 88 B7 FD 05 00 00` |

### BotAI.GameState_Reset

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2E 43 18 C7 43 0C 00 00 00 00 0F 8A ? ? ? ? 0F 85 ? ? ? ? 48 8B 05 ? ? ? ? C6 43 6C 00 C7 43 68 FF FF FF FF` |
| ✅ | Windows | server | `48 8D 4C 24 ? 45 33 F6 44 89 77 0C E8 ? ? ? ? F3 0F 10 47 18 48 8B F0 0F 2E 00` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 4 | `C7 43 0C 00 00 00 00` | `0F 1F 80 00 00 00 00` | `C7 43 0C 00 00 00 00` |
| ✅ | Windows | 8 | `44 89 77 0C` | `90 90 90 90` | `44 89 77 0C` |

### BotAI.Idle_IsSafeAlwaysFalse

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `E8 ? ? ? ? 84 C0 0F 85 ? ? ? ? 4C 8D B3 F8 50 00 00 4C 89 F7 E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 80 BB 88 52 00 00 00` |
| ✅ | Windows | server | `74 28 33 D2 48 8B CE E8 ? ? ? ? 84 C0 75 1A` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `0F 85 ? ? ? ?` | `90 90 90 90 90 90` | `0F 85 2C 03 00 00` |
| ✅ | Windows | 0 | `74 28` | `EB 28` | `74 28` |

### BotAI.EscapeFromBomb_OnEnter_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `C6 83 4C 4F 00 00 00 48 89 DF C6 83 74 4F 00 00 00 48 8B 5D F8 C9 E9 ? ? ? ?` |
| ✅ | Windows | server | `C6 83 ? ? 00 00 00 C6 83 ? ? 00 00 00 48 83 C4 20 5B E9` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 22 | `E9 ? ? ? ?` | `C3 90 90 90 90` | `E9 7A 22 F6 FF` |
| ✅ | Windows | 19 | `E9 ? ? ? ?` | `C3 90 90 90 90` | `E9 CB 42 F9 FF` |

### BotAI.EscapeFromBomb_OnUpdate_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 85 C0 0F 84 ? ? ? ? 48 89 DF 49 89 C4 E8 ? ? ? ? 31 F6 48 89 DF E8 ? ? ? ?` |
| ✅ | Windows | server | `75 0F 48 8B 5C 24 50 48 83 C4 40 5F E9 ? ? ? ? E8 ? ? ? ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 15 | `E8 ? ? ? ?` | `90 90 90 90 90` | `E8 D2 BB F6 FF` |
| ✅ | Windows | 17 | `E8 ? ? ? ?` | `90 90 90 90 90` | `E8 A8 15 F9 FF` |

### BotAI.EscapeFromFlames_OnEnter_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `C6 83 4C 4F 00 00 00 48 89 DF C6 83 74 4F 00 00 00 E8 ? ? ? ? F3 0F 10 1D ? ? ? ? 49 C7 44 24 20 00 00 00 00 41 0F 2E 5C 24 14` |
| ✅ | Windows | server | `48 8B CB 40 88 BB ? ? 00 00 40 88 BB ? ? 00 00 E8 ? ? ? ? F3 0F 10 0D` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 17 | `E8 ? ? ? ?` | `90 90 90 90 90` | `E8 98 21 F6 FF` |
| ✅ | Windows | 17 | `E8 ? ? ? ?` | `90 90 90 90 90` | `E8 E5 41 F9 FF` |

### BotAI.PlantBombLookAtPriorityLow

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8D 55 C8 4C 89 E7 45 31 C9 F3 0F 10 40 08 45 31 C0 B9 02 00 00 00 48 89 5D C8 F3 0F 10 0D ? ? ? ? 48 8D 35 ? ? ? ? F3 0F 11 45 D0` |
| ✅ | Windows | server | `41 B9 02 00 00 00 C6 44 24 38 00 F3 0F 10 0D` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `B9 02 00 00 00` | `B9 00 00 00 00` | `B9 02 00 00 00` |
| ✅ | Windows | 0 | `41 B9 02 00 00 00` | `41 B9 00 00 00 00` | `41 B9 02 00 00 00` |

### BotAI.DefuseBombLookAtPriorityLow

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `4C 89 E2 45 31 C9 45 31 C0 F3 0F 10 05 ? ? ? ? B9 02 00 00 00 48 89 DF 48 8D 35 ? ? ? ? E8 ? ? ? ?` |
| ✅ | Windows | server | `41 B9 02 00 00 00 C6 44 24 38 00 4C 8B C7` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 17 | `B9 02 00 00 00` | `B9 00 00 00 00` | `B9 02 00 00 00` |
| ✅ | Windows | 0 | `41 B9 02 00 00 00` | `41 B9 00 00 00 00` | `41 B9 02 00 00 00` |

### BotAI.DefuseBomb_SkipIsVisibleCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F C8 0F 86 ? ? ? ? 31 C9 31 D2 4C 89 E6 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 83 C4 68 48 89 DF` |
| ✅ | Windows | server | `0F 2F C8 0F 86 ? ? ? ? 45 33 C9 45 33 C0 48 8B D3 48 8B CE E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B CE` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 26 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 F3 F7 FF FF` |
| ✅ | Windows | 28 | `0F 84 D9 00 00 00` | `90 90 90 90 90 90` | `0F 84 D9 00 00 00` |

### BotAI.AttackState_SkipFireRateCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 8B AC 00 00 00 0F 82 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B 7B 18` |
| ✅ | Windows | server | `0F 2F 8B ? ? 00 00 0F 82` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `0F 82 ? ? ? ?` | `90 90 90 90 90 90` | `0F 82 44 03 00 00` |
| ✅ | Windows | 7 | `0F 82 87 00 00 00` | `90 90 90 90 90 90` | `0F 82 87 00 00 00` |

### BotAI.SprayAllDistances_ForceHoldTrigger

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 83 A0 00 00 00 66 0F EF C9 0F 2F C1 76 0C 49 8B 45 00 0F 2F 40 30 41 0F 97 C4 48 8B 83 98 00 00 00` |
| ✅ | Windows | server | `76 12 48 8B 05 ? ? ? ? 0F 2F 40 30 76 05 40 B5 01 EB 03 40 32 ED` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 25 | `41 0F 97 C4` | `45 31 E4 90` | `41 0F 97 C4` |
| ✅ | Windows | 15 | `40 B5 01` | `40 32 ED` | `40 B5 01` |

### BotAI.AttackState_SkipSteadyFireShortcut

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `BA 01 00 00 00 48 89 DF 48 89 C6 E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 89 DF E8 ? ? ? ?` |
| ✅ | Windows | server | `0F B6 F0 84 C0 74 3C 48 8B 4B 18 48 8B 11 FF 92 90 00 00 00` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 AD FA FF FF` |
| ✅ | Windows | 5 | `74 3C` | `90 90` | `74 3C` |

### BotAI.AttackState_SkipZoomFireShortcut

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 83 BB C8 05 00 00 14` |
| ✅ | Windows | server | `FF 90 ? ? 00 00 84 C0 74 15 48 8D 8B ? ? 00 00 48 89 AB` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 CF 00 00 00` |
| ✅ | Windows | 8 | `74 15` | `90 90` | `74 15` |

### BotAI.AttackState_SkipSniperSpreadCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 66 41 0F 6E EE 0F 2F E8 0F 87 ? ? ? ? 48 89 DF E8 ? ? ? ? 48 89 DF F3 0F 10 40 08` |
| ✅ | Windows | server | `84 C0 74 0A F3 0F 10 ? ? ? ? ? EB 08 F3 0F 10 ? ? ? ? ? ? 0F 2F ? 0F 87 ? ? ? ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 16 | `0F 87 ? ? ? ?` | `90 90 90 90 90 90` | `0F 87 12 FE FF FF` |
| ✅ | Windows | 26 | `0F 87 ? ? ? ?` | `90 90 90 90 90 90` | `0F 87 34 02 00 00` |

### BotAI.AttackState_DodgeDuringReload

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `E8 ? ? ? ? 48 8B 43 08 0F 28 C8 66 41 0F 6E C5 F3 0F 59 40 08 0F 2F C8 41 0F 97 44 24 44 48 81 C4 A8 01 00 00` |
| ✅ | Windows | server | `E9 ? ? ? ? 0F 2F BB ? 00 00 00 76 74` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 25 | `41 0F 97 44 24 44` | `41 C6 44 24 44 01` | `41 0F 97 44 24 44` |
| ✅ | Windows | 12 | `76 74` | `EB 74` | `76 74` |

### BotAI.SniperCrouchDodge_jb

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `66 41 0F 6E FE F3 0F 10 0D ? ? ? ? 0F 2F F8 66 0F EF C0 41 0F 93 44 24 42 E8 ? ? ? ? 48 8B 43 08 0F 28 C8` |
| ✅ | Windows | server | `0F 2F BB ? 00 00 00 0F 28 7C 24 30 76 74` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 20 | `41 0F 93 44 24 42` | `41 C6 44 24 42 01` | `41 0F 93 44 24 42` |
| ✅ | Windows | 12 | `76 74` | `90 90` | `76 74` |

### BotAI.LowSKill_JumpChance0

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 41 0F 5C 86 00 06 00 00 0F 2F C5 0F 83 ? ? ? ? BE 03 00 00 00 31 FF E8 ? ? ? ? E9 ? ? ? ?` |
| ✅ | Windows | server | `0F 57 C9 48 8B CF E8 ? ? ? ? BA 03 00 00 00 84 C0 74 05 BA 02 00 00 00 33 C9 FF 15 ? ? ? ? 80 7D 43 00` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `BE 03 00 00 00` | `BE 02 00 00 00` | `BE 03 00 00 00` |
| ✅ | Windows | 11 | `BA 03 00 00 00` | `BA 02 00 00 00` | `BA 03 00 00 00` |

### BotAI.AttackState_DodgeChance100_Always

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 89 DF F3 0F 11 85 48 FE FF FF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 44 8B 2D ? ? ? ? 45 89 EE` |
| ✅ | Windows | server | `0F 28 F0 F3 0F 59 35 ? ? ? ? 76 ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 B8 02 00 00` |
| ✅ | Windows | 11 | `76 ?` | `EB 11` | `76 14` |

### BotAI.AttackState_RetreatOnSniper_Disable

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `80 BB 99 5C 00 00 00 0F 85 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0` |
| ✅ | Windows | server | `74 ? 48 8B CE E8 ? ? ? ? 84 C0 74 ? 48 8B CE E8 ? ? ? ? 84 C0` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `0F 85 ? ? ? ?` | `90 90 90 90 90 90` | `0F 85 96 05 00 00` |
| ✅ | Windows | 0 | `74` | `EB` | `74` |

### BotAI.AllSkill_KeepMoving_WhenSeeSniper

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 05 ? ? ? ? 76 0D 80 BB C4 05 00 00 00 0F 85 ? ? ? ? 0F B6 05 ? ? ? ? 84 C0 0F 84 ? ? ? ?` |
| ✅ | Windows | server | `0F 2F 05 ? ? ? ? 76 0D 80 BF ? ? 00 00 00 0F 85` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `76 0D` | `90 90` | `76 0D` |
| ✅ | Windows | 7 | `76 0D` | `90 90` | `76 0D` |

### BotAI.AttackState_CanStrafe_jne

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 8B AC 00 00 00 0F 82 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B 7B 18` |
| ✅ | Windows | server | `0F 2F 8B ? ? 00 00 0F 82 ? ? ? ? 48 8B CB E8 ? ? ? ? 84 C0 74 7B` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 23 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 34 03 00 00` |
| ✅ | Windows | 23 | `74 7B` | `90 90` | `74 7B` |

### BotAI.SniperDodge_SkipIsSniper_DodgeA

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 44 8B 35 ? ? ? ? F3 0F 10 0D ? ? ? ? 66 0F EF C0 E8 ? ? ? ? 66 41 0F 6E D6 0F 2F D0 77 ?` |
| ✅ | Windows | server | `84 F6 75 6A 48 8B 05` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 10 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 80 02 00 00` |
| ✅ | Windows | 2 | `75 6A` | `90 90` | `75 6A` |

### BotAI.Vision_AlwaysWatchApproachPoints

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 4C 8D 6D A8 0F 85 ? ? ? ? 0F 2F 05 ? ? ? ? 0F 86 ? ? ? ? 48 C7 43 08 00 00 00 00` |
| ✅ | Windows | server | `80 BF ? ? 00 00 00 75 25 0F 2F` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 12 | `0F 85 ? ? ? ?` | `E9 00 00 00 00 90` | `0F 85 33 02 00 00` |
| ✅ | Windows | 7 | `75 25` | `EB 25` | `75 25` |

### BotAI.Vision_ApproachBody_SkipSkillCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `49 8B 46 08 F3 0F 10 48 0C 0F 2F 0D ? ? ? ? 0F B6 43 43 0F 86 ? ? ? ? 41 80 BE 99 5C 00 00 00 74 27` |
| ✅ | Windows | server | `F3 0F 10 40 0C 0F 2F ? 76 ? 80 BF ? 5C 00 00 00 74 ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 20 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 54 02 00 00` |
| ✅ | Windows | 8 | `76 ?` | `90 90` | `76 33` |

### BotAI.Vision_ApproachBody_SkipHidingSpotCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 74 27 84 C0 0F 85 ? ? ? ? 83 7B 08 01 B8 02 00 00 00` |
| ✅ | Windows | server | `80 BF ? 5C 00 00 00 74 ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 8 | `74 27` | `90 90` | `74 27` |
| ✅ | Windows | 7 | `74 ?` | `90 90` | `74 2A` |

### BotAI.Vision_SkipIsMovingGate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 4C 8D 6D A8 0F 85 ? ? ? ? 0F 2F 05 ? ? ? ? 0F 86 ? ? ? ? 48 C7 43 08 00 00 00 00` |
| ✅ | Windows | server | `0F 2F 35 ? ? ? ? 77 ? 49 8B ? 48 8B CF E8 ? ? ? ? 84 C0 75 ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 25 | `0F 86 ? ? ? ?` | `E9 00 00 00 00 90` | `0F 86 D6 00 00 00` |
| ✅ | Windows | 7 | `77 ?` | `90 90` | `77 0F` |

### BotAI.Vision_AlwaysEnterApproachBody

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 59 4D C4 F3 0F 58 C1 66 0F EF C9 0F 2F C8 0F 86 ? ? ? ? 66 0F 1F 44 00 00 4C 8D 25 ? ? ? ?` |
| ✅ | Windows | server | `84 C0 75 ? ? C7 ? 08 00 00 00 00 E9 ? ? ? ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 16 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 E0 FD FF FF` |
| ✅ | Windows | 2 | `75` | `EB` | `75` |

### BotAI.IsNoticable_AlwaysTrue

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 56 41 89 D6 41 55 41 54 49 89 FC 48 89 F7 53 48 89 F3 48 83 EC 20 E8 ? ? ? ? 48 85 C0 74 2D` |
| ✅ | Windows | server | `48 89 5C 24 ? 56 57 41 56 48 81 EC ? ? 00 00 0F 29 74 24 ? 4C 8B F1 0F 29 7C 24 ? 48 8B CA 44 0F 29 44 24 ? 41 0F B6 D8 44 0F 29 4C 24 ? 48 8B F2 E8` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 0 | `55 48 89 E5` | `B0 01 C3 90` | `55 48 89 E5` |
| ✅ | Windows | 0 | `48 89 5C` | `B0 01 C3` | `48 89 5C` |

### BotAI.Upkeep_BotCOS_ZeroDrift

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 49 8B 45 00 F3 0F 59 40 30 E8 ? ? ? ? 49 8B 45 00 F3 0F 59 45 ? F3 0F 58 83 64 59 00 00 F3 0F 11 83 64 59 00 00` |
| ✅ | Windows | server | `F3 0F 10 35 ? ? ? ? 48 8B 05 ? ? ? ? F3 0F 10 40 30 F3 0F 59 05 ? ? ? ? E8 ? ? ? ? F3 0F 59 C6 F3 0F 58 87 ? ? 00 00 F3 0F 11 87 ? ? 00 00` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 17 | `E8 ? ? ? ?` | `0F 57 C0 90 90` | `E8 50 5E 08 00` |
| ✅ | Windows | 28 | `E8 ? ? ? ?` | `0F 57 C0 90 90` | `E8 50 84 03 00` |

### BotAI.Upkeep_BotSIN_ZeroDrift

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? F3 0F 59 40 30 E8 ? ? ? ? F3 0F 59 45 ? F3 0F 58 83 5C 59 00 00 F3 0F 11 83 5C 59 00 00` |
| ✅ | Windows | server | `F3 0F 11 87 ? ? 00 00 48 8B 05 ? ? ? ? F3 0F 10 40 30 F3 0F 59 05 ? ? ? ? E8 ? ? ? ? F3 0F 59 C6 F3 0F 58 87 ? ? 00 00 F3 0F 11 87 ? ? 00 00` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 13 | `E8 ? ? ? ?` | `0F 57 C0 90 90` | `E8 B5 5E 08 00` |
| ✅ | Windows | 28 | `E8 ? ? ? ?` | `0F 57 C0 90 90` | `E8 63 84 03 00` |

### BotAI.InvestigateNoise_SkipSelfDefenseCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `83 BB F0 52 00 00 02 0F 84 ? ? ? ? F3 0F 10 83 D8 52 00 00 31 C0 66 0F EF DB` |
| ✅ | Windows | server | `83 BB ? ? 00 00 02 74 1E` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `0F 84 ? ? ? ?` | `90 90 90 90 90 90` | `0F 84 39 FF FF FF` |
| ✅ | Windows | 7 | `74 1E` | `90 90` | `74 1E` |

### BotAI.TBot_BombsiteSearch_UseKnownPlantedSite

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B BB 00 5E 00 00 E8 ? ? ? ? 4C 89 F7 E8 ? ? ? ?` |
| ✅ | Windows | server | `48 8B 8E ? ? 00 00 E8 ? ? ? ? 48 8B CB E8 ? ? ? ? 4C 8B 05 ? ? ? ? 85 C0` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 15 | `E8 EC B4 F6 FF` | `E8 FC B1 F6 FF` | `E8 EC B4 F6 FF` |
| ✅ | Windows | 15 | `E8 20 51 F9 FF` | `E8 10 57 F9 FF` | `E8 20 51 F9 FF` |

### BotAI.BombBeep_CT_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 58 C2 F3 0F 58 C1 F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 86 ? ? ? ? 48 8B 43 18` |
| ✅ | Windows | server | `0F 2F ? 76 67 48 8B ? 18 80 B8 44 03 00 00 03` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 19 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 D7 FE FF FF` |
| ✅ | Windows | 3 | `76 67` | `90 90` | `76 67` |

### BotAI.BombPickup_CT_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 58 C2 F3 0F 58 C1 F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 86 ? ? ? ? 48 8B 05 ? ? ? ?` |
| ✅ | Windows | server | `0F 2F ? 76 23 48 8B ? ? 5E 00 00 E8` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 19 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 24 FF FF FF` |
| ✅ | Windows | 3 | `76 23` | `90 90` | `76 23` |

### BotAI.OnAudibleEvent_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 51 D2 0F 2F F2 0F 86 ? ? ? ? 4C 89 EF F3 0F 11 8D 28 FF FF FF F3 0F 11 95 2C FF FF FF` |
| ✅ | Windows | server | `F3 44 0F 51 CA EB 0C 0F 28 C2 E8 ? ? ? ? 44 0F 28 C8 45 0F 2F D1 0F 86 ? ? ? ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 D9 FD FF FF` |
| ✅ | Windows | 23 | `0F 86 ? ? ? ?` | `90 90 90 90 90 90` | `0F 86 65 03 00 00` |

### BotAI.OnBombPlanted_AllBotsLearnSite

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B 83 F8 50 00 00 48 8B 40 18 80 B8 24 06 00 00 02 0F 84 ? ? ? ? 48 8B 7B 18 48 8D 15 ? ? ? ? 48 8B 07 48 8B 80 48 05 00 00 48 39 D0` |
| ✅ | Windows | server | `80 BA ? ? 00 00 02 0F 85 ? ? ? ? 48 85 DB 0F 84 ? ? ? ?` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 18 | `0F 84 ? ? ? ?` | `E9 00 00 00 00 90` | `0F 84 EF 00 00 00` |
| ✅ | Windows | 7 | `0F 85 ? ? ? ?` | `90 90 90 90 90 90` | `0F 85 8E 00 00 00` |

### BotAI.CT_Defuse_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B 05 ? ? ? ? BE 02 00 00 00 48 89 DF 48 89 83 C8 05 00 00 E8 ? ? ? ? BA 02 00 00 00 4C 89 EE E9 ? ? ? ?` |
| ✅ | Windows | server | `C7 86 ? ? 00 00 03 00 00 00 BA 02 00 00 00 48 8B CE` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 7 | `BE 02 00 00 00` | `BE 00 00 00 00` | `BE 02 00 00 00` |
| ✅ | Windows | 10 | `BA 02 00 00 00` | `BA 00 00 00 00` | `BA 02 00 00 00` |

### BotAI.DefuseBombState_OnUpdate_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D BE ? ? 00 00 48 89 E5 41 54 53 48 89 F3 E8 ? ? ? ? BE 02 00 00 00 48 89 DF 49 89 C4 E8 ? ? ? ?` |
| ✅ | Windows | server | `48 8D 8A ? ? 00 00 48 8B DA E8 ? ? ? ? BA 02 00 00 00 48 8B CB` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 22 | `BE 02 00 00 00` | `BE 00 00 00 00` | `BE 02 00 00 00` |
| ✅ | Windows | 15 | `BA 02 00 00 00` | `BA 00 00 00 00` | `BA 02 00 00 00` |

### BotAI.DefuseBombState_OnEnter_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 54 53 48 89 F3 BE 02 00 00 00 48 89 DF E8 ? ? ? ? 4C 8B A3 ? ? 00 00` |
| ✅ | Windows | server | `48 89 5C 24 08 57 48 83 EC 20 48 8B DA BA 02 00 00 00 48 8B CB` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 10 | `BE 02 00 00 00` | `BE 00 00 00 00` | `BE 02 00 00 00` |
| ✅ | Windows | 13 | `BA 02 00 00 00` | `BA 00 00 00 00` | `BA 02 00 00 00` |

### BotAI.FlashbangAvoidance_Disable

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 5C C2 48 8D 35 ? ? ? ? F3 0F 11 4D ? F3 0F 10 0D ? ? ? ? 0F 13 45 ? F3 0F 10 05 ? ? ? ? E8 ? ? ? ? C6 83 ? ? 00 00 00` |
| ✅ | Windows | server | `E8 ? ? ? ? 49 8B 06 C6 80 ? 5C 00 00 00 32 C0` |

| Status | Platform | Offset | Expected | Patch | Actual |
|---|---|---|---|---|---|
| ✅ | Linux | 35 | `E8 ? ? ? ? C6 83 ? ? 00 00 00` | `90 90 90 90 90 90 90 90 90 90 90 90` | `E8 E8 F8 FD FF C6 83 4C 5C 00 00 00` |
| ✅ | Windows | 0 | `E8 ? ? ? ? 49 8B 06 C6 80 ? 5C 00 00 00` | `90 90 90 90 90 90 90 90 90 90 90 90 90 90 90` | `E8 7A A4 02 00 49 8B 06 C6 80 74 5C 00 00 00` |
