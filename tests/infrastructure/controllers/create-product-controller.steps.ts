import { loadFeature, defineFeature } from "jest-cucumber";
import { CreateProductController } from "@/infrastructure/controllers/product-controller";
import { CreateProductSpy } from "@/tests/infrastructure/mocks/create-product-spy";
import type { HttpRequest } from "@/infrastructure/http/interfaces";
import { HttpStatusCode } from "@/infrastructure/http/helper";
import type { CreateProductInput } from "@/infrastructure/controllers/product-controller";
import { ProductCategory } from "@/domain/enums";

const feature = loadFeature(
  "tests/infrastructure/controllers/features/create-product.feature"
);

defineFeature(feature, (test) => {
  let sut: CreateProductController;
  let createProductSpy: CreateProductSpy;
  let request: HttpRequest<CreateProductInput>;
  let response: any;
  let error: any;

  beforeEach(() => {
    createProductSpy = new CreateProductSpy();
    sut = new CreateProductController(createProductSpy);
  });

  test("Successfully creating a product", ({ given, when, then, and }) => {
    given("I have valid product data", (table) => {
      const [productData] = table;
      request = {
        body: {
          name: productData.name,
          price: Number(productData.price),
          description: productData.description,
          category: productData.category as ProductCategory,
        },
        params: null,
        query: null,
      };
    });

    when("I send a create product request", async () => {
      response = await sut.handle(request);
    });

    then("the product should be created successfully", () => {
      expect(createProductSpy.input?.name).toBe(request.body.name);
      expect(createProductSpy.input?.price).toBe(request.body.price);
      expect(createProductSpy.input?.description).toBe(
        request.body.description
      );
      expect(createProductSpy.input?.category).toBe(request.body.category);
      expect(createProductSpy.callsCount).toBe(1);
    });

    and("the response should have status code 201", () => {
      expect(response.statusCode).toBe(HttpStatusCode.CREATED);
    });

    and("the response body should contain the product details", () => {
      expect(response.body).toEqual({
        productId: expect.any(String),
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        category: request.body.category,
      });
    });
  });

  test("Attempting to create a product with invalid data", ({
    given,
    when,
    then,
  }) => {
    given("I have invalid product data", (table) => {
      const [productData] = table;
      request = {
        body: {
          name: productData.name,
          price: Number(productData.price),
          category: productData.category as ProductCategory,
          description: "Invalid product description",
        },
        params: null,
        query: null,
      };
    });

    when("I send a create product request", async () => {
      error = sut.handle(request);
    });

    then("I should receive a validation error", async () => {
      await expect(error).rejects.toThrow();
    });
  });

  test("System error during product creation", ({ given, and, when, then }) => {
    given("I have valid product data", (table) => {
      const [productData] = table;
      request = {
        body: {
          name: productData.name,
          price: Number(productData.price),
          description: productData.description,
          category: productData.category as ProductCategory,
        },
        params: null,
        query: null,
      };
    });

    and("the system is experiencing a database error", () => {
      jest
        .spyOn(createProductSpy, "execute")
        .mockRejectedValueOnce(new Error("Database error"));
    });

    when("I send a create product request", async () => {
      error = sut.handle(request);
    });

    then("I should receive a database error message", async () => {
      await expect(error).rejects.toThrow("Database error");
    });
  });
});
