import {
  type ButtonComponent,
  EButtonMessageStyle,
  EMessageComponentType,
} from "mezon-sdk";
import {
  cancelBattleId,
  confirmBanId,
  confirmPickId,
  confirmStartBattleId,
} from "./id.builder";

export const cancelBattleButtonBuilder = (
  battleId: string,
): ButtonComponent => ({
  id: cancelBattleId(battleId),
  type: EMessageComponentType.BUTTON,
  component: {
    label: "No, I'm scared",
    style: EButtonMessageStyle.SECONDARY,
  },
});

export const confirmBattleButtonBuilder = (
  battleId: string,
): ButtonComponent => ({
  id: confirmStartBattleId(battleId),
  type: EMessageComponentType.BUTTON,
  component: {
    label: "Let's go, bitch!",
    style: EButtonMessageStyle.DANGER,
  },
});

export const confirmPickButtonBuilder = (
  battleId: string,
): ButtonComponent => ({
  id: confirmPickId(battleId),
  type: EMessageComponentType.BUTTON,
  component: {
    label: "Confirm Pick",
    style: EButtonMessageStyle.PRIMARY,
  },
});

export const confirmBanButtonBuilder = (battleId: string): ButtonComponent => ({
  id: confirmBanId(battleId),
  type: EMessageComponentType.BUTTON,
  component: {
    label: "Confirm Ban",
    style: EButtonMessageStyle.PRIMARY,
  },
});

export const cancelDungeonButtonBuilder = (): ButtonComponent => ({
  id: "dungeon_cancel",
  type: EMessageComponentType.BUTTON,
  component: {
    label: "Cancel Dungeon",
    style: EButtonMessageStyle.SECONDARY,
  },
});

export const confirmDungeonButtonBuilder = (): ButtonComponent => ({
  id: "dungeon_confirm",
  type: EMessageComponentType.BUTTON,
  component: {
    label: "Let's go, bitch!",
    style: EButtonMessageStyle.DANGER,
  },
});
