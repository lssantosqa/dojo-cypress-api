const Joi = require('joi')
import { faker } from '@faker-js/faker'
import 'cypress-plugin-api'
import  * as endpoints from '../fixtures/endpoints.json'

Cypress.Commands.add('postRequest', (url, data) => {
    cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cypress.env('token')}`
        },
        body: data
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('getRequest', (endpoint) => {
    cy.request({
        method: 'GET',
        url: endpoint,
        failOnStatusCode:false,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response
    })
})
Cypress.Commands.add('deleteRequest', (endpoint) => {
    cy.request({
        method: 'DELETE',
        url: endpoint,
        failOnStatusCode:false,
        headers: {
            'Authorization': `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('putRequest', (endpoint, requestBody) => {
    cy.request({
        method: 'PUT',
        url: endpoint,
        failOnStatusCode: false,
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cypress.env('token')}`
        },
        body: requestBody    
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('login', (email, senha) => {
    const requestBody = {
        _username: email,
        _password: senha
    }
    cy.postRequest(endpoints.auth, requestBody).then((response) => {
        return response
    })
})

Cypress.Commands.add('checaSchema', (resposta, schema) => {
    const { error } = schema.validate(resposta)
    if(error){
        console.error('Falha na validação da resposta:', error.details[0].message)
        throw new Error(error.details[0].message)
    }else{
        cy.log('Resposta validada com sucesso.')
    }
})

Cypress.Commands.add('criarSolucao', () => {
    const solutionSlug = faker.lorem.slug()
    cy.fixture('image.png', 'base64').then((imageBase64) => {
        const base64ComPrefixo = `data:image/jpeg;base64,${imageBase64}`
        const requestBody = {               
            "solution_type": "curso_ead",
            "integration": "webaula",
            "name": faker.lorem.words(3),
            "slug": solutionSlug,
            "call_text": faker.lorem.sentence(),
            "description": faker.lorem.sentence(),
            "audience": faker.lorem.words(3),
            "differentials": faker.lorem.sentence(),
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
        cy.postRequest(endpoints.solutions, requestBody).then((response) => {
            return response
        }) 
    })
})

Cypress.Commands.add('criarTurma', (solutionId) => {              
    const initDate = faker.date.past()
    const finishDate = faker.date.future()
    const requestBody = {
        name: `Turma ${faker.lorem.slug()}`,
        init_date: initDate.toISOString().slice(0, 16).replace('T', ' '),
        finish_date: finishDate.toISOString().slice(0, 16).replace('T', ' '), 
        vacancies: faker.number.int({min:1, max:1000}),
        show_on_portal: "true",
        allow_enroll_init_date: "2025-07-07 00:00",
        allow_enroll_finish_date: "2025-08-01 00:00",
        id_solution: solutionId
    }            
    
    cy.postRequest('/sessions', requestBody).then((response) => {
        expect(response.status).to.eq(200)
    })
})
