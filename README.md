# 8SOAT FIAP Tech Challenge | Grupo 41 | Products API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=8SOAT-GRUPO-41_tech-challenge-fase-4-products&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=8SOAT-GRUPO-41_tech-challenge-fase-4-products)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=8SOAT-GRUPO-41_tech-challenge-fase-4-products&metric=coverage)](https://sonarcloud.io/summary/new_code?id=8SOAT-GRUPO-41_tech-challenge-fase-4-products)


## Descrição do Projeto

A Products API é um microserviço do sistema de gestão operacional para uma lanchonete, desenvolvido pelo Grupo 41 no 8SOAT FIAP Tech Challenge. Este microserviço é responsável pelo gerenciamento de produtos, incluindo criação, atualização, listagem e remoção de produtos do cardápio.

## Como Iniciar o Projeto Localmente

Para iniciar o projeto localmente, siga os passos abaixo:

1. Certifique-se de que o Docker está instalado e em execução.
2. No diretório raiz do projeto, execute o seguinte comando:

```bash
docker-compose up
```

3. Após a execução do comando, o Swagger com a documentação de todos os endpoints estará disponível na URL:
   [http://localhost:3000/docs](http://localhost:3000/docs)

## Como Iniciar o Projeto no Kubernetes

[Guia de deploy helm + k8s](k8s/README.md)

## Arquitetura

Abaixo, está o diagrama da arquitetura do sistema, com destaque para o microserviço de produtos.

![Arquitetura](diagrams/architecture-fase-4-products.png)
