const { join } = require('bluebird');
const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { value, error } = Joi.validate(req.body, schema, {
        abortEarly: false,
      });
      // console.log("value",value);
      // if(value){
      //     console.log(value);
      // }else{
      //     console.log(error);
      // }
      // console.log(value);
      console.log("first");
      if (error) {
        let err_msg = {};
        for (let counter in error.details) {
          let k = error.details[counter].context.key;
          let val = error.details[counter].message;
          err_msg[k] = val;
        }
        let return_err = { status: 2, errors: err_msg };
        return res.status(400).json({ return_err });
      }

      // console.log(req.value);
      if (!req.value) {
        req.value = {};
      }
      req.value = value;
      // console.log(req.value);
      next();
    };
  },

  schemas: {
    userSchema: Joi.object().keys({
      Stu_Info: Joi.object()
        .keys({
          student_name: Joi.string().required().alphanum(),
          student_rollno: Joi.number().required(),
          student_class: Joi.number().integer().required(),
          student_section: Joi.string().required(),
        })
        .required(),
      PartOne: Joi.array()
        .items(
          Joi.object().keys({
            first_anual_marks: Joi.number().integer().required(),
            first_oral_marks: Joi.number().integer().required(),
            id: Joi.string().required(),
            second_anual_marks: Joi.number().integer().required(),
            second_oral_marks: Joi.number().integer().required(),
            subject: Joi.string().required(),
          })
        )
        .min(2)
        .required(),
      PartTwo: Joi.array()
        .items(
          Joi.object().keys({
            grades: Joi.string(),
            id: Joi.string().required(),
            sub_part_two: Joi.string(),
          })
        )
        .min(2)
        .required(),
      PartThree: Joi.array()
        .items(
          Joi.object().keys({
            id: Joi.string(),
            present: Joi.number().integer(),
            sub_part_three: Joi.string(),
            Working: Joi.number().integer(),
          })
        )
        .min(1)
        .required(),
    }),
  },
};



