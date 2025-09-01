import { resolve } from "@/core/container";
import type { ISpiritRepository } from "@/domain";

export class SpiritService {
  private spiritRepository: ISpiritRepository;
  constructor() {
    this.spiritRepository = resolve<ISpiritRepository>("SpiritRepository");
  }
  async getSpirits() {
    return await this.spiritRepository.findAll();
  }
  async findSpiritByName(name: string) {
    return await this.spiritRepository.findByName(name);
  }
}
