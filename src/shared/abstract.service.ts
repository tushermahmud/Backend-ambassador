import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AbstractService {
    protected constructor(protected readonly repository:Repository<any>){}
    async save(options){
        return await this.repository.save(options)
    }

    async findOne(email){
        return await this.repository.findOne({where:{email}});
    }

    async update(id:number, data){
        return await this.repository.update(id, data); 
    }

    async find(options){
        return await this.repository.find({where: options});
    }

    async findById(id){
        return await this.repository.findOne({where:{id}})
    }
    
    async findAll(data){
        return await this.repository.find(data);
    }

    async delete(id:number){
        return await this.repository.delete(id)
    }
}
