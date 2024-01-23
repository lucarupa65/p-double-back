import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User]),TicketModule],
  exports: [
    TypeOrmModule,
    UsersService,
  ],
})
export class UsersModule {}
