import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>, private userService:UserService,private jwtService:JwtService){

    }

    async login(data,adminLogin){
        const {email, password} = data;
        const userExists = await this.userService.findOne(email);
        if(!userExists){
            throw new NotFoundException("User doesn't exist!")
        }
        if(userExists.is_ambassador && adminLogin) throw new UnauthorizedException()
        const passwordCompared = await bcrypt.compare(password, userExists.password);
        if(!passwordCompared){
            throw new BadRequestException("Password or Username doesn't match");
        }
        const payload = { email: email, id: userExists.id, scope:adminLogin?'admin':'abmassador' };
        const token = await this.jwtService.signAsync(payload);

        return token;
    }
}
