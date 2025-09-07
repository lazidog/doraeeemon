import type { Example } from "../entities/example.entity";

export interface IExampleRepository {
  findAll(): Promise<Example[]>;
}
