import { Color } from "@/colors";
import type { Spirit } from "@/domain";
import type {
  ButtonComponent,
  ChannelMessageContent,
  IEmbedProps,
  IMessageActionRow,
  SelectComponent,
} from "mezon-sdk";
import {
  cancelBattleButtonBuilder,
  confirmBanButtonBuilder,
  confirmBattleButtonBuilder,
} from "./button.builder";
import { spiritSelectionBuilder } from "./selection.builder";

// #region: Spirit
export const createSpiritListMessage = (
  spirits: Spirit[],
): ChannelMessageContent => {
  const actionRow: IMessageActionRow = {
    components: [spiritSelectionBuilder(spirits)],
  };
  return { components: [actionRow] };
};
// #endregion: Spirit

// #region: Battle
export const createBattleCancelMessage = (): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "Battle Cancelled! 🚫",
    color: Color.PRIMARY.toString(),
  };
  return { embed: [embed] };
};

export const createConfirmBattleMessage = (
  battleId: string,
  spirits: Spirit[],
): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "Ban Phase Started!",
    color: Color.PRIMARY.toString(),
  };
  const buttons: ButtonComponent[] = [
    cancelBattleButtonBuilder(battleId),
    confirmBanButtonBuilder(battleId),
  ];
  const buttonRow: IMessageActionRow = {
    components: buttons,
  };
  const selectors: SelectComponent[] = [
    spiritSelectionBuilder(spirits, "ban1"),
    spiritSelectionBuilder(spirits, "ban2"),
    spiritSelectionBuilder(spirits, "ban3"),
  ];
  const selectionRow: IMessageActionRow = {
    components: selectors,
  };

  return { embed: [embed], components: [selectionRow, buttonRow] };
};

export const createBattleStillActiveMessage = (
  battleId: string,
): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "Battle Still Active!",
    color: Color.PRIMARY.toString(),
  };
  const buttons: ButtonComponent[] = [cancelBattleButtonBuilder(battleId)];
  const buttonRow: IMessageActionRow = {
    components: buttons,
  };
  return { embed: [embed], components: [buttonRow] };
};

export const createNoActiveBattleMessage = (): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "No Active Battle",
    color: Color.WARNING.toString(),
  };
  return { embed: [embed] };
};

export const createStartBattleMessage = (
  battleId: string,
): ChannelMessageContent => {
  const embed: IEmbedProps = {
    title: "Battle Challenge! ⚔️",
    color: Color.PRIMARY.toString(),
  };
  const buttons: ButtonComponent[] = [
    cancelBattleButtonBuilder(battleId),
    confirmBattleButtonBuilder(battleId),
  ];
  const actionRow: IMessageActionRow = { components: buttons };
  return { embed: [embed], components: [actionRow] };
};
// #endregion: Battle

// export const createBanOverMessage = () => {
//   return createEmbed({
//     title: "Ban Phase Over",
//     description: "The ban phase is over.",
//     color: 0xff0000,
//   });
// };

// export const createBanCompletedMessage = (battle: Battle) => {
//   return createEmbed({
//     title: "Ban Phase Complete",
//     description: "Start picking spirits with /pvp pick <spirit>.",
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Banned Spirits",
//         value: battle.bannedSpirits.join(", ") || "None",
//         inline: true,
//       },
//     ],
//   });
// };

// export const createSpiritBannedMessage = (
//   spiritName: string,
//   battle: Battle,
// ) => {
//   return createEmbed({
//     title: "Spirit Banned",
//     description: `**${spiritName}** has been banned.`,
//     color: 0xffa500,
//     fields: [
//       {
//         name: "Banned Spirits",
//         value: battle.bannedSpirits.join(", ") || "None",
//         inline: true,
//       },
//       {
//         name: "Next Turn",
//         value: `@${battle.currentTurn === "player1" ? battle.player1Id : battle.player2Id}`,
//         inline: true,
//       },
//     ],
//   });
// };

// export const createSpiritNotFoundMessage = (spiritName: string) => {
//   return createEmbed({
//     title: "Spirit Not Found",
//     description: `Spirit ${spiritName} not found.`,
//     color: 0xff0000,
//   });
// };

// export const createPickPhaseErrorMessage = () =>
//   createEmbed({
//     title: "Pick Phase Error",
//     description: "Pick phase is over or not started.",
//     color: 0xff0000,
//   });

// export const createPickPhaseCompleteMessage = (battle: Battle) =>
//   createEmbed({
//     title: "Pick Phase Complete",
//     description: "Battle begins!",
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Player 1 Team",
//         value: battle.player1Spirits.map((p) => p.name).join(", "),
//         inline: true,
//       },
//       {
//         name: "Player 2 Team",
//         value: battle.player2Spirits.map((p) => p.name).join(", "),
//         inline: true,
//       },
//     ],
//     buttons: [],
//   });

// export const createTeamFullMessage = (battle: Battle) =>
//   createEmbed({
//     title: "Team Full",
//     description: `Your team is full. @${battle.currentTurn === "player1" ? battle.player1Id : battle.player2Id}, your turn to pick.`,
//     color: 0xffa500,
//   });

// export const createInvalidSpiritMessage = (spiritName: string) =>
//   createEmbed({
//     title: "Invalid Spirit",
//     description: `Spirit ${spiritName} is banned or not found.`,
//     color: 0xff0000,
//   });

// export const createSpiritPickedMessage = (
//   battle: Battle,
//   userId: string,
//   spiritName: string,
//   playerSpirits: Spirit[],
// ) =>
//   createEmbed({
//     title: "Spirit Picked",
//     description: `**${spiritName}** picked.`,
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Player Team",
//         value: playerSpirits.map((p) => p.name).join(", "),
//         inline: true,
//       },
//       {
//         name: "Next Turn",
//         value: `@${battle.currentTurn === "player1" ? battle.player1Id : battle.player2Id}`,
//         inline: true,
//       },
//     ],
//     buttons: [
//       cancelBattleButtonBuilder(battle.id),
//       confirmPickButtonBuilder(battle.id),
//     ],
//   });

// export const createBattleUpdateMessage = (
//   attacker: Spirit,
//   defender: Spirit,
//   damage: number,
// ) =>
//   createEmbed({
//     title: "Battle Update",
//     description: `**${attacker.name}** deals **${damage}** damage to **${defender.name}**.`,
//     color: 0x1e90ff,
//     fields: [
//       {
//         name: `${attacker.name} HP`,
//         value: `${attacker.hp}`,
//         inline: true,
//       },
//       {
//         name: `${defender.name} HP`,
//         value: `${defender.hp}`,
//         inline: true,
//       },
//     ],
//   });

// export const createSkillEffectMessage = (spirit: Spirit, effect: SkillEffect) =>
//   createEmbed({
//     title: "Skill Effect",
//     description: `**${spirit.name}** heals for **${effect.value}** HP.`,
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Current HP",
//         value: `${spirit.hp}`,
//         inline: true,
//       },
//     ],
//   });

// export const createSpiritDefeatedMessage = (
//   battle: Battle,
//   spirit: Spirit,
//   isDot?: boolean,
// ) =>
//   createEmbed({
//     title: "Spirit Defeated",
//     description: `**${spirit.name}** is defeated${isDot ? " by DOT" : ""}!`,
//     color: 0xff0000,
//     fields: [
//       {
//         name: "Player 1 Team",
//         value: battle.player1Spirits.map((p) => p.name).join(", ") || "None",
//         inline: true,
//       },
//       {
//         name: "Player 2 Team",
//         value: battle.player2Spirits.map((p) => p.name).join(", ") || "None",
//         inline: true,
//       },
//     ],
//   });

// export const createDotDamageMessage = (spirit: Spirit, value: number) =>
//   createEmbed({
//     title: "DOT Damage",
//     description: `**${spirit.name}** takes **${value}** DOT damage.`,
//     color: 0xffa500,
//     fields: [{ name: "Current HP", value: `${spirit.hp}`, inline: true }],
//   });

// export const createBattleEndedMessage = (battle: Battle, winner: string) =>
//   createEmbed({
//     title: "Battle Ended",
//     description: `Winner: **@${winner}**`,
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Player 1 Team",
//         value: battle.player1Spirits.map((p) => p.name).join(", ") || "None",
//         inline: true,
//       },
//       {
//         name: "Player 2 Team",
//         value: battle.player2Spirits.map((p) => p.name).join(", ") || "None",
//         inline: true,
//       },
//     ],
//   });

// export const createDungeonStartedMessage = (dungeon: Dungeon) =>
//   createEmbed({
//     title: "Dungeon Event Started",
//     description: `The dungeon event has started with ${dungeon.participants.length} participants!`,
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Gem Pool",
//         value: `${dungeon.gemPool} gems`,
//         inline: true,
//       },
//       {
//         name: "Participants",
//         value: dungeon.participants.map((p) => `@${p.userId}`).join(", "),
//         inline: true,
//       },
//     ],
//     buttons: [cancelDungeonButtonBuilder()],
//   });

// export const createDungeonJoinedMessage = (
//   dungeon: Dungeon,
//   userId: string,
//   selectedSpirits: Spirit[],
// ) =>
//   createEmbed({
//     title: "Joined Dungeon",
//     description: `You joined the dungeon! ${dungeon.participants.length}/${dungeon.threshold} participants.`,
//     color: 0x00ff00,
//     fields: [
//       {
//         name: "Gem Pool",
//         value: `${dungeon.gemPool} gems`,
//         inline: true,
//       },
//       {
//         name: "Your Spirits",
//         value: selectedSpirits.map((p) => p.name).join(", "),
//         inline: true,
//       },
//     ],
//   });

// export const createDungeonInfoMessage = (dungeon: Dungeon) =>
//   createEmbed({
//     title: "Dungeon Info",
//     description: "Current dungeon status:",
//     color: 0x1e90ff,
//     fields: [
//       { name: "Gem Pool", value: `${dungeon.gemPool} gems`, inline: true },
//       {
//         name: "Participants",
//         value: `${dungeon.participants.length}/${dungeon.threshold}`,
//         inline: true,
//       },
//       {
//         name: "Active",
//         value: dungeon.active ? "Yes" : "No",
//         inline: true,
//       },
//     ],
//   });

// export const createDungeonBattleMessage = (
//   userId: string,
//   spirit: Spirit,
//   spiritHP: number,
//   playerSpirits: Spirit[],
// ) =>
//   createEmbed({
//     title: "Dungeon Battle",
//     description: `**@${userId}** vs **${spirit.name}** (${spirit.element}, ${spiritHP} HP)`,
//     color: 0x1e90ff,
//     fields: [
//       {
//         name: "Player Spirits",
//         value: playerSpirits.map((p) => p.name).join(", "),
//         inline: true,
//       },
//     ],
//   });

// export const createDungeonVictoryMessage = (
//   winnerId: string,
//   spirit: Spirit,
//   reward: number,
// ) =>
//   createEmbed({
//     title: "Dungeon Victory",
//     description: `**@${winnerId}** defeated **${spirit.name}** and earned **${reward}** gems!`,
//     color: 0x00ff00,
//   });

// export const createDungeonFailedMessage = (spirit: Spirit) =>
//   createEmbed({
//     title: "Dungeon Failed",
//     description: `No one defeated **${spirit.name}**.`,
//     color: 0xff0000,
//   });
