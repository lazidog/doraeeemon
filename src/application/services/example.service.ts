import { resolve } from "@/core/container";
import type { IExampleRepository } from "@/domain";

export class ExampleService {
  private exampleRepository: IExampleRepository;
  constructor() {
    this.exampleRepository = resolve<IExampleRepository>("ExampleRepository");
  }
  async getExamples() {
    return await this.exampleRepository.findAll();
  }
}
