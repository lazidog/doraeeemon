import { MezonClient } from "mezon-sdk";
import { CommandHandler } from "./application/handlers/command.handler";

// import to register commands
import "@/application/commands/ban";
import "@/application/commands/cancelChallenge";
import "@/application/commands/confirmChallenge";
import "@/application/commands/pick";
import "@/application/commands/pika";
import "@/application/commands/pve";
import "@/application/commands/pvp";
import "@/application/commands/spirits";
import { bootstrap } from "./core/bootstrap";

async function main() {
  bootstrap();

  const client = new MezonClient(process.env.MEZON_CLIENT_TOKEN);
  const commandHandler = new CommandHandler(client);

  client.on("error", (error) => console.error(`Mezon Error: ${error}`));
  client.on("disconnect", (reason) => console.log(`Disconnected: ${reason}`));
  client.on("ready", () => console.log(`Connected: ${client.clans.size}`));
  client.onChannelMessage(commandHandler.handleMessage.bind(commandHandler));
  client.onMessageButtonClicked(
    commandHandler.handleMessageButtonClicked.bind(commandHandler),
  );

  await client.login();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
