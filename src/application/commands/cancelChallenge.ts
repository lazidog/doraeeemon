import type { BattleService } from "@/application/services/battle.service";
import { resolve } from "@/core/container";
import { type ActionMessage, ActionName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import { createBattleCancelMessage } from "@/infra/mezon/message.builder";
import type { MezonClient } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(ActionName.CancelChallenge)
export class CancelChallengeCommand extends CommandBase {
  private battleService: BattleService;

  constructor(
    protected client: MezonClient,
    protected actionMessage: ActionMessage,
  ) {
    super(client, actionMessage);
    this.battleService = resolve<BattleService>("BattleService");
  }

  async execute([battleId]: string[]): Promise<void> {
    if (!battleId) return;

    const isBattleActive =
      await this.battleService.isBattleActiveById(battleId);
    if (!isBattleActive) return;

    await this.battleService.deleteBattle(battleId);
    this._message.update(createBattleCancelMessage());
  }
}
