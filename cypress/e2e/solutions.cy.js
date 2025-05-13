/// <reference types='cypress' />

import 'cypress-plugin-api'
import '@faker-js/faker'

describe('CRUD de soluções', () => {
    beforeEach(() => {
        cy.login('api-fran', 'Dot123456@')
    })

    it('Deve listar as soluções cadastradas', () => {
        cy.api({
            method: 'GET',
            url: '/solutions',
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('items')
            expect(response.body.items).to.be.an('array')
            expect(response.body.items.length).to.be.greaterThan(0)
            cy.log(response.body.items[0])
            //validação de schema
        })
    })

    it('Deve criar uma solução com sucesso', () => {
        cy.criarSolucao().then((response) => {
            expect(response.status).eq(200)
            //validar schema
        })
    })     

    it('Deve criar e editar uma solução com sucesso', () => {
        //criar solução e editar, validando edição
    })

    it('Deve criar e deletar uma solução com sucesso', () => {
        //criar solução e deletar 
    })
}) 