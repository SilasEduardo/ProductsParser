// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import express from 'express';
import { MongoClient } from 'mongodb';
import { productsRoutes } from '../../../../shared/http/routes/product.routes';

// Importe a função do manipulador de rota

// Simule os métodos da coleção MongoDB
const mockCollection = {
  deleteOne: jest.fn(),
};

// Simule o cliente MongoDB
const mockClient = {
  db: () => ({
    collection: () => mockCollection,
  }),
};

jest.mock('mongodb', () => ({
  MongoClient: {
    connect: jest.fn(() => mockClient),
  },
  ObjectId: { isValid: jest.fn(() => true) }, // Simule a validação do ObjectId
}));

const app = express();
app.use(express.json());

app.delete('/products/:productId', productsRoutes);

describe('DELETE /products/:productId', () => {
  it('deve retornar o código de status 204 para exclusão bem-sucedida', async () => {
    const mockDeleteResult = {
      deletedCount: 1,
    };
    mockCollection.deleteOne.mockResolvedValue(mockDeleteResult);

    const response = await request(app).delete(
      '/products/id-do-produto-valido'
    );

    expect(response.status).toBe(204);
    expect(mockCollection.deleteOne).toHaveBeenCalledWith({
      _id: 'id-do-produto-valido',
    });
  });

  it('deve retornar o código de status 404 para a exclusão de um produto inexistente', async () => {
    const mockDeleteResult = {
      deletedCount: 0,
    };
    mockCollection.deleteOne.mockResolvedValue(mockDeleteResult);

    const response = await request(app).delete(
      '/products/id-de-produto-inexistente'
    );

    expect(response.status).toBe(404);
    expect(mockCollection.deleteOne).toHaveBeenCalledWith({
      _id: 'id-de-produto-inexistente',
    });
  });
});
