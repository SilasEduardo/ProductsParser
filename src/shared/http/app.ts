import { app } from '../../server';

app.listen(3333, async () => {
  console.log(`Servidor rodando na porta ${process.env.PORT} `);
});
