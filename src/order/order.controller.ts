import { ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';

@Controller('')
export class OrderController {
    constructor(private orderService:OrderService){

    }
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/orders')
    async all(){
        return await this.orderService.findAll({
            relations: ['order_items']
        });
    }
}
