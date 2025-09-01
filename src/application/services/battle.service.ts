import { resolve } from "@/core/container";
import { Battle, type IBattleRepository } from "@/domain";
import type { BattlePhase } from "@/domain/types";

export class BattleService {
  private battleRepository: IBattleRepository;
  constructor() {
    this.battleRepository = resolve<IBattleRepository>("BattleRepository");
  }

  async buildBattleId(player1Id: string, player2Id: string): Promise<string> {
    return `${player1Id}:${player2Id}`;
  }

  async isBattleActiveById(battleId: string): Promise<boolean> {
    const battle = this.battleRepository.findById(battleId);
    return !!battle;
  }
  async isBattleActiveByPlayers(
    player1Id: string,
    player2Id: string,
  ): Promise<boolean> {
    const battle = this.battleRepository.find(
      (b) => b.player1Id === player1Id || b.player2Id === player2Id,
    );
    return !!battle;
  }

  async createBattle(player1Id: string, player2Id: string): Promise<Battle> {
    const battleId = await this.buildBattleId(player1Id, player2Id);
    const battle = new Battle(battleId, player1Id, player2Id);
    this.battleRepository.save(battle);
    return battle;
  }

  async deleteBattle(battleId: string): Promise<void> {
    this.battleRepository.delete(battleId);
  }

  async updateBattle(
    battleId: string,
    data: {
      phase: BattlePhase;
    },
  ): Promise<void> {
    const battle = this.battleRepository.findById(battleId);
    if (!battle) return;
    battle.phase = data.phase;
    this.battleRepository.save(battle);
  }

  // async handleBan(
  //   battle: Battle,
  //   spiritName: string,
  //   spirit: Spirit | undefined,
  // ): Promise<{ content: ChannelMessageContent }> {
  //   if (battle.phase !== "ban") {
  //     const content = createBanOverMessage();
  //     return { content };
  //   }

  //   if (battle.bannedSpirits.length >= 6) {
  //     battle.phase = "pick";
  //     const content = createBanCompletedMessage(battle);
  //     return { content };
  //   }

  //   if (!spirit) {
  //     const content = createSpiritNotFoundMessage(spiritName);
  //     return { content };
  //   }

  //   battle.bannedSpirits.push(spiritName);
  //   battle.currentTurn =
  //     battle.currentTurn === "player1" ? "player2" : "player1";
  //   const content = createSpiritBannedMessage(spiritName, battle);
  //   return { content };
  // }

  // async handlePick(
  //   battle: Battle,
  //   userId: string,
  //   spiritName: string,
  //   spirit: Spirit | undefined,
  // ): Promise<{ content: ChannelMessageContent }> {
  //   if (battle.phase !== "pick") {
  //     const content = createPickPhaseErrorMessage();
  //     return { content };
  //   }

  //   const playerSpirits =
  //     battle.currentTurn === "player1"
  //       ? battle.player1Spirits
  //       : battle.player2Spirits;
  //   if (playerSpirits.length >= 5) {
  //     if (
  //       battle.player1Spirits.length >= 5 &&
  //       battle.player2Spirits.length >= 5
  //     ) {
  //       battle.phase = "battle";
  //       const content = createPickPhaseCompleteMessage(battle);
  //       return { content };
  //     }
  //     battle.currentTurn =
  //       battle.currentTurn === "player1" ? "player2" : "player1";
  //     const content = createTeamFullMessage(battle);
  //     return { content };
  //   }

  //   if (!spirit || battle.bannedSpirits.includes(spiritName)) {
  //     const content = createInvalidSpiritMessage(spiritName);
  //     return { content };
  //   }

  //   playerSpirits.push(new Spirit({ ...spirit, hp: spirit.hp }));
  //   battle.currentTurn =
  //     battle.currentTurn === "player1" ? "player2" : "player1";
  //   const content = createSpiritPickedMessage(
  //     battle,
  //     userId,
  //     spiritName,
  //     playerSpirits,
  //   );
  //   return { content };
  // }

  // async simulateBattle(
  //   battle: Battle,
  //   channelId: string,
  // ): Promise<{
  //   content: ChannelMessageContent;
  //   lastContent?: ChannelMessageContent;
  // }> {
  //   let turn = 0;
  //   const maxTurns = 100;
  //   let lastContent: ChannelMessageContent | undefined;

  //   while (
  //     battle.player1Spirits.length > 0 &&
  //     battle.player2Spirits.length > 0 &&
  //     turn < maxTurns
  //   ) {
  //     const attacker =
  //       battle.currentTurn === "player1"
  //         ? battle.player1Spirits[0]
  //         : battle.player2Spirits[0];
  //     const defender =
  //       battle.currentTurn === "player1"
  //         ? battle.player2Spirits[0]
  //         : battle.player1Spirits[0];
  //     const effects =
  //       battle.currentTurn === "player1"
  //         ? battle.player1Effects
  //         : battle.player2Effects;

  //     let damage = this.calculateBaseDamage(attacker, defender);
  //     for (const skill of attacker.skills) {
  //       if (
  //         skill.type === SkillType.Passive ||
  //         (skill.type === SkillType.Trigger &&
  //           skill.conditions.includes(Condition.OnAttack))
  //       ) {
  //         for (const effect of skill.effects) {
  //           if (
  //             effect.type === EffectType.Buff &&
  //             effect.operator === "multiply" &&
  //             skill.conditions.includes(Condition.OnAdvantage)
  //           ) {
  //             if (
  //               ELEMENTAL_ADVANTAGES[attacker.element].includes(
  //                 defender.element,
  //               )
  //             ) {
  //               damage *= effect.value;
  //             }
  //           }
  //         }
  //       }
  //     }

  //     const defenderEffects =
  //       battle.currentTurn === "player1"
  //         ? battle.player2Effects
  //         : battle.player1Effects;
  //     let skipTurn = false;
  //     defenderEffects.forEach((effect, key) => {
  //       if (effect.effect.type === EffectType.Stun) {
  //         skipTurn = true;
  //         effect.duration--;
  //         if (effect.duration <= 0) defenderEffects.delete(key);
  //       }
  //     });

  //     if (!skipTurn) {
  //       defender.hp -= damage;
  //       lastContent = createBattleUpdateMessage(attacker, defender, damage);

  //       for (const skill of defender.skills) {
  //         if (skill.conditions.includes(Condition.OnGetHit)) {
  //           for (const effect of skill.effects) {
  //             if (effect.type === EffectType.DOT) {
  //               const effectId = `${defender.name}:${effect.type}:${Date.now()}`;
  //               defenderEffects.set(effectId, {
  //                 effect,
  //                 duration: effect.duration || 1,
  //               });
  //             }
  //           }
  //         }
  //       }

  //       if (defender.hp <= 0) {
  //         for (const skill of attacker.skills) {
  //           if (skill.conditions.includes(Condition.OnKill)) {
  //             for (const effect of skill.effects) {
  //               if (effect.type === EffectType.Heal) {
  //                 attacker.hp = Math.min(attacker.hp + effect.value, 50);
  //                 lastContent = createSkillEffectMessage(attacker, effect);
  //               }
  //             }
  //           }
  //         }
  //         for (const skill of defender.skills) {
  //           if (skill.conditions.includes(Condition.OnDie)) {
  //             for (const effect of skill.effects) {
  //               if (effect.type === EffectType.Debuff) {
  //                 const effectId = `${defender.name}:${effect.type}:${Date.now()}`;
  //                 effects.set(effectId, {
  //                   effect,
  //                   duration: effect.duration || 1,
  //                 });
  //               } else if (
  //                 effect.type === EffectType.Heal &&
  //                 effect.target === "nextAlly"
  //               ) {
  //                 const nextSpirit =
  //                   battle.currentTurn === "player1"
  //                     ? battle.player2Spirits[1]
  //                     : battle.player1Spirits[1];
  //                 if (nextSpirit) {
  //                   nextSpirit.hp = Math.min(
  //                     nextSpirit.hp + effect.value,
  //                     effect.maxHP || 50,
  //                   );
  //                   lastContent = createSkillEffectMessage(nextSpirit, effect);
  //                 }
  //               }
  //             }
  //           }
  //         }

  //         if (battle.currentTurn === "player1") {
  //           battle.player2Spirits.shift();
  //         } else {
  //           battle.player1Spirits.shift();
  //         }
  //         lastContent = createSpiritDefeatedMessage(battle, defender);
  //       }
  //     }

  //     effects.forEach((effect, key) => {
  //       if (effect.effect.type === EffectType.DOT) {
  //         defender.hp -= effect.effect.value;
  //         lastContent = createDotDamageMessage(defender, effect.effect.value);
  //         effect.duration--;
  //         if (effect.duration <= 0) effects.delete(key);
  //         if (defender.hp <= 0) {
  //           if (battle.currentTurn === "player1") {
  //             battle.player2Spirits.shift();
  //           } else {
  //             battle.player1Spirits.shift();
  //           }
  //           lastContent = createSpiritDefeatedMessage(battle, defender, true);
  //         }
  //       }
  //     });

  //     battle.currentTurn =
  //       battle.currentTurn === "player1" ? "player2" : "player1";
  //     turn++;
  //   }

  //   const winner =
  //     battle.player1Spirits.length > 0 ? battle.player1Id : battle.player2Id;
  //   const content = createBattleEndedMessage(battle, winner);
  //   return { content, lastContent };
  // }

  // private calculateBaseDamage(attacker: Spirit, defender: Spirit): number {
  //   const baseDamage = 10;
  //   const isAdvantage = ELEMENTAL_ADVANTAGES[attacker.element].includes(
  //     defender.element,
  //   );
  //   const isDisadvantage = ELEMENTAL_ADVANTAGES[defender.element].includes(
  //     attacker.element,
  //   );

  //   if (isAdvantage) return 20;
  //   if (isDisadvantage) return 0;
  //   return baseDamage;
  // }
}
