/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
import { getSessionSchema } from '../fixtures/schemas/sessionSchema.js'
describe('CRUD de turmas', () => {
    beforeEach(() => {
        cy.login('api-fran', 'Dot123456@')
    })
    
    it('Deve listar as turmas cadastradas', () => {
        cy.request({
            method: 'GET',
            url: '/sessions',
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)    
            const body = response.body.items[0];
            expect(body).to.have.property('id').that.is.a('number')
            expect(body).to.have.property('name').that.is.a('string')
            expect(body).to.have.property('initDate')
            if (body.initDate !== null) expect(new Date(body.initDate).toString()).to.not.eq('Invalid Date')
            expect(body).to.have.property('finishDate')
            if (body.finishDate !== null) expect(new Date(body.finishDate).toString()).to.not.eq('Invalid Date')
            expect(body).to.have.property('vacancies').that.is.a('number')
            expect(body).to.have.property('showOnPortal').that.is.a('boolean')
            expect(body).to.have.property('allowEnrollInitDate')
            if (body.allowEnrollInitDate !== null) expect(new Date(body.allowEnrollInitDate).toString()).to.not.eq('Invalid Date')
            expect(body).to.have.property('allowEnrollFinishDate')
            if (body.allowEnrollFinishDate !== null) expect(new Date(body.allowEnrollFinishDate).toString()).to.not.eq('Invalid Date')
            expect(body).to.have.property('solutionType').that.is.a('string')
            // cy.checaSchema(response.body.items[0], getSessionSchema)
            })
        })

    it('Deve criar uma turma com sucesso', () => {
        const initDate = faker.date.past()
        const finishDate = faker.date.future()
        cy.criarSolucao().then((response) => {           
            const requestBody = {
                name: `Turma ${faker.lorem.slug()}`,
                init_date: initDate.toISOString().slice(0, 16).replace('T', ' '),
                finish_date: finishDate.toISOString().slice(0, 16).replace('T', ' '), 
                vacancies: faker.number.int({min:1, max:1000}),
                show_on_portal: "true",
                allow_enroll_init_date: "2025-07-07 00:00",
                allow_enroll_finish_date: "2025-08-01 00:00",
                id_solution: response.body.id
            }            
            
            cy.postRequest('/sessions', requestBody).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(response.body)
                // expect(response.status).to.eq(200)
                // expect(response.body).to.have.property('id').that.is.a('number')
                // expect(response.body).to.have.property('name').that.is.a('string')
                // expect(response.body).to.have.property('initDate')
                // if (response.body.initDate !== null) expect(new Date(response.body.initDate).toString()).to.not.eq('Invalid Date')
                // expect(response.body).to.have.property('finishDate')
                // if (response.body.finishDate !== null) expect(new Date(response.body.finishDate).toString()).to.not.eq('Invalid Date')
                // expect(response.body).to.have.property('vacancies').that.is.a('number')
                // expect(response.body).to.have.property('showOnPortal').that.is.a('boolean')
            })
        })

    })

    it('Deve criar e editar uma turma com sucesso', () => {
        //criar curso e turma
    })

    it('Deve criar e deletar uma turma com sucesso', () => {
        //criar curso e turma
        //deletar turma
    })
})