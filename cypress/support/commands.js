const Joi = require('joi')
import { faker } from '@faker-js/faker'

Cypress.Commands.add('postRequest', (url, data) => {
    cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,
        form: true,
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
        headers: {
            Authorization: `Bearer ${Cypress.env('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        return response
    })
})

Cypress.Commands.add('login', (email, senha) => {
    const requestBody = {
        _username: email,
        _password: senha
    }
    cy.postRequest('/auth', requestBody).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token')
        expect(response.body).to.have.property('refresh_token')
        Cypress.env('token', response.body.token)
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
        cy.postRequest('/solutions', requestBody).then((response) => {
            return response
        }) 
    })
})
