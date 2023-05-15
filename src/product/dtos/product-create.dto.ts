import { IsNotEmpty, IsOptional } from "class-validator";

export class ProductCreateDto{
    @IsNotEmpty()
    @IsOptional()
    title?:string;

    @IsNotEmpty()
    @IsOptional()
    description?:string;

    @IsNotEmpty()
    @IsOptional()
    image?:string;

    @IsNotEmpty()
    @IsOptional()
    price?:number;

}