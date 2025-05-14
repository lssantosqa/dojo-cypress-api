///<reference types="cypress" />

import 'cypress-plugin-api'
import * as endpoints from '../fixtures/endpoints.json'

describe('Testes de login do Vitrinne', () => {
 
  it('Deve efetuar login com sucesso', () => {
    cy.login(Cypress.env('admin'), Cypress.env('password')).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('refresh_token')
    })
  })

  it('Deve falhar ao efetuar login com credenciais inválidas', () => {
    cy.login('teste','123').then((response) => {
      expect(response.status).eq(403)
      expect(response.body.detail).eq('Não foi possível permitir acesso')
    })  
  })
    
})