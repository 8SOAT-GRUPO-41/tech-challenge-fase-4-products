import type { OpenAPIV3 } from 'openapi-types'

const swaggerConfig: Omit<OpenAPIV3.Document, 'paths'> = {
  openapi: '3.0.0',
  info: {
    title: 'Lanchonete G41 - Products Service',
    description: 'Lanchonete G41 API to manage products',
    version: '0.1.0',
    contact: {
      name: 'Lanchonete G41',
      email: 'lanchoneteg41@gmail.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    { name: 'Products', description: 'Products related end-points' },
  ]
}

export default swaggerConfig
