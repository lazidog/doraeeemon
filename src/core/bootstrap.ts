import { BattleService } from "@/application/services/battle.service";
import { DungeonService } from "@/application/services/dungeon.service";
import { SpiritService } from "@/application/services/spirit.service";
import { BattleRepository } from "@/infra/repositories/battle.repository";
import { DungeonRepository } from "@/infra/repositories/dungeon.repository";
import { SpiritRepository } from "@/infra/repositories/spirit.repository";
import { register } from "./container";

export function bootstrap(): void {
  // infra
  register("BattleRepository", new BattleRepository());
  register("DungeonRepository", new DungeonRepository());
  register("SpiritRepository", new SpiritRepository());

  // application
  register("BattleService", new BattleService());
  register("DungeonService", new DungeonService());
  register("SpiritService", new SpiritService());
}
