import type { Dungeon } from "@/domain/entities/dungeon";

export interface IDungeonRepository {
  get(): Dungeon;
  update(dungeon: Dungeon): void;
}
