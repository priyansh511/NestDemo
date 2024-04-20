import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner)  // @InjectRepository support provide by TypeOrm
    private ownerRepository: Repository<Owner>){}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  async findAll() : Promise<Owner[]> { 
    return this.ownerRepository.find();
  }

  async findOne(id: number) : Promise<Owner> {
    return this.ownerRepository.findOneOrFail({where:{id}});
  }

  //TODO: implement create update and remove
  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
