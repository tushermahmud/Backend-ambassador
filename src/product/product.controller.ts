import { Body, Controller, Get, Post, Param, ParseIntPipe, Put, Delete, UseGuards, UseInterceptors, Inject, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';
import { CacheKey,CacheInterceptor,CacheTTL, CACHE_MANAGER } from '@nestjs/cache-manager';
import {Cache} from 'cache-manager'
import {EventEmitter2} from "@nestjs/event-emitter"
import {Request} from "express"
import { Product } from './product.entity';
@Controller()
export class ProductController {
    constructor(private productService:ProductService, @Inject(CACHE_MANAGER) private cacheManager:Cache, private eventEmitter: EventEmitter2){
    }

    @UseGuards(AuthGuard)
    @Get('admin/products')
    async getAllProducts(){
        return await this.productService.findAll({});
    }

    @UseGuards(AuthGuard)
    @Post('admin/products')
    async create(@Body() body:ProductCreateDto){
        const product = await this.productService.save(body)
        this.eventEmitter.emit('product_updated')
        return product
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
        this.eventEmitter.emit('product_updated')
        return await this.productService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Delete('admin/products/:id')
    async delete(@Param('id') id:number){
        const response = await this.productService.delete(id);
        this.eventEmitter.emit('product_updated')
        return response;
    }

    @CacheKey('products_frontend')
    @CacheTTL(30*60)
    @UseInterceptors(CacheInterceptor)
    @Get('ambassador/products/frontend')
    async frontend(){
        return await this.productService.findAll({})
    }

    @Get('ambassador/products/backend')
    async backend(@Req() request:Request){
        let products = await this.cacheManager.get<Product[]>('products_backend');
        if(!products) {
            products = await this.productService.findAll({})
            await this.cacheManager.set('products_backend',products, 3600)
        }
        if(request.query.s){
            const s = request.query.s.toString().toLowerCase();
            products= products.filter(p=>p.title.toLowerCase().indexOf(s)>=0||p.description.toLowerCase().indexOf(s)>=0)
        }
        if(request.query.sort === 'asc' || request.query.sort === 'desc'){
            products= products.sort((a:Product,b:Product):number=>{
                const diff = a.price - b.price;
                if(diff === 0) return 0;
                const sign = Math.abs(diff)/diff;
                return request.query.sort === 'asc'?sign:-sign;
            })
        }
        const page:number = parseInt(request.query.page as any)||1;
        const perPage = 9;
        const total = products.length;
        const data = products.slice((page-1)*perPage, page*perPage);
        return {
            data,
            total,
            page,
            lastPage:Math.ceil(total/perPage)
        }
    }
}
