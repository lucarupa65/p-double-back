import { CreateTickestInput } from './create-tickest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTickestInput extends PartialType(CreateTickestInput) {
  @Field(() => Int)
  id: number;
}
