import { Spirit } from "@/domain";
import type { ISpiritRepository } from "@/domain/interfaces/spirit.repository";

export class SpiritRepository implements ISpiritRepository {
  private entities: Spirit[];

  constructor() {
    this.entities = require("../../../docs/spirit.json");
  }

  findAll(): Promise<Spirit[]> {
    return new Promise((resolve) => {
      resolve(this.entities.map((e) => new Spirit(e)));
    });
  }

  findByName(name: string): Promise<Spirit | undefined> {
    const entity = this.entities.find(
      (e) => e.name.toLowerCase() === name.toLowerCase(),
    );
    return new Promise((resolve) => {
      resolve(entity ? new Spirit(entity) : undefined);
    });
  }
}
