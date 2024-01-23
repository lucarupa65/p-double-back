import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from './entities/ticket.entity';

@Module({
  providers: [TicketResolver, TicketService],
  imports: [
    TypeOrmModule.forFeature([Ticket])
  ],
  exports: [
    TicketService,
    TypeOrmModule
  ]
})
export class TicketModule {}
