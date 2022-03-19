import { Test, TestingModule } from '@nestjs/testing';
import { DatahubController } from './datahub.controller';
import { DatahubService } from './datahub.service';

describe('DatahubController', () => {
  let datahubController: DatahubController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DatahubController],
      providers: [DatahubService],
    }).compile();

    datahubController = app.get<DatahubController>(DatahubController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(datahubController.getHello()).toBe('Hello World!');
    });
  });
});
