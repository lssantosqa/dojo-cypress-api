/// <reference types='cypress' />

import { getSolutionSchema } from '../fixtures/schemas/solutionSchema'

import 'cypress-plugin-api'
import { faker } from '@faker-js/faker'
import * as endpoints from '../fixtures/endpoints.json'

describe('CRUD de soluções', () => {
    beforeEach(() => {
        cy.login('api-fran', 'Dot123456@').then((response) => {
            Cypress.env('token', response.body.token)
        })
    })
    
    it('Deve listar as soluções cadastradas', () => {
        cy.getRequest(endpoints.solutions).then((response) => {
            expect(response.status).to.eq(200)
            cy.checaSchema(response.body.items[0], getSolutionSchema)
        })
    })

    it('Deve criar uma solução com sucesso', () => {
        cy.criarSolucao().then((response) => {
            expect(response.status).eq(200)
            cy.checaSchema(response.body, getSolutionSchema)
        })
    })     

    it('Deve criar e editar uma solução com sucesso', () => {
        cy.criarSolucao().then((response) => {
            const solutionId = response.body.id
            const solutionSlug = faker.lorem.slug()
            cy.fixture('image.png', 'base64').then((imageBase64) => {
                const base64ComPrefixo = `data:image/jpeg;base64,${imageBase64}`
                const requestBody = {               
                    "solution_type": "curso_ead",
                    "integration": "webaula",
                    "name": `${faker.lorem.words(3)} editado`,
                    "slug": solutionSlug,
                    "call_text": faker.lorem.words(5),
                    "description": faker.lorem.words(5),
                    "audience": faker.lorem.words(5),
                    "differentials": faker.lorem.words(5),
                    "image": base64ComPrefixo,
                    "card_image": base64ComPrefixo,
                    "workload": "12h",
                    "show_on_portal": true,
                    "exclusive_to_company": true,
                    "certificate_id": 1,
                    "duration": "3d",
                    "payment_type": "free",
                    "survey_required": false,
                    "survey_required_for_certificate": false,
                    "survey_ids": [1, 2, 3],
                    "session_type": "open",
                    "session_due_time": 20,
                    "session_reenrollment_await_time": 5,
                    "enrollment_type": "open",
                    "video": "https://www.youtube.com/watch?v=_alNJ98MB_w",
                    "podcast": "https://vimeo.com/502770136",
                    "active": true,
                    "themes": [
                        "Empreendedorismo"
                    ],
                    "target_audience": [
                        1,
                        2
                    ],
                    "tags": "Curso Empreendedorismo",
                    "content": [
                        "- Conceitos Básicos",
                        "- Como fazer negócios"
                    ],
                    "recommendation_type": "solutions",
                    "solutions_recommendations": [
                        10,
                        11
                    ],
                    "seo_title": "Curso de Empreendedorismo Gratuito",
                    "seo_description": "Conheça os conceitos básicos de empreendedorismo de forma gratuita.",
                    "seo_keywords": "curso empreendedorismo gratuito",
                    "learning_paths": [
                        1,
                        2
                    ],
                    "thematic_pages": [
                        1                    
                    ],
                    "exclusive_to_thematic_pages": false,
                    "solution_integration_data": "{\"vendorId\":\"1\"}"
                }

                cy.putRequest(`${endpoints.solutions}/${solutionId}`, requestBody).then((response) => {
                    expect(response.status).eq(200)
                    expect(response.body.name).eq(requestBody.name)
                })   
            })
        })
    })

    it('Deve criar e deletar uma solução com sucesso', () => {
        cy.criarSolucao().then((response) => {
            const solutionId = response.body.id
            cy.deleteRequest(`/solutions/${solutionId}`).then((response) => {
                expect(response.status).eq(204)
            })
        })
    })
}) 