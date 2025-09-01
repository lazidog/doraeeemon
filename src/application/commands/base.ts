import type { MessageType } from "@/domain/types";
import type { MezonClient } from "mezon-sdk";
import type { Message } from "mezon-sdk/dist/cjs/mezon-client/structures/Message";

export abstract class CommandBase<TMessage extends MessageType = MessageType> {
  protected _message!: Message;

  constructor(
    protected client: MezonClient,
    protected message: TMessage,
  ) {}

  protected async getMessage() {
    if (!this._message) {
      const { channel_id: channelId, message_id: messageId } = this.message;
      if (!channelId || !messageId) return;

      const channel = await this.client.channels.fetch(channelId);
      this._message = await channel.messages.fetch(messageId);
    }
    return this._message;
  }

  protected abstract execute(args: string[]): Promise<void>;

  async handle(args: string[]): Promise<void> {
    const message = await this.getMessage();
    if (!message) return;

    await this.execute(args);
  }
}
