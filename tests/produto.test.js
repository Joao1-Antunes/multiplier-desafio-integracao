const request = require("supertest");
const app = require("../src/app");
const ProdutoModel = require("../src/models/produtoModel");
const EstoqueModel = require("../src/models/estoqueModel");

const mockProdutoData = {
  id: 1,
  codigo: "0001",
  nome: "caixa",
  descricao: "caixa misteriosa",
  valor: 2,
  status: 1,
  createdAt: "2023-08-28T01:07:55.000Z",
  updatedAt: "2023-08-28T01:07:55.000Z",
  idCategoria: null
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("produto", () => {
  describe("GET /api/produtos, getProduto", () => {
    it("should get all produtos and return 200 status", async () => {
      const mockProdutos = [
        {
          id: 1,
          codigo: "0001",
          nome: "caixa",
          descricao: "caixa misteriosa",
          valor: 1.4,
          status: 1,
          createdAt: "2023-08-28T01:07:55.000Z",
          updatedAt: "2023-08-28T01:07:55.000Z",
          idCategoria: null
        },
        {
          id: 2,
          codigo: "0002",
          nome: "box",
          descricao: "misterious box",
          valor: 3.5,
          status: 1,
          createdAt: "2023-08-28T01:07:55.000Z",
          updatedAt: "2023-08-28T01:07:55.000Z",
          idCategoria: null
        },
      ];

      ProdutoModel.findAll = jest.fn(() => mockProdutos);

      const response = await request(app).get("/api/produtos");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual(expect.arrayContaining(mockProdutos));
    });

    it("should handle errors and return 400 status", async () => {
      const errorMock = new Error("Sequelize Database error");
      ProdutoModel.findAll.mockImplementation(() => {
        throw errorMock;
      });

      const response = await request(app).get("/api/produtos");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Sequelize Database error");
    });
  });

  describe("GET /api/produtos/:id, getProdutoById", () => {
    it("should return the produto found by id and 200 status", async () => {
      ProdutoModel.findByPk = jest.fn().mockResolvedValue(mockProdutoData);

      const response = await request(app).get("/api/produtos/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProdutoData);
    });

    it("should return an error message if the produto is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Produto não encontrado!";

      ProdutoModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/api/produtos/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("POST /api/produtos, createProduto", () => {
    it("should create a new produto, after this create a new estoque for the produto and return 200 status", async () => {      
      const mockCreateEstoque = jest.fn().mockResolvedValue({
        idProduto: mockProdutoData.id,
        quantidade: 0,
        reserva: 0,
        status: 1,
      });
    
      ProdutoModel.create = jest.fn().mockResolvedValue(mockProdutoData);
      EstoqueModel.create = mockCreateEstoque; 
      
      const response = await request(app).post("/api/produtos").send(mockProdutoData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProdutoData);
      expect(mockCreateEstoque).toHaveBeenCalledWith({
        idProduto: mockProdutoData.id,
        quantidade: 0,
        reserva: 0,
        status: 1,
      });
    });

    it("should handle errors and return 400 status", async () => {
      const mockError = new Error("Sequelize Database error");

      ProdutoModel.create = jest.fn().mockRejectedValue(mockError);

      const response = await request(app).post("/api/produtos").send({
        codigo: "",
        nome: "",
        descricao: "",
        valor: "",
        status: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: mockError.message });
    });
  });

  describe("PATCH /api/produtos/:id, patchProduto", () => {
    it("should update a produto and return 200 status", async () => {
      const mockId = 1;

      const mockUpdatedData = {
        id: 1,
        codigo: "0001",
        nome: "caixa",
        descricao: "caixa misteriosa",
        valor: 2,
        status: 1,
        createdAt: "2023-08-28T01:07:55.000Z",
        updatedAt: "2023-08-28T01:07:55.000Z",
        idCategoria: null
      };

      const mockProdutoFound = {
        id: 1,
        codigo: "0001",
        nome: "caixa 2",
        descricao: "caixa não misteriosa",
        valor: 2,
        status: 1,
        createdAt: "2023-08-28T01:07:55.000Z",
        updatedAt: "2023-08-28T01:07:55.000Z",
        idCategoria: null,
        update: jest.fn().mockResolvedValue(mockUpdatedData),
      };

      ProdutoModel.findByPk = jest.fn().mockResolvedValue(mockProdutoFound);

      const response = await request(app).patch(`/api/produtos/${mockId}`).send(mockUpdatedData);

      const { update, ...expectedProduto } = mockProdutoFound;

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedProduto);
      expect(mockProdutoFound.update).toHaveBeenCalledWith(mockUpdatedData);
    });

    it("should return an error if the body is a empty object and return 400 status", async () => {
      const mockId = 1;
      const errorMessage = "Sem dados para atualizar o produto!";

      const response = await request(app).patch(`/api/produtos/${mockId}`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });

    it("should return an error message if produto is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Produto não encontrado!";

      ProdutoModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/api/produtos/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("DELETE /api/produtos/:id, deleteProduto", () => {
    it("should return an message if the produto is successfully deleted and 200 status", async () => {
      const mockId = 1;

      ProdutoModel.findByPk = jest.fn().mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true),
      });

      const response = await request(app).delete(`/api/produtos/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Produto deletado com sucesso!" });
    });

    it("should return an error message if the produto is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Produto não encontrado!";

      ProdutoModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).delete(`/api/produtos/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });
})