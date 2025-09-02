import { type CommandMessage, CommandName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import { type MezonClient, TypeMessage } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(CommandName.Pika)
export class PikaCommand extends CommandBase {
  constructor(
    protected client: MezonClient,
    protected actionMessage: CommandMessage,
  ) {
    super(client, actionMessage);
  }

  async execute(_args: string[]): Promise<void> {
    await this._channel.send(
      { t: "Pikaaaaaaa!!" },
      [],
      [],
      undefined,
      undefined,
      undefined,
      TypeMessage.MessageBuzz,
    );
  }
}
