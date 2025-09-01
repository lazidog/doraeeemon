import { Dungeon, type IDungeonRepository } from "@/domain";

export class DungeonRepository implements IDungeonRepository {
  private dungeon: Dungeon = new Dungeon();

  get(): Dungeon {
    return this.dungeon;
  }

  update(dungeon: Dungeon): void {
    this.dungeon = dungeon;
  }
}
