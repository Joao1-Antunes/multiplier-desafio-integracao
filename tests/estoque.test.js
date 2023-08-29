const request = require("supertest");
const app = require("../src/app");
const EstoqueModel = require("../src/models/estoqueModel");

const mockEstoqueData = {
  id: 1,
  quantidade: 10,
  reserva: 200,
  status: 1,
  createdAt: "2023-08-28T01:07:55.000Z",
  updatedAt: "2023-08-29T00:13:40.000Z",
  idProduto: 1
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe("estoque", () => {
  describe("GET /api/produtos/:id/estoque, getEstoque", () => {
    it("should return the estoque found and 200 status", async () => {
      const mockId = 1;

      EstoqueModel.findOne = jest.fn().mockResolvedValue(mockEstoqueData);

      const response = await request(app).get(`/api/produtos/${mockId}/estoque`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEstoqueData);
    });

    it("should return an error message if the estoque is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Estoque não encontrado!";

      EstoqueModel.findOne = jest.fn().mockResolvedValue(null);
    
      const response = await request(app).get(`/api/produtos/${mockId}/estoque`);
    
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("PATCH /api/produtos/:id/estoque, patchEstoque", () => {
    it("should update a estoque and return 200 status", async () => {
      const mockId = 1;

      const mockUpdatedData = {
        id: 1,
        quantidade: 8,
        reserva: 220,
        status: 1,
        createdAt: "2023-08-28T01:07:55.000Z",
        updatedAt: "2023-08-29T00:13:40.000Z",
        idProduto: 1
      };

      const mockEstoqueFound = {
        id: 1,
        quantidade: 10,
        reserva: 200,
        status: 1,
        createdAt: "2023-08-28T01:07:55.000Z",
        updatedAt: "2023-08-29T00:13:40.000Z",
        idProduto: 1,
        update: jest.fn().mockResolvedValue(mockUpdatedData),
      };

      EstoqueModel.findOne = jest.fn().mockResolvedValue(mockEstoqueFound);

      const response = await request(app).patch(`/api/produtos/${mockId}/estoque`).send(mockUpdatedData);

      const { update, ...expectedEstoque } = mockEstoqueFound;

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedEstoque);
      expect(mockEstoqueFound.update).toHaveBeenCalledWith(mockUpdatedData);
    });

    it("should return an error if the body is a empty object and return 400 status", async () => {
      const mockId = 1;
      const errorMessage = "Sem dados para atualizar o estoque!";

      const response = await request(app).patch(`/api/produtos/${mockId}/estoque`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });

    it("should return an error message if estoque is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Estoque não encontrado!";

      EstoqueModel.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app).patch(`/api/produtos/${mockId}/estoque`).send({ quantidade: 30 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("DELETE /api/produtos/:id/estoque, deleteEstoque", () => {
    it("should return an message warning that estoque can't be deleted and status 501", async () => {
      const mockId = 1;

      EstoqueModel.findOne = jest.fn().mockResolvedValue(mockEstoqueData);

      const response = await request(app).delete(`/api/produtos/${mockId}/estoque`);

      expect(response.status).toBe(501);
      expect(response.body).toEqual({ message: "Não é possível deletar um estoque!" });
    });

    it("should return an error message if the estoque is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Estoque não encontrado!";

      EstoqueModel.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app).patch(`/api/produtos/${mockId}/estoque`).send({ quantidade: 30 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });
});