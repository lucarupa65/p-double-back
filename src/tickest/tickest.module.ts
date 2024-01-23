import { Module } from '@nestjs/common';
import { TickestService } from './tickest.service';
import { TickestResolver } from './tickest.resolver';

@Module({
  providers: [TickestResolver, TickestService],
})
export class TickestModule {}
