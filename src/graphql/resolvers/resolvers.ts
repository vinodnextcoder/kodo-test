import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context';
import { IResolvers } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';
import { AppConstants } from '../../constants/app.constants';
import { UsersController } from '../../controllers/users.controller';

const usersController = new UsersController();

const resolvers: IResolvers = {
  Query: {
    token: (_, args: any) => {
      return jwt.sign({ data: args[AppConstants.EMAIL] }, <string>process.env.auth_encryption_salt);
    },
    getUsers: (_: void, args: any, ctx: Context, _info: GraphQLResolveInfo) => {
      return usersController.getUsers(args, ctx);
    },
    localSearch: (_: void, args: any, ctx: Context, _info: GraphQLResolveInfo) => {
      return usersController.localSearch(args, ctx);
    }
  },
  Mutation: {
    addUser: (_, inputObject, ctx: Context) => {
      return usersController.addUser(inputObject, ctx);
    },
    updateUser: (_, inputObject, ctx: Context) => {
      return usersController.updateUser(inputObject, ctx);
    }
  }
};

export default resolvers;
