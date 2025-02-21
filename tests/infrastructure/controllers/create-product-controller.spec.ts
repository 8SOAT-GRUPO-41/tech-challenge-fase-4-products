import { CreateProductController } from "@/infrastructure/controllers/product-controller";
import { CreateProductSpy } from "@/tests/infrastructure/mocks/create-product-spy";
import type { HttpRequest } from "@/infrastructure/http/interfaces";
import { HttpStatusCode } from "@/infrastructure/http/helper";
import type { CreateProductInput } from "@/infrastructure/controllers/product-controller";
import { ProductCategory } from "@/domain/enums";

describe("CreateProductController", () => {
  // Cenário: Criação bem-sucedida de um produto
  describe("Given a valid product creation request", () => {
    let sut: CreateProductController;
    let createProductSpy: CreateProductSpy;
    let request: HttpRequest<CreateProductInput>;

    beforeEach(() => {
      // Given
      createProductSpy = new CreateProductSpy();
      sut = new CreateProductController(createProductSpy);
      request = {
        body: {
          name: "Hamburguer Artesanal",
          price: 29.9,
          description: "Delicioso hamburguer artesanal",
          category: ProductCategory.FOOD,
        },
        params: null,
        query: null,
      };
    });

    describe("When the request is handled", () => {
      it("Then it should call createProductUseCase with correct values", async () => {
        // When
        await sut.handle(request);

        // Then
        expect(createProductSpy.input?.name).toBe("Hamburguer Artesanal");
        expect(createProductSpy.input?.price).toBe(29.9);
        expect(createProductSpy.input?.description).toBe(
          "Delicioso hamburguer artesanal"
        );
        expect(createProductSpy.input?.category).toBe(ProductCategory.FOOD);
        expect(createProductSpy.callsCount).toBe(1);
      });

      it("Then it should return 201 status code", async () => {
        // When
        const response = await sut.handle(request);

        // Then
        expect(response.statusCode).toBe(HttpStatusCode.CREATED);
      });

      it("Then it should return the created product in the response body", async () => {
        // When
        const response = await sut.handle(request);

        // Then
        expect(response.body).toEqual({
          productId: expect.any(String),
          name: request.body.name,
          price: request.body.price,
          description: request.body.description,
          category: request.body.category,
        });
      });
    });
  });

  // Cenário: Tentativa de criar produto com dados inválidos
  describe("Given an invalid product creation request", () => {
    let sut: CreateProductController;
    let createProductSpy: CreateProductSpy;
    let request: HttpRequest<Partial<CreateProductInput>>;

    beforeEach(() => {
      // Given
      createProductSpy = new CreateProductSpy();
      sut = new CreateProductController(createProductSpy);
      request = {
        body: {
          name: "", // nome inválido
          price: -10, // preço inválido
          category: "INVALID_CATEGORY" as ProductCategory, // categoria inválida
        },
        params: null,
        query: null,
      };
    });

    describe("When the request is handled", () => {
      it("Then it should throw validation error", async () => {
        // When/Then
        await expect(sut.handle(request)).rejects.toThrow();
      });
    });
  });

  // Cenário: Erro interno durante a criação do produto
  describe("Given a system error during product creation", () => {
    let sut: CreateProductController;
    let createProductSpy: CreateProductSpy;
    let request: HttpRequest<CreateProductInput>;

    beforeEach(() => {
      // Given
      createProductSpy = new CreateProductSpy();
      jest
        .spyOn(createProductSpy, "execute")
        .mockRejectedValueOnce(new Error("Database error"));
      sut = new CreateProductController(createProductSpy);
      request = {
        body: {
          name: "Hamburguer Artesanal",
          price: 29.9,
          description: "Delicioso hamburguer artesanal",
          category: ProductCategory.FOOD,
        },
        params: null,
        query: null,
      };
    });

    describe("When the request is handled", () => {
      it("Then it should propagate the error", async () => {
        // When/Then
        await expect(sut.handle(request)).rejects.toThrow("Database error");
      });
    });
  });
});
