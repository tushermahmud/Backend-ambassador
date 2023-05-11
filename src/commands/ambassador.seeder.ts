import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { UserService } from "../user/user.service";


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService)
    const password = await bcrypt.hash("SAZZADkueturp2k14", 12);

    for(let i = 0; i< 30; i++){
        await userService.save({
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            email:faker.internet.email(),
            password,
            is_ambassador:true,
        })
    }
  await app.close();
};
bootstrap();
