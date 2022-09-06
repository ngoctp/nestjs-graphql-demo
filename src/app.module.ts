import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
