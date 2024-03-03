import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/createPetInput.dto';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService){}
    @Query(returns => [Pet]) // import correct decorator from @nest/graphql and not from nestjs/common
    //also gql represents array as [pets] while in ts it is pets[]
    pets() : Promise<Pet[]> {
        return this.petService.findAll();
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput : CreatePetInput) : Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }
}
