import type { Spirit } from "@/domain/entities/spirit";

export class Dungeon {
  gemPool: number;
  participants: { userId: string; spirits: Spirit[] }[];
  threshold: number;
  active: boolean;

  constructor() {
    this.gemPool = 0;
    this.participants = [];
    this.threshold = 3; // For testing
    this.active = false;
  }
}
