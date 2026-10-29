# BotAI

- Last updated: 2026-10-29T00:55:22.363Z
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

### BotAI.GameState_Reset

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2E 43 18 C7 43 0C 00 00 00 00 0F 8A ? ? ? ? 0F 85 ? ? ? ? 48 8B 05 ? ? ? ? C6 43 6C 00 C7 43 68 FF FF FF FF` |
| ✅ | Windows | server | `48 8D 4C 24 ? 45 33 F6 44 89 77 0C E8 ? ? ? ? F3 0F 10 47 18 48 8B F0 0F 2E 00` |

### BotAI.Idle_IsSafeAlwaysFalse

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `E8 ? ? ? ? 84 C0 0F 85 ? ? ? ? 4C 8D B3 F8 50 00 00 4C 89 F7 E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 80 BB 88 52 00 00 00` |
| ✅ | Windows | server | `74 28 33 D2 48 8B CE E8 ? ? ? ? 84 C0 75 1A` |

### BotAI.EscapeFromBomb_OnEnter_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `C6 83 4C 4F 00 00 00 48 89 DF C6 83 74 4F 00 00 00 48 8B 5D F8 C9 E9 ? ? ? ?` |
| ✅ | Windows | server | `C6 83 ? ? 00 00 00 C6 83 ? ? 00 00 00 48 83 C4 20 5B E9` |

### BotAI.EscapeFromBomb_OnUpdate_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 85 C0 0F 84 ? ? ? ? 48 89 DF 49 89 C4 E8 ? ? ? ? 31 F6 48 89 DF E8 ? ? ? ?` |
| ✅ | Windows | server | `75 0F 48 8B 5C 24 50 48 83 C4 40 5F E9 ? ? ? ? E8 ? ? ? ?` |

### BotAI.EscapeFromFlames_OnEnter_NoEquipKnife

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `C6 83 4C 4F 00 00 00 48 89 DF C6 83 74 4F 00 00 00 E8 ? ? ? ? F3 0F 10 1D ? ? ? ? 49 C7 44 24 20 00 00 00 00 41 0F 2E 5C 24 14` |
| ✅ | Windows | server | `48 8B CB 40 88 BB ? ? 00 00 40 88 BB ? ? 00 00 E8 ? ? ? ? F3 0F 10 0D` |

### BotAI.PlantBombLookAtPriorityLow

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8D 55 C8 4C 89 E7 45 31 C9 F3 0F 10 40 08 45 31 C0 B9 02 00 00 00 48 89 5D C8 F3 0F 10 0D ? ? ? ? 48 8D 35 ? ? ? ? F3 0F 11 45 D0` |
| ✅ | Windows | server | `41 B9 02 00 00 00 C6 44 24 38 00 F3 0F 10 0D` |

### BotAI.DefuseBombLookAtPriorityLow

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `4C 89 E2 45 31 C9 45 31 C0 F3 0F 10 05 ? ? ? ? B9 02 00 00 00 48 89 DF 48 8D 35 ? ? ? ? E8 ? ? ? ?` |
| ✅ | Windows | server | `41 B9 02 00 00 00 C6 44 24 38 00 4C 8B C7` |

### BotAI.DefuseBomb_SkipIsVisibleCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F C8 0F 86 ? ? ? ? 31 C9 31 D2 4C 89 E6 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 83 C4 68 48 89 DF` |
| ✅ | Windows | server | `0F 2F C8 0F 86 ? ? ? ? 45 33 C9 45 33 C0 48 8B D3 48 8B CE E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B CE` |

### BotAI.AttackState_SkipFireRateCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 8B AC 00 00 00 0F 82 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B 7B 18` |
| ✅ | Windows | server | `0F 2F 8B ? ? 00 00 0F 82` |

### BotAI.SprayAllDistances_ForceHoldTrigger

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 83 A0 00 00 00 66 0F EF C9 0F 2F C1 76 0C 49 8B 45 00 0F 2F 40 30 41 0F 97 C4 48 8B 83 98 00 00 00` |
| ✅ | Windows | server | `76 12 48 8B 05 ? ? ? ? 0F 2F 40 30 76 05 40 B5 01 EB 03 40 32 ED` |

### BotAI.AttackState_SkipSteadyFireShortcut

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `BA 01 00 00 00 48 89 DF 48 89 C6 E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 89 DF E8 ? ? ? ?` |
| ✅ | Windows | server | `0F B6 F0 84 C0 74 3C 48 8B 4B 18 48 8B 11 FF 92 90 00 00 00` |

### BotAI.AttackState_SkipZoomFireShortcut

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 83 BB C8 05 00 00 14` |
| ✅ | Windows | server | `FF 90 ? ? 00 00 84 C0 74 15 48 8D 8B ? ? 00 00 48 89 AB` |

### BotAI.AttackState_SkipSniperSpreadCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 66 41 0F 6E EE 0F 2F E8 0F 87 ? ? ? ? 48 89 DF E8 ? ? ? ? 48 89 DF F3 0F 10 40 08` |
| ✅ | Windows | server | `84 C0 74 0A F3 0F 10 ? ? ? ? ? EB 08 F3 0F 10 ? ? ? ? ? ? 0F 2F ? 0F 87 ? ? ? ?` |

### BotAI.AttackState_DodgeDuringReload

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `E8 ? ? ? ? 48 8B 43 08 0F 28 C8 66 41 0F 6E C5 F3 0F 59 40 08 0F 2F C8 41 0F 97 44 24 44 48 81 C4 A8 01 00 00` |
| ✅ | Windows | server | `E9 ? ? ? ? 0F 2F BB ? 00 00 00 76 74` |

### BotAI.SniperCrouchDodge_jb

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `66 41 0F 6E FE F3 0F 10 0D ? ? ? ? 0F 2F F8 66 0F EF C0 41 0F 93 44 24 42 E8 ? ? ? ? 48 8B 43 08 0F 28 C8` |
| ✅ | Windows | server | `0F 2F BB ? 00 00 00 0F 28 7C 24 30 76 74` |

### BotAI.LowSKill_JumpChance0

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 41 0F 5C 86 00 06 00 00 0F 2F C5 0F 83 ? ? ? ? BE 03 00 00 00 31 FF E8 ? ? ? ? E9 ? ? ? ?` |
| ✅ | Windows | server | `0F 57 C9 48 8B CF E8 ? ? ? ? BA 03 00 00 00 84 C0 74 05 BA 02 00 00 00 33 C9 FF 15 ? ? ? ? 80 7D 43 00` |

### BotAI.AttackState_DodgeChance100_Always

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 89 DF F3 0F 11 85 48 FE FF FF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 44 8B 2D ? ? ? ? 45 89 EE` |
| ✅ | Windows | server | `0F 28 F0 F3 0F 59 35 ? ? ? ? 76 ?` |

### BotAI.AttackState_RetreatOnSniper_Disable

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `80 BB 99 5C 00 00 00 0F 85 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0` |
| ✅ | Windows | server | `74 ? 48 8B CE E8 ? ? ? ? 84 C0 74 ? 48 8B CE E8 ? ? ? ? 84 C0` |

### BotAI.AllSkill_KeepMoving_WhenSeeSniper

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 05 ? ? ? ? 76 0D 80 BB C4 05 00 00 00 0F 85 ? ? ? ? 0F B6 05 ? ? ? ? 84 C0 0F 84 ? ? ? ?` |
| ✅ | Windows | server | `0F 2F 05 ? ? ? ? 76 0D 80 BF ? ? 00 00 00 0F 85` |

### BotAI.AttackState_CanStrafe_jne

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 2F 8B AC 00 00 00 0F 82 ? ? ? ? 48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 48 8B 7B 18` |
| ✅ | Windows | server | `0F 2F 8B ? ? 00 00 0F 82 ? ? ? ? 48 8B CB E8 ? ? ? ? 84 C0 74 7B` |

### BotAI.SniperDodge_SkipIsSniper_DodgeA

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 89 DF E8 ? ? ? ? 84 C0 0F 84 ? ? ? ? 44 8B 35 ? ? ? ? F3 0F 10 0D ? ? ? ? 66 0F EF C0 E8 ? ? ? ? 66 41 0F 6E D6 0F 2F D0 77 ?` |
| ✅ | Windows | server | `84 F6 75 6A 48 8B 05` |

### BotAI.Vision_AlwaysWatchApproachPoints

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 4C 8D 6D A8 0F 85 ? ? ? ? 0F 2F 05 ? ? ? ? 0F 86 ? ? ? ? 48 C7 43 08 00 00 00 00` |
| ✅ | Windows | server | `80 BF ? ? 00 00 00 75 25 0F 2F` |

### BotAI.Vision_ApproachBody_SkipSkillCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `49 8B 46 08 F3 0F 10 48 0C 0F 2F 0D ? ? ? ? 0F B6 43 43 0F 86 ? ? ? ? 41 80 BE 99 5C 00 00 00 74 27` |
| ✅ | Windows | server | `F3 0F 10 40 0C 0F 2F ? 76 ? 80 BF ? 5C 00 00 00 74 ?` |

### BotAI.Vision_ApproachBody_SkipHidingSpotCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 74 27 84 C0 0F 85 ? ? ? ? 83 7B 08 01 B8 02 00 00 00` |
| ✅ | Windows | server | `80 BF ? 5C 00 00 00 74 ?` |

### BotAI.Vision_SkipIsMovingGate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `41 80 BE 99 5C 00 00 00 4C 8D 6D A8 0F 85 ? ? ? ? 0F 2F 05 ? ? ? ? 0F 86 ? ? ? ? 48 C7 43 08 00 00 00 00` |
| ✅ | Windows | server | `0F 2F 35 ? ? ? ? 77 ? 49 8B ? 48 8B CF E8 ? ? ? ? 84 C0 75 ?` |

### BotAI.Vision_AlwaysEnterApproachBody

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 59 4D C4 F3 0F 58 C1 66 0F EF C9 0F 2F C8 0F 86 ? ? ? ? 66 0F 1F 44 00 00 4C 8D 25 ? ? ? ?` |
| ✅ | Windows | server | `84 C0 75 ? ? C7 ? 08 00 00 00 00 E9 ? ? ? ?` |

### BotAI.IsNoticable_AlwaysTrue

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 56 41 89 D6 41 55 41 54 49 89 FC 48 89 F7 53 48 89 F3 48 83 EC 20 E8 ? ? ? ? 48 85 C0 74 2D` |
| ✅ | Windows | server | `48 89 5C 24 ? 56 57 41 56 48 81 EC ? ? 00 00 0F 29 74 24 ? 4C 8B F1 0F 29 7C 24 ? 48 8B CA 44 0F 29 44 24 ? 41 0F B6 D8 44 0F 29 4C 24 ? 48 8B F2 E8` |

### BotAI.Upkeep_BotCOS_ZeroDrift

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? 49 8B 45 00 F3 0F 59 40 30 E8 ? ? ? ? 49 8B 45 00 F3 0F 59 45 ? F3 0F 58 83 64 59 00 00 F3 0F 11 83 64 59 00 00` |
| ✅ | Windows | server | `F3 0F 10 35 ? ? ? ? 48 8B 05 ? ? ? ? F3 0F 10 40 30 F3 0F 59 05 ? ? ? ? E8 ? ? ? ? F3 0F 59 C6 F3 0F 58 87 ? ? 00 00 F3 0F 11 87 ? ? 00 00` |

### BotAI.Upkeep_BotSIN_ZeroDrift

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 10 05 ? ? ? ? F3 0F 59 40 30 E8 ? ? ? ? F3 0F 59 45 ? F3 0F 58 83 5C 59 00 00 F3 0F 11 83 5C 59 00 00` |
| ✅ | Windows | server | `F3 0F 11 87 ? ? 00 00 48 8B 05 ? ? ? ? F3 0F 10 40 30 F3 0F 59 05 ? ? ? ? E8 ? ? ? ? F3 0F 59 C6 F3 0F 58 87 ? ? 00 00 F3 0F 11 87 ? ? 00 00` |

### BotAI.InvestigateNoise_SkipSelfDefenseCheck

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `83 BB F0 52 00 00 02 0F 84 ? ? ? ? F3 0F 10 83 D8 52 00 00 31 C0 66 0F EF DB` |
| ✅ | Windows | server | `83 BB ? ? 00 00 02 74 1E` |

### BotAI.TBot_BombsiteSearch_UseKnownPlantedSite

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B BB 00 5E 00 00 E8 ? ? ? ? 4C 89 F7 E8 ? ? ? ?` |
| ✅ | Windows | server | `48 8B 8E ? ? 00 00 E8 ? ? ? ? 48 8B CB E8 ? ? ? ? 4C 8B 05 ? ? ? ? 85 C0` |

### BotAI.BombBeep_CT_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 58 C2 F3 0F 58 C1 F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 86 ? ? ? ? 48 8B 43 18` |
| ✅ | Windows | server | `0F 2F ? 76 67 48 8B ? 18 80 B8 44 03 00 00 03` |

### BotAI.BombPickup_CT_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 58 C2 F3 0F 58 C1 F3 0F 10 0D ? ? ? ? 0F 2F C8 0F 86 ? ? ? ? 48 8B 05 ? ? ? ?` |
| ✅ | Windows | server | `0F 2F ? 76 23 48 8B ? ? 5E 00 00 E8` |

### BotAI.OnAudibleEvent_GlobalHearRange

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `F3 0F 51 D2 0F 2F F2 0F 86 ? ? ? ? 4C 89 EF F3 0F 11 8D 28 FF FF FF F3 0F 11 95 2C FF FF FF` |
| ✅ | Windows | server | `F3 44 0F 51 CA EB 0C 0F 28 C2 E8 ? ? ? ? 44 0F 28 C8 45 0F 2F D1 0F 86 ? ? ? ?` |

### BotAI.OnBombPlanted_AllBotsLearnSite

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B 83 F8 50 00 00 48 8B 40 18 80 B8 24 06 00 00 02 0F 84 ? ? ? ? 48 8B 7B 18 48 8D 15 ? ? ? ? 48 8B 07 48 8B 80 48 05 00 00 48 39 D0` |
| ✅ | Windows | server | `80 BA ? ? 00 00 02 0F 85 ? ? ? ? 48 85 DB 0F 84 ? ? ? ?` |

### BotAI.CT_Defuse_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `48 8B 05 ? ? ? ? BE 02 00 00 00 48 89 DF 48 89 83 C8 05 00 00 E8 ? ? ? ? BA 02 00 00 00 4C 89 EE E9 ? ? ? ?` |
| ✅ | Windows | server | `C7 86 ? ? 00 00 03 00 00 00 BA 02 00 00 00 48 8B CE` |

### BotAI.DefuseBombState_OnUpdate_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 8D BE ? ? 00 00 48 89 E5 41 54 53 48 89 F3 E8 ? ? ? ? BE 02 00 00 00 48 89 DF 49 89 C4 E8 ? ? ? ?` |
| ✅ | Windows | server | `48 8D 8A ? ? 00 00 48 8B DA E8 ? ? ? ? BA 02 00 00 00 48 8B CB` |

### BotAI.DefuseBombState_OnEnter_EngageAndInvestigate

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `55 48 89 E5 41 54 53 48 89 F3 BE 02 00 00 00 48 89 DF E8 ? ? ? ? 4C 8B A3 ? ? 00 00` |
| ✅ | Windows | server | `48 89 5C 24 08 57 48 83 EC 20 48 8B DA BA 02 00 00 00 48 8B CB` |

### BotAI.FlashbangAvoidance_Disable

| Status | Platform | Library | IDA-Style |
|---|---|---|---|
| ✅ | Linux | server | `0F 5C C2 48 8D 35 ? ? ? ? F3 0F 11 4D ? F3 0F 10 0D ? ? ? ? 0F 13 45 ? F3 0F 10 05 ? ? ? ? E8 ? ? ? ? C6 83 ? ? 00 00 00` |
| ✅ | Windows | server | `E8 ? ? ? ? 49 8B 06 C6 80 ? 5C 00 00 00 32 C0` |
