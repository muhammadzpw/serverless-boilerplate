import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;
}
