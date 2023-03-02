import { IsNotEmpty } from 'class-validator';
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateGoodsInput {
  @Field()
  @IsNotEmpty()
  categoryId?: number;

  @Field()
  @IsNotEmpty()
  name?: string;

  @Field()
  @IsNotEmpty()
  measure?: string;

  @Field(() => Float)
  @IsNotEmpty()
  quantity?: number;

  @Field(() => Float)
  @IsNotEmpty()
  price?: number;
}
// enum Measure {
// Амп,
// Доза,
// Мл,
// Флакон,
// Шт,
// Таб,
// }
