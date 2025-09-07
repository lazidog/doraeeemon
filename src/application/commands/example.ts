import { type ActionMessage, ActionName } from "@/domain/types";
import { Command } from "@/infra/decorators/registerCommand.decorator";
import type { MezonClient } from "mezon-sdk";
import { CommandBase } from "./base";

@Command(ActionName.Example)
export class ExampleCommand extends CommandBase {
  constructor(
    protected client: MezonClient,
    protected actionMessage: ActionMessage,
  ) {
    super(client, actionMessage);
  }

  async execute(_args: string[]): Promise<void> {}
}
