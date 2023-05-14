import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { faker } from '@faker-js/faker';
import { OrderService } from "../order/order.service";
import { OrderItemService } from "../order/order-item.service";
import { randomInt } from "crypto";


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const orderService = app.get(OrderService);
    const orderItemService= app.get(OrderItemService)
    for(let i = 0; i< 30; i++){
        const order = await orderService.save({
            user_id:randomInt(2,32),
            code:faker.lorem.slug(2),
            ambassador_email:faker.internet.email(),
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            email:faker.internet.email(),
            // address:faker.address.streetAddress(),
            // country:faker.address.country(),
            // city:faker.address.city(),
            // zip:faker.address.zipCode(),
            complete:true
        })
        for(let i= 0; i<randomInt(1,5); i++){
            await orderItemService.save({
                order,
                product_title:faker.lorem.words(2),
                price:randomInt(10,100),
                quantity:randomInt(1,5),
                admin_revenue:randomInt(10,100),
                ambassador_revenue:randomInt(1,10)
            })
        }
    }
  await app.close();
};
bootstrap();
