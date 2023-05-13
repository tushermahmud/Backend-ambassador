import { Body, Controller, Get, Post, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private productService:ProductService){
    }


    @Get('admin/products')
    async getAllProducts(){
        return await this.productService.findAll({});
    }

    @Post('admin/products')
    async create(@Body() body:ProductCreateDto){
        return await this.productService.save(body)
    }

    @Get('admin/products/:id')
    async getProduct(@Param('id', ParseIntPipe) id:number){
        return await this.productService.findById(id)
    }

    @Put('admin/products/:id')
    async update(@Param('id',ParseIntPipe) id:number, @Body() body:ProductCreateDto){
        await this.productService.update(id, body);
        return await this.productService.findById(id);
    }

    @Delete('admin/products/:id')
    async delete(@Param('id') id:number){
        await this.productService.delete(id);
    }
}
