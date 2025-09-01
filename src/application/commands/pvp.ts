import type { BattleService } from "@/application/services/battle.service";
import { resolve } from "@/core/container";
import { type CommandMessage, CommandName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import {
  createBattleStillActiveMessage,
  createStartBattleMessage,
} from "@/infra/mezon/message.builder";
import type { MezonClient } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(CommandName.PvP)
export class PvPCommand extends CommandBase {
  private battleService: BattleService;

  constructor(
    protected client: MezonClient,
    protected commandMessage: CommandMessage,
  ) {
    super(client, commandMessage);

    this.battleService = resolve<BattleService>("BattleService");
  }

  async execute(_args: string[]): Promise<void> {
    const player1Id = this.commandMessage.sender_id;
    const player2Id = this.commandMessage.mentions?.at(0)?.user_id;
    if (!player1Id || !player2Id) return;

    const battleId = await this.battleService.buildBattleId(
      player1Id,
      player2Id,
    );

    {
      const isBattleActive =
        await this.battleService.isBattleActiveById(battleId);
      if (isBattleActive) {
        await this._message.reply(createBattleStillActiveMessage(battleId));
        return;
      }
    }

    await this.battleService.createBattle(player1Id, player2Id);
    await this._message.reply(createStartBattleMessage(battleId));
    return;
  }
}
