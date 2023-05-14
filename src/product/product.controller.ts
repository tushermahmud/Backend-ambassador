import { Body, Controller, Get, Post, Param, ParseIntPipe, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private productService:ProductService){
    }

    @UseGuards(AuthGuard)
    @Get('admin/products')
    async getAllProducts(){
        return await this.productService.findAll({});
    }

    @UseGuards(AuthGuard)
    @Post('admin/products')
    async create(@Body() body:ProductCreateDto){
        return await this.productService.save(body)
    }

    @UseGuards(AuthGuard)
    @Get('admin/products/:id')
    async getProduct(@Param('id', ParseIntPipe) id:number){
        return await this.productService.findById(id)
    }

    @UseGuards(AuthGuard)
    @Put('admin/products/:id')
    async update(@Param('id',ParseIntPipe) id:number, @Body() body:ProductCreateDto){
        await this.productService.update(id, body);
        return await this.productService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Delete('admin/products/:id')
    async delete(@Param('id') id:number){
        await this.productService.delete(id);
    }
}
