import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(private readonly userService:UserService){
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/ambassadors')
    async ambassadors () {
        return await this.userService.find({is_ambassador: true});
    }
}
