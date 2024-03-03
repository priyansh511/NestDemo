import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    // graphql dependencies
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver : ApolloDriver
    }),
    //typeorm dependencies
    TypeOrmModule.forRoot({
      type : 'sqlite',
      database : 'app.db',
      entities : ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize : true,
    }),
    UserModule, 
    PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
