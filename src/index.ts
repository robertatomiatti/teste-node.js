import 'dotenv/config';
import { createServer } from './server/server';

const server = createServer();
const port = process.env.PORT || 4000;

server.listen({ port: Number(port) }).then(({ url }) => {
  console.log(`Servidor rodando em ${url}`);
});
