import { resolve } from "@/core/container";
import type { IDungeonRepository, ISpiritRepository } from "@/domain";
import {} from "@/domain/types";
import {} from "@/infra/mezon/message.builder";

export class DungeonService {
  private dungeonRepository: IDungeonRepository;
  private spiritRepository: ISpiritRepository;
  constructor() {
    this.dungeonRepository = resolve<IDungeonRepository>("DungeonRepository");
    this.spiritRepository = resolve<ISpiritRepository>("SpiritRepository");
  }

  // async joinDungeon(
  //   dungeon: Dungeon,
  //   userId: string,
  //   channelId: string,
  //   selectedSpirits: Spirit[],
  // ): Promise<{ content: ChannelMessageContent }> {
  //   const gemCost = 10;
  //   dungeon.gemPool += gemCost;
  //   dungeon.participants.push({
  //     userId,
  //     spirits: selectedSpirits.map((p) => new Spirit({ ...p, hp: p.hp })),
  //   });

  //   if (dungeon.participants.length >= dungeon.threshold) {
  //     dungeon.active = true;
  //     const content = createDungeonStartedMessage(dungeon);
  //     return { content };
  //   } else {
  //     const content = createDungeonJoinedMessage(dungeon, userId, selectedSpirits);
  //     return { content };
  //   }
  // }

  // async getDungeonInfo(
  //   dungeon: Dungeon,
  //   channelId: string,
  // ): Promise<{ content: ChannelMessageContent }> {
  //   const content = createDungeonInfoMessage(dungeon);
  //   return { content };
  // }

  // async startDungeonBattle(
  //   dungeon: Dungeon,
  //   channelId: string,
  // ): Promise<{ contents: ChannelMessageContent[] }> {
  //   const monsters = this.spiritRepository.getMonsters();
  //   const monster = new Monster({
  //     ...monsters[Math.floor(Math.random() * monsters.length)],
  //     hp: monsters[0].hp,
  //   });
  //   const winners: string[] = [];
  //   const contents: ChannelMessageContent[] = [];

  //   for (const participant of dungeon.participants) {
  //     const playerSpirits = [...participant.spirits];
  //     let monsterHP = monster.hp;

  //     contents.push(
  //       createDungeonBattleMessage(
  //         participant.userId,
  //         monster,
  //         monsterHP,
  //         playerSpirits,
  //       ),
  //     );

  //     while (playerSpirits.length > 0 && monsterHP > 0) {
  //       const spirit = playerSpirits[0];
  //       let damage = this.calculateBaseDamage(spirit, monster);

  //       for (const skill of spirit.skills) {
  //         if (
  //           skill.type === SkillType.Passive ||
  //           (skill.type === SkillType.Trigger &&
  //             skill.conditions.includes(Condition.OnAttack))
  //         ) {
  //           for (const effect of skill.effects) {
  //             if (
  //               effect.type === EffectType.Buff &&
  //               effect.operator === "multiply" &&
  //               skill.conditions.includes(Condition.OnAdvantage)
  //             ) {
  //               if (
  //                 ELEMENTAL_ADVANTAGES[spirit.element].includes(monster.element)
  //               ) {
  //                 damage *= effect.value;
  //               }
  //             }
  //           }
  //         }
  //       }

  //       monsterHP -= damage;
  //       contents.push(createBattleUpdateMessage(spirit, monster, damage));

  //       if (monsterHP <= 0) {
  //         winners.push(participant.userId);
  //         break;
  //       }

  //       const monsterDamage = this.calculateBaseDamage(monster, spirit);
  //       spirit.hp -= monsterDamage;
  //       contents.push(createBattleUpdateMessage(monster, spirit, monsterDamage));

  //       if (spirit.hp <= 0) {
  //         playerSpirits.shift();

  //         contents.push(
  //           createSpiritDefeatedMessage(
  //             {
  //               player1Spirits: playerSpirits,
  //               player2Spirits: [] /* dummy battle */,
  //             } as Battle,
  //             spirit,
  //           ),
  //         );
  //       }
  //     }
  //   }

  //   const rewardPerWinner = dungeon.gemPool / (winners.length || 1);
  //   for (const winnerId of winners) {
  //     contents.push(
  //       createDungeonVictoryMessage(winnerId, monster, rewardPerWinner),
  //     );
  //   }

  //   if (winners.length === 0) {
  //     contents.push(createDungeonFailedMessage(monster));
  //   }

  //   dungeon.gemPool = 0;
  //   dungeon.participants = [];
  //   dungeon.active = false;

  //   return { contents };
  // }

  // private calculateBaseDamage(
  //   attacker: Spirit | Monster,
  //   defender: Spirit | Monster,
  // ): number {
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
