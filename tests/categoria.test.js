const request = require("supertest");
const app = require("../src/app");
const CategoriaModel = require("../src/models/categoriaModel");

const mockCategoriaData = {
  id: 1,
  codigo: "123",
  titulo: "titulo",
  status: 1,
  createdAt: "2023-08-24T01:05:41.000Z",
  updatedAt: "2023-08-24T01:05:41.000Z",
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe("categoria", () => {
  describe("GET /api/categorias, getCategorias", () => {
    it("should get all categorias and return 200 status", async () => {
      const mockCategorias = [
        {
          id: 1,
          codigo: "123",
          titulo: "titulo",
          status: 1,
          createdAt: "2023-08-24T01:05:41.000Z",
          updatedAt: "2023-08-24T01:05:41.000Z",
        },
        {
          id: 2,
          codigo: "124",
          titulo: "title test",
          status: 1,
          createdAt: "2023-08-26T00:14:21.000Z",
          updatedAt: "2023-08-26T00:14:21.000Z",
        },
      ];

      CategoriaModel.findAll = jest.fn(() => mockCategorias);

      const response = await request(app).get("/api/categorias");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual(expect.arrayContaining(mockCategorias));
    });

    it("should handle errors and return 400 status", async () => {
      const errorMock = new Error("Sequelize Database error");
      CategoriaModel.findAll.mockImplementation(() => {
        throw errorMock;
      });

      const response = await request(app).get("/api/categorias");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Sequelize Database error");
    });
  });

  describe("GET /api/categorias/:id, getCategoriaById", () => {
    it("should return the categoria found by id and 200 status", async () => {
      CategoriaModel.findByPk = jest.fn().mockResolvedValue(mockCategoriaData);

      const response = await request(app).get("/api/categorias/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategoriaData);
    });

    it("should return an error message if categoria is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Categoria não encontrada!";

      CategoriaModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/api/categorias/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("POST /api/categorias, createCategoria", () => {
    it("should create a new categoria and return 200 status", async () => {
      CategoriaModel.create = jest.fn().mockResolvedValue(mockCategoriaData);

      const response = await request(app).post("/api/categorias").send(mockCategoriaData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategoriaData);
    });

    it("should handle errors and return 400 status", async () => {
      const mockError = new Error("Sequelize Database error");

      CategoriaModel.create = jest.fn().mockRejectedValue(mockError);

      const response = await request(app).post("/api/categorias").send({
        codigo: "",
        titulo: "",
        status: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: mockError.message });
    });
  });

  describe("PATCH /api/categorias/:id, patchCategoria", () => {
    it("should update a categoria and return 200 status", async () => {
      const mockId = 1;

      const mockUpdatedData = {
        id: 1,
        codigo: "321",
        titulo: "Update Categoria",
        status: 1,
        createdAt: "2023-08-24T01:05:41.000Z",
        updatedAt: "2023-08-24T01:05:41.000Z",
      };

      const mockFoundCategoria = {
        id: 1,
        codigo: "123",
        titulo: "Original Categoria",
        status: 1,
        createdAt: "2023-08-24T01:05:41.000Z",
        updatedAt: "2023-08-24T01:05:41.000Z",
        update: jest.fn().mockResolvedValue(mockUpdatedData),
      };

      CategoriaModel.findByPk = jest.fn().mockResolvedValue(mockFoundCategoria);

      const response = await request(app).patch(`/api/categorias/${mockId}`).send(mockUpdatedData);

      const { update, ...expectedCategoria } = mockFoundCategoria;

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedCategoria);
      expect(mockFoundCategoria.update).toHaveBeenCalledWith(mockUpdatedData);
    });

    it("should return an error if the body is a empty object and return 400 status", async () => {
      const mockId = 1;
      const errorMessage = "Sem dados para atualizar a categoria!";

      const response = await request(app).patch(`/api/categorias/${mockId}`).send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });

    it("should return an error message if categoria is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Categoria não encontrada!";

      CategoriaModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).get(`/api/categorias/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  describe("DELETE /api/categorias/:id, deleteCategoria", () => {
    it("should return an message if categoria is successfully deleted and 200 status", async () => {
      const mockId = 1;

      CategoriaModel.findByPk = jest.fn().mockResolvedValue({
        destroy: jest.fn().mockResolvedValue(true),
      });

      const response = await request(app).delete(`/api/categorias/${mockId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Categoria deletada com sucesso!" });
    });

    it("should return an error message if categoria is not found and 400 status", async () => {
      const mockId = 999;
      const errorMessage = "Categoria não encontrada!"

      CategoriaModel.findByPk = jest.fn().mockResolvedValue(null);

      const response = await request(app).delete(`/api/categorias/${mockId}`);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: errorMessage });
    });
  });
});
