import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('')
export class OrderController {
    constructor(private orderService:OrderService){

    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/orders')
    async all(){
        return await this.orderService.findAll({
            relations: ['order_items']
        });
    }
}
