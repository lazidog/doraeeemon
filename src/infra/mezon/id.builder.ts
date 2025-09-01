import { ActionName } from "@/domain/types";

export function spiritSelectorId(): string {
  return "spirit_selector";
}

export function cancelBattleId(battleId: string): string {
  return `${ActionName.CancelChallenge}_${battleId}`;
}

export function confirmStartBattleId(battleId: string): string {
  return `${ActionName.ConfirmChallenge}_${battleId}`;
}

export function confirmPickId(battleId: string): string {
  return `${ActionName.ConfirmPick}_${battleId}`;
}

export function confirmBanId(battleId: string): string {
  return `${ActionName.ConfirmBan}_${battleId}`;
}
