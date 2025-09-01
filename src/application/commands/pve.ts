import { type CommandMessage, CommandName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import type { MezonClient } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(CommandName.PvE)
export class PvECommand extends CommandBase {
  constructor(
    protected client: MezonClient,
    protected commandMessage: CommandMessage,
  ) {
    super(client, commandMessage);
  }

  async execute(_args: string[]): Promise<void> {}
}
