import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
    async save(options):Promise<User>{
        return await this.userRepository.save(options)
    }

    async findOne(email):Promise<User>{
        return await this.userRepository.findOne({where:{email}});
    }

    async update(id:number, data){
        return await this.userRepository.update(id, data); 
    }

    async find(options):Promise<User[]>{
        return await this.userRepository.find({where: options});
    }

    async findById(id){
        return await this.userRepository.findOne({where:{id}})
    }
}
