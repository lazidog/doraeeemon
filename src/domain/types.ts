export enum Element {
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Earth = "Earth",
  Electric = "Electric",
  Ice = "Ice",
  Poison = "Poison",
  Psychic = "Psychic",
  Dragon = "Dragon",
  Light = "Light",
  Dark = "Dark",
}

export enum SkillType {
  Active = "Active",
  Passive = "Passive",
  Trigger = "Trigger",
}

export enum Condition {
  OnTurn = "onTurn",
  OnAttack = "onAttack",
  OnGetHit = "onGetHit",
  OnKill = "onKill",
  OnDie = "onDie",
  OnAdvantage = "onAdvantage",
  OnCountered = "onCountered",
  OnAllyAdvantage = "onAllyAdvantage",
}

export enum EffectType {
  Heal = "Heal",
  Buff = "Buff",
  Debuff = "Debuff",
  AOE = "AOE",
  TargetDamage = "TargetDamage",
  ReduceDamage = "ReduceDamage",
  Stun = "Stun",
  DOT = "DOT",
  Swap = "Swap",
}

export interface SkillEffect {
  type: EffectType;
  value: number;
  target?:
    | "self"
    | "enemy"
    | "allEnemies"
    | "allAllies"
    | "nextAlly"
    | "randomEnemy";
  duration?: number;
  chance?: number;
  operator?: "multiply" | "add";
  maxHP?: number;
}

export interface Skill {
  name: string;
  type: SkillType;
  description: string;
  conditions: Condition[];
  effects: SkillEffect[];
}

export interface Spirit {
  name: string;
  element: Element;
  hp: number;
  skills: Skill[];
}

export const ELEMENTAL_ADVANTAGES: Record<Element, Element[]> = {
  [Element.Fire]: [Element.Ice, Element.Grass],
  [Element.Water]: [Element.Fire, Element.Earth],
  [Element.Earth]: [Element.Electric, Element.Ice],
  [Element.Electric]: [Element.Water],
  [Element.Poison]: [Element.Grass],
  [Element.Grass]: [Element.Earth, Element.Water],
  [Element.Psychic]: [Element.Poison],
  [Element.Ice]: [Element.Grass, Element.Dragon],
  [Element.Dragon]: [Element.Dragon, Element.Psychic],
  [Element.Light]: [Element.Dark],
  [Element.Dark]: [Element.Light, Element.Psychic],
};

import type { CommandBase } from "@/application/commands/base";
import type { ChannelMessage, MezonClient } from "mezon-sdk";
import type { MessageButtonClicked } from "mezon-sdk/dist/cjs/rtapi/realtime";

export type BattlePhase = "ban" | "pick" | "battle";

/**
 * Represents the constructor type of a Command class.
 *
 * This ensures that the class passed to decorators (like @Command)
 * must be instantiable with a MezonClient and a MessageType = CommandMessage | ActionMessage,
 * and must extend CommandBase.
 *
 * Generic <T> allows preserving specific subclass types if needed.
 */
export type CommandClass<
  TMessage extends MessageType = MessageType,
  T extends CommandBase = CommandBase,
> = {
  new (client: MezonClient, message: TMessage): T;
};

export enum CommandName {
  PvP = "pvp",
  PvE = "pve",
  Spirits = "spirits",
}

export enum ActionName {
  CancelChallenge = "cancelChallenge",
  ConfirmChallenge = "confirmChallenge",
  ConfirmPick = "confirmPick",
  ConfirmBan = "confirmBan",
}

export interface CommandRegistry {
  [CommandName.PvE]: CommandClass<CommandMessage>;
  [CommandName.PvP]: CommandClass<CommandMessage>;
  [CommandName.Spirits]: CommandClass<CommandMessage>;
  [ActionName.CancelChallenge]: CommandClass<ActionMessage>;
  [ActionName.ConfirmChallenge]: CommandClass<ActionMessage>;
  [ActionName.ConfirmPick]: CommandClass<ActionMessage>;
  [ActionName.ConfirmBan]: CommandClass<ActionMessage>;
}

export interface CommandMessage extends ChannelMessage {
  type: "command";
}

export interface ActionMessage extends MessageButtonClicked {
  type: "action";
}

export type MessageType = CommandMessage | ActionMessage;

export type CommandOnlyName = {
  [K in keyof CommandRegistry]: CommandRegistry[K] extends CommandClass<CommandMessage>
    ? K
    : never;
}[keyof CommandRegistry];

export type ActionOnlyName = {
  [K in keyof CommandRegistry]: CommandRegistry[K] extends CommandClass<ActionMessage>
    ? K
    : never;
}[keyof CommandRegistry];

export type CommandAndActionName = CommandOnlyName | ActionOnlyName;
