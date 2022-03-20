import { Injectable } from '@nestjs/common';
import { AsusConfigRepository } from './repositories/asus-config.repository';

@Injectable()
export class DatahubService {
  constructor(private readonly asusConfigRepository: AsusConfigRepository) {}
  getHealth(): boolean {
    return true;
  }

  findAsusConfig() {
    return this.asusConfigRepository.find();
  }

}
