///<reference types="cypress" />

import 'cypress-plugin-api'

describe('Testes de login do Vitrinne', () => {
  it('Deve efetuar login com sucesso', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        _username: 'api-fran',
        _password: 'Dot123456@'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('refresh_token')
    })
  })

  it('Deve falhar ao efetuar login com credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: '/auth',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: {
        _username: 'usuario',
        _password: 'senha'
      }
    }).then((response) => {
      // cy.log(response.body) 
    })  
  })
    
})