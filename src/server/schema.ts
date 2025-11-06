import { gql } from 'apollo-server';

const typeDefs = gql`
  type Conta {
    conta: Int!
    saldo: Float!
  }

  type Query {
    saldo(conta: Int!): Float!
  }

  type Mutation {
    sacar(conta: Int!, valor: Float!): Conta!
    depositar(conta: Int!, valor: Float!): Conta!
  }
`;

export default typeDefs;
