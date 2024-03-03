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
      type : 'sqlite', // can use [':memory:'] whcih will create an inmemory database but that will recreate at every app start
      database : 'app.db',
      entities : ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize : true, // warning : don't use in prod, use migrations instead
    }),
    UserModule, 
    PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
