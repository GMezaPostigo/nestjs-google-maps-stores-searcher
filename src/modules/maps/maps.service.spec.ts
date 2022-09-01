import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';
import { ConfigService } from '@nestjs/config';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService, ConfigService],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
