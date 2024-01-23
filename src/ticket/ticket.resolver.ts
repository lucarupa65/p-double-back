import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput, UpdateTicketInput } from './dto/inputs';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Ticket)
@UseGuards(JwtAuthGuard)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => Ticket)
  async createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @CurrentUser([ValidRoles.user]) user: User,
  ): Promise<Ticket> {
    return this.ticketService.create(createTicketInput, user);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  async findAll(@CurrentUser([ValidRoles.user]) user: User): Promise<Ticket[]> {
    return this.ticketService.findAll(user);
  }

  @Query(() => Ticket, { name: 'ticket' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.user]) user: User,
  ): Promise<Ticket> {
    return this.ticketService.findOne(id, user);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
    @CurrentUser([ValidRoles.user]) user: User,
  ) {
    return this.ticketService.update(
      updateTicketInput.id,
      updateTicketInput,
      user,
    );
  }

  @Mutation(() => Ticket)
  async removeTicket(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser([ValidRoles.user]) user: User,
  ): Promise<Ticket> {
    return this.ticketService.remove(id, user);
  }
}
