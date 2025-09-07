import type { Example, IExampleRepository } from "@/domain";

export class ExampleRepository implements IExampleRepository {
  constructor() {}
  findAll(): Promise<Example[]> {
    return Promise.resolve([]);
  }
}
