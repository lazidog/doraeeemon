import type { ActionMessage, CommandMessage } from "@/domain/types";
import { getAction, getCommand } from "@/infra/storages/command.storage";
import { extractActionMessage, extractCommandMessage } from "@/utils";
import type { ChannelMessage, MezonClient } from "mezon-sdk";
import type { MessageButtonClicked } from "mezon-sdk/dist/cjs/rtapi/realtime";

export class CommandHandler {
  constructor(protected client: MezonClient) {}

  async handleMessage(message: ChannelMessage) {
    const messageContent = message.content.t;
    if (!messageContent?.startsWith("*")) return;

    const { commandName, args } = extractCommandMessage(messageContent);
    if (!commandName) return;

    const Command = getCommand(commandName);
    if (!Command) return;

    const commandMessage: CommandMessage = {
      type: "command",
      ...message,
    };
    const command = new Command(this.client, commandMessage);
    return command.handle(args);
  }

  async handleMessageButtonClicked(data: MessageButtonClicked) {
    const { actionName, args } = extractActionMessage(data);

    if (!actionName) return;

    const Action = getAction(actionName);
    if (!Action) return;

    const actionMessage: ActionMessage = {
      type: "action",
      ...data,
    };
    const action = new Action(this.client, actionMessage);
    return action.handle(args);
  }
}
