import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  state: boolean;
}
