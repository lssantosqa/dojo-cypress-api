/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import { getSessionSchema } from '../fixtures/schemas/sessionSchema.js'
import * as Endpoints from '../fixtures/endpoints.json'

describe('CRUD de turmas', () => {
    const initDate = faker.date.past()
    const finishDate = faker.date.future() 
    beforeEach(() => {
        cy.login('api-fran', 'Dot123456@').then((response) => {
            Cypress.env('token', response.body.token)
        })
        cy.criarSolucao().then((response) => {
            Cypress.env('solutionId', response.body.id)
        })
    })
    
    it('Deve listar as turmas cadastradas', () => {
        cy.getRequest(Endpoints.sessions).then((response) => {
            expect(response.status).to.eq(200)    
            cy.checaSchema(response.body.items[0], getSessionSchema)
        })
    })

    it('Deve criar uma turma com sucesso', () => {     
        const requestBody = {
            name: `Turma ${faker.lorem.slug()}`,
            init_date: initDate.toISOString().slice(0, 16).replace('T', ' '),
            finish_date: finishDate.toISOString().slice(0, 16).replace('T', ' '), 
            vacancies: faker.number.int({min:1, max:1000}),
            show_on_portal: "true",
            allow_enroll_init_date: "2025-07-07 00:00",
            allow_enroll_finish_date: "2025-08-01 00:00",
            id_solution: Cypress.env('solutionId')
        }            
        
        cy.postRequest(Endpoints.sessions, requestBody).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Deve criar e editar uma turma com sucesso', () => {
        cy.criarTurma(Cypress.env('solutionId')).then((sessionResponse) => {
            const sessionId = sessionResponse.body.id
            const requestBody = {
                name: `Turma ${faker.lorem.slug()} editada`,
                init_date: initDate.toISOString().slice(0, 16).replace('T', ' '),
                finish_date: finishDate.toISOString().slice(0, 16).replace('T', ' '), 
                vacancies: faker.number.int({min:1, max:1000}),
                show_on_portal: "true",
                allow_enroll_init_date: "2025-07-07 00:00",
                allow_enroll_finish_date: "2025-08-01 00:00",
                id_solution: Cypress.env('solutionId')
            }
            cy.putRequest(`${Endpoints.sessions}/${sessionId}`, requestBody).then((response) => {
                expect(response.status).eq(200)
            })
        })
    }) 
    

    it('Deve criar e deletar uma turma com sucesso', () => {
        cy.criarTurma(Cypress.env('solutionId')).then((sessionResponse) => {
            const sessionId = sessionResponse.body.id
            cy.deleteRequest(`${Endpoints.sessions}/${sessionId}`).then((response) => {
                expect(response.status).eq(204)
            })
        })
    }) 
})
