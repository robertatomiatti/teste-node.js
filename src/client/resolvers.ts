import { ApolloError } from 'apollo-server';
import prisma from './prismaClient';

const resolvers = {
  Query: {
    saldo: async (_: unknown, { conta }: { conta: number }) => {
      const acc = await prisma.account.findUnique({ where: { conta } });
      if (!acc) throw new ApolloError('Conta não encontrada.', 'NOT_FOUND');
      return acc.saldo;
    }
  },
  Mutation: {
    sacar: async (_: unknown, { conta, valor }: { conta: number; valor: number }) => {
      if (valor <= 0) throw new ApolloError('Valor inválido.', 'INVALID_VALUE');

      const acc = await prisma.account.findUnique({ where: { conta } });
      if (!acc) throw new ApolloError('Conta não encontrada.', 'NOT_FOUND');

      if (valor > acc.saldo) throw new ApolloError('Saldo insuficiente.', 'INSUFFICIENT_FUNDS');

      const novoSaldo = parseFloat((acc.saldo - valor).toFixed(2));
      const updated = await prisma.account.update({ where: { conta }, data: { saldo: novoSaldo } });
      return { conta: updated.conta, saldo: updated.saldo };
    },
    depositar: async (_: unknown, { conta, valor }: { conta: number; valor: number }) => {
      if (valor <= 0) throw new ApolloError('Valor inválido.', 'INVALID_VALUE');

      const acc = await prisma.account.findUnique({ where: { conta } });
      if (!acc) {
        const created = await prisma.account.create({ data: { conta, saldo: parseFloat(valor.toFixed(2)) } });
        return { conta: created.conta, saldo: created.saldo };
      }

      const novoSaldo = parseFloat((acc.saldo + valor).toFixed(2));
      const updated = await prisma.account.update({ where: { conta }, data: { saldo: novoSaldo } });
      return { conta: updated.conta, saldo: updated.saldo };
    }
  }
};

export default resolvers;
