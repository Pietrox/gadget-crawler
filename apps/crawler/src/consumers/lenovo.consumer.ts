import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ConfigDto } from '@app/dto/config.dto';
import {LenovoProducer} from "../producers/lenovo.producer";

@Processor(QueueEnum.crawlLenovo)
export class LenovoConsumer {
  constructor(private lenovoProducer: LenovoProducer) {}

  @Process()
  async process(job: Job) {
    await this.lenovoProducer.produceSingleTasks(job.data as ConfigDto);
  }
}
