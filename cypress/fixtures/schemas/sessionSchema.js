const Joi = require('joi');

export const getSessionSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    initDate: Joi.date().allow(null),
    finishDate: Joi.date().allow(null),
    vacancies: Joi.number().required(),
    showOnPortal: Joi.boolean().required(),
    allowEnrollInitDate: Joi.date().allow(null),
    allowEnrollFinishDate: Joi.date().allow(null),
    solutionType: Joi.string().required(),
})