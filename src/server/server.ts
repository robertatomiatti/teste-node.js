import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from '../client/resolvers';

export function createServer() {
  return new ApolloServer({ typeDefs, resolvers });
}
