import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
        SharedModule
    ],
    providers:[UserService],
    controllers:[UserController],
    exports:[UserService, TypeOrmModule]
})
export class UserModule {}
