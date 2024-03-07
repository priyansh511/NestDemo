import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/createPetInput.dto';
import { Owner } from '../owner/entities/owner.entity';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService){}
    @Query(returns => [Pet]) // import correct decorator from @nest/graphql and not from nestjs/common
    //also gql represents array as [pets] while in ts it is pets[]
    pets() : Promise<Pet[]> {
        return this.petService.findAll();
    }

    @Query(returns => Pet)
    pet(@Args('id', {type : () => Int}) id : number) : Promise<Pet> {
        return this.petService.findOne(id);
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput : CreatePetInput) : Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }

    @ResolveField(returns => Owner)
    owner(@Parent() pet : Pet) : Promise<Owner> {
        return this.petService.getOwner(pet.ownerId);
    }
}



