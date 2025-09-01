import type { Spirit } from "@/domain/entities/spirit";

export interface ISpiritRepository {
  findAll(): Promise<Spirit[]>;
  findByName(name: string): Promise<Spirit | undefined>;
}
