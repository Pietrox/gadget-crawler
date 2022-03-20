import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ConfigDto } from '@app/dto/config.dto';
import {SamsungProducer} from "../producers/samsung.producer";

@Processor(QueueEnum.crawlSamsung)
export class SamsungConsumer {
  constructor(private samsungProducer: SamsungProducer) {}

  @Process()
  async process(job: Job) {
    await this.samsungProducer.produceSingleTasks(job.data as ConfigDto);
  }
}
