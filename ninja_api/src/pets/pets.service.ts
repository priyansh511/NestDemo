import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPetInput.dto';
import { OwnerService } from '../owner/owner.service';
import { Owner } from '../owner/entities/owner.entity';

@Injectable()
export class PetsService {

    constructor (
        @InjectRepository(Pet)  // @InjectRepository support provide by TypeOrm
        private petRepository : Repository<Pet>,
        private ownerService : OwnerService
    ){}

    async findAll() : Promise<Pet []> {
        return this.petRepository.find(); //inbuilt function, basically select * from pet
        
    }

    async findOne(id : number) : Promise<Pet> {
        return this.petRepository.findOneOrFail({where : {id : id}});
    }

    async createPet(createPetInput : CreatePetInput) : Promise<Pet>{
        const newPet = this.petRepository.create(createPetInput); // initialising new pet object
        return this.petRepository.save(newPet); // saving new pet object in db
    }
    
    async getOwner(ownerId : number) : Promise<Owner> {
        return this.ownerService.findOne(ownerId); 
    }
}
