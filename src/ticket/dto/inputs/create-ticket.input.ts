import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, minLength } from 'class-validator';

@InputType()
export class CreateTicketInput {

  @Field( () => String)
  @IsNotEmpty()
  @IsString()
  descrition: string;


}
