import { type CommandMessage, CommandName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import { type MezonClient, TypeMessage } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(CommandName.Pika)
export class PikaCommand extends CommandBase {
  constructor(
    protected client: MezonClient,
    protected commandMessage: CommandMessage,
  ) {
    super(client, commandMessage);
  }

  async execute(_args: string[]): Promise<void> {
    const dmClan = await this.client.clans.fetch("0");
    const recipientUserId =
      this._message.references?.at(0)?.message_sender_id ||
      this.commandMessage.mentions?.at(0)?.user_id;

    if (!recipientUserId) return;
    const user = await dmClan.users.fetch(recipientUserId);
    if (!user) return;

    if (!user.dmChannelId) {
      const dmChannel = await user.createDmChannel();
    }

    await Promise.all(
      Array.from(
        { length: 15 },
        (_, i) =>
          new Promise<void>((resolve) =>
            setTimeout(
              async () => {
                await user.sendDM(
                  {
                    t: "Pikaaaaaaa!!",
                  },
                  TypeMessage.MessageBuzz,
                );
                resolve();
              },
              Math.floor(Math.random() * 1000),
            ),
          ),
      ),
    );
  }
}
