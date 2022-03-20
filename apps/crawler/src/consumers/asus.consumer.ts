import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AsusProducer } from '../producers/asus.producer';
import { ConfigDto } from '@app/dto/config.dto';

@Processor(QueueEnum.crawlAsus)
export class AsusConsumer {
  constructor(private asusProducer: AsusProducer) {}

  @Process()
  async process(job: Job) {
    await this.asusProducer.produceSingleTasks(job.data as ConfigDto);
  }
}
