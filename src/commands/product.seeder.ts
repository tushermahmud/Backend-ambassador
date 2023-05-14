import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { faker } from '@faker-js/faker';
import { ProductService } from "../product/product.service";


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productService = app.get(ProductService)

    for(let i = 0; i< 30; i++){
        await productService.save({
            title:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            price:faker.commerce.price(),
            image:faker.image.imageUrl(200, 200, '' , true),
        })
    }
  await app.close();
};
bootstrap();
