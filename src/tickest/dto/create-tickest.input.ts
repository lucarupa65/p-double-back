import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTickestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
