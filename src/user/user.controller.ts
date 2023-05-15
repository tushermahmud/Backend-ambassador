import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(private readonly userService:UserService){
    }
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/ambassadors')
    async ambassadors () {
        return await this.userService.findAll({is_ambassador: true});
    }
}
