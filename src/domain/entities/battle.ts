import type { Spirit } from "@/domain/entities/spirit";
import type { SkillEffect } from "@/domain/types";

export class Battle {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Spirits: Spirit[];
  player2Spirits: Spirit[];
  bannedSpirits: string[];
  currentTurn: "player1" | "player2";
  phase: "ban" | "pick" | "battle";
  player1Effects: Map<string, { effect: SkillEffect; duration: number }>;
  player2Effects: Map<string, { effect: SkillEffect; duration: number }>;

  constructor(id: string, player1Id: string, player2Id: string) {
    this.id = id;
    this.player1Id = player1Id;
    this.player2Id = player2Id;
    this.player1Spirits = [];
    this.player2Spirits = [];
    this.bannedSpirits = [];
    this.currentTurn = "player1";
    this.phase = "ban";
    this.player1Effects = new Map();
    this.player2Effects = new Map();
  }
}
