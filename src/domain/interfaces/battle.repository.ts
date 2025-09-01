import type { Battle } from "@/domain/entities/battle";

export interface IBattleRepository {
  save(battle: Battle): void;
  findById(id: string): Battle | undefined;
  find(predicate: (battle: Battle) => boolean): Battle | undefined;
  delete(id: string): void;
}
