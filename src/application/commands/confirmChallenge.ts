import type { BattleService } from "@/application/services/battle.service";
import { resolve } from "@/core/container";
import { type ActionMessage, ActionName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import { createConfirmBattleMessage } from "@/infra/mezon/message.builder";
import type { MezonClient } from "mezon-sdk";
import type { SpiritService } from "../services/spirit.service";
import { CommandBase } from "./base";

@Command(ActionName.ConfirmChallenge)
export class ConfirmChallengeCommand extends CommandBase {
  private battleService: BattleService;
  private spiritService: SpiritService;

  constructor(
    protected client: MezonClient,
    protected actionMessage: ActionMessage,
  ) {
    super(client, actionMessage);

    this.battleService = resolve<BattleService>("BattleService");
    this.spiritService = resolve<SpiritService>("SpiritService");
  }

  async execute(_args: string[]): Promise<void> {
    const battleId = _args.at(0);
    if (!battleId) return;

    const isBattleActive = this.battleService.isBattleActiveById(battleId);
    if (!isBattleActive) return;

    const spirits = await this.spiritService.getSpirits();
    this.battleService.updateBattle(battleId, { phase: "ban" });
    this._message.update(createConfirmBattleMessage(battleId, spirits));
  }
}
