import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TickestService } from './tickest.service';
import { Tickest } from './entities/tickest.entity';
import { CreateTickestInput } from './dto/create-tickest.input';
import { UpdateTickestInput } from './dto/update-tickest.input';

@Resolver(() => Tickest)
export class TickestResolver {
  constructor(private readonly tickestService: TickestService) {}

  @Mutation(() => Tickest)
  createTickest(@Args('createTickestInput') createTickestInput: CreateTickestInput) {
    return this.tickestService.create(createTickestInput);
  }

  @Query(() => [Tickest], { name: 'tickest' })
  findAll() {
    return this.tickestService.findAll();
  }

  @Query(() => Tickest, { name: 'tickest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tickestService.findOne(id);
  }

  @Mutation(() => Tickest)
  updateTickest(@Args('updateTickestInput') updateTickestInput: UpdateTickestInput) {
    return this.tickestService.update(updateTickestInput.id, updateTickestInput);
  }

  @Mutation(() => Tickest)
  removeTickest(@Args('id', { type: () => Int }) id: number) {
    return this.tickestService.remove(id);
  }
}
