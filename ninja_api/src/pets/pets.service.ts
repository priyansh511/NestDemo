import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPetInput.dto';

@Injectable()
export class PetsService {

    constructor (
        @InjectRepository(Pet)  // @InjectRepository support provide by TypeOrm
        private petRepository : Repository<Pet>
    ){}

    async findAll() : Promise<Pet []> {
        return this.petRepository.find(); //inbuilt function, basically select * from pet
        
    }

    async createPet(createPetInput : CreatePetInput) : Promise<Pet>{
        const newPet = this.petRepository.create(createPetInput); // initialising new pet object
        return this.petRepository.save(newPet); // saving new pet object in db
    }
}
