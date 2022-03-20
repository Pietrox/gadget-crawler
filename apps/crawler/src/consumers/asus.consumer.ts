import { QueueEnum } from '@app/enums';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor(QueueEnum.crawlAsus)
export class AsusConsumer {
  @Process()
  async process(job: Job<unknown>) {
    console.log(job.data);
  }
}
