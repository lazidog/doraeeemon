import type { Element, Skill } from "@/domain/types";

export class Spirit {
  id: string;
  name: string;
  element: Element;
  hp: number;
  skills: Skill[];

  constructor(data: Spirit) {
    this.id = data.id;
    this.name = data.name;
    this.element = data.element;
    this.hp = data.hp;
    this.skills = data.skills;
  }
}
