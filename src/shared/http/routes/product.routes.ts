import { Router } from 'express';

const productsRoutes = Router();

productsRoutes.get('/', (req, res) => {
  res.send('firt rout');
});

export { productsRoutes };