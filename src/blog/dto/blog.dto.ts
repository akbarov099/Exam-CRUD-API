import { IsNotEmpty, IsString } from "class-validator";

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
