import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Res, Req, UseInterceptors, ClassSerializerInterceptor, UnauthorizedException, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
    constructor(private userService:UserService, private jwtService:JwtService, private authService:AuthService){}


    @Post('admin/register')
    async register(@Body() body:RegisterDto){
        const {confirm_password, ...data} = body;
        if(body.password !==confirm_password){
            throw new BadRequestException("Password doesn't match!")
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(body.password,salt);
        return this.userService.save({
            ...data,
            is_ambassador:false,
            password:hash
        })
    }


    @Post('admin/login')
    async login(
        @Body() body:LoginDto,
        @Res({ passthrough: true }) res: Response,
    ){
        const token = await this.authService.login(body);        
        return res.cookie('token',token,{httpOnly:true,secure:false,sameSite: 'lax',expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({message:"success"});
        
    }


    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/user')
    async user(@Req() req:Request):Promise<User>{
        const cookie = req.cookies['token'];
        if(!cookie) throw new UnauthorizedException("Please Login First")
        const {email} = await this.jwtService.verifyAsync(cookie);
        const user = await this.userService.findOne(email)
        return user;
    }


    @UseGuards(AuthGuard)
    @Post('admin/logout')
    async logout(@Res({passthrough:true}) response:Response){
        response.clearCookie('token')
        return {message:"success"};
    }


    @UseGuards(AuthGuard)
    @Put('/admin/info')
    async updateInfo(@Req() request:Request, @Body('firstName') firstName:string, @Body('lastName') lastName:string, @Body('email') email:string){
        const cookie = request.cookies['token'];
        const {id} = await this.jwtService.verifyAsync(cookie);
        await this.userService.update(id,{firstName,lastName,email});
        return this.userService.findById(id)
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Put('/admin/password')
    async updatePassword(@Req() request:Request, @Body('password') password:string, @Body('confirm_password') confirm_password:string){
        if(password !==confirm_password){
            throw new BadRequestException("Password doesn't match!")
        }
        const cookie = request.cookies['token'];
        const {id} = await this.jwtService.verifyAsync(cookie);
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password,salt);
        await this.userService.update(id,{password: await bcrypt.hash(password,salt)});
        return this.userService.findById(id)
    }
}
