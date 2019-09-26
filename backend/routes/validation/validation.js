const Joi = require('@hapi/joi');

const listValidation=(name)=>
{
 const schema = Joi.object().keys({
     name: Joi.string().required(),
     
 })
  return schema.validate(name, schema);
}
const todoValidation=(todo)=>
{
 const schema = Joi.object().keys({
     title: Joi.string().required(),
     marked: Joi.boolean(),
     dueDate: Joi.date().iso(),
 })
  return schema.validate(todo);
}
module.exports.listValidation = listValidation;
module.exports.todoValidation = todoValidation;