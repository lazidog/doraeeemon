import type { Battle, IBattleRepository } from "@/domain";
import { battles } from "@/memory";

export class BattleRepository implements IBattleRepository {
  save(battle: Battle): void {
    battles.set(battle.id, battle);
  }

  findById(id: string): Battle | undefined {
    return battles.get(id);
  }

  find(predicate: (battle: Battle) => boolean): Battle | undefined {
    for (const battle of battles.values()) {
      if (predicate(battle)) {
        return battle;
      }
    }
    return undefined;
  }

  delete(id: string): void {
    battles.delete(id);
  }
}
