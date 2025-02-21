Feature: Product Creation
  As a system user
  I want to create new products
  So that I can manage the product catalog

  Scenario: Successfully creating a product
    Given I have valid product data
      | name                 | price | description                   | category |
      | Hamburguer Artesanal| 29.90 | Delicioso hamburguer artesanal| FOOD     |
    When I send a create product request
    Then the product should be created successfully
    And the response should have status code 201
    And the response body should contain the product details

  Scenario: Attempting to create a product with invalid data
    Given I have invalid product data
      | name | price | category        | description               |
      |      | -10   | INVALID_CATEGORY| Invalid product description|
    When I send a create product request
    Then I should receive a validation error

  Scenario: System error during product creation
    Given I have valid product data
      | name                 | price | description                   | category |
      | Hamburguer Artesanal| 29.90 | Delicioso hamburguer artesanal| FOOD     |
    And the system is experiencing a database error
    When I send a create product request
    Then I should receive a database error message 