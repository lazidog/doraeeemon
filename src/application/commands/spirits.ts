import type { SpiritService } from "@/application/services/spirit.service";
import { resolve } from "@/core/container";
import { type CommandMessage, CommandName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import { createSpiritListMessage } from "@/infra/mezon/message.builder";
import type { MezonClient } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(CommandName.Spirits)
export class SpiritsCommand extends CommandBase {
  private spiritService: SpiritService;

  constructor(
    protected client: MezonClient,
    protected commandMessage: CommandMessage,
  ) {
    super(client, commandMessage);
    this.spiritService = resolve<SpiritService>("SpiritService");
  }

  async execute(_args: string[]): Promise<void> {
    const spirits = await this.spiritService.getSpirits();
    this._message.reply(createSpiritListMessage(spirits));
    return;
  }
}
