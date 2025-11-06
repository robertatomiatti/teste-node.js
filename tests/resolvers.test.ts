import resolvers from '../src/client/resolvers';
import prisma from '../src/client/prismaClient';
import { ApolloError } from 'apollo-server';

// Nota: esses testes utilizam o prisma apontando para o DB configurado em DATABASE_URL.
// Em CI você pode apontar para um banco de testes. Aqui fazemos operações simples.

describe('Resolvers - operações bancárias', () => {
  const conta = 99999;

  beforeAll(async () => {
    // garante que exista a conta
    await prisma.account.upsert({ where: { conta }, update: { saldo: 100 }, create: { conta, saldo: 100 } });
  });

  afterAll(async () => {
    await prisma.account.deleteMany({ where: { conta } });
    await prisma.$disconnect();
  });

  test('saldo retorna saldo atual', async () => {
    const result = await resolvers.Query.saldo(null, { conta });
    expect(result).toBe(100);
  });

  test('depositar aumenta saldo', async () => {
    const res = await resolvers.Mutation.depositar(null, { conta, valor: 50 });
    expect(res.conta).toBe(conta);
    expect(res.saldo).toBe(150);
  });

  test('sacar reduz saldo quando há fundos', async () => {
    const res = await resolvers.Mutation.sacar(null, { conta, valor: 40 });
    expect(res.conta).toBe(conta);
    expect(res.saldo).toBe(110);
  });

  test('sacar com saldo insuficiente lança erro', async () => {
    await expect(resolvers.Mutation.sacar(null, { conta, valor: 1000 })).rejects.toThrow(ApolloError);
  });

  test('depositar valor inválido lança erro', async () => {
    await expect(resolvers.Mutation.depositar(null, { conta, valor: -10 })).rejects.toThrow(ApolloError);
  });
});
