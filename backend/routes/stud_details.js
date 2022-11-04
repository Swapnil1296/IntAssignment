const express = require("express");
const passport = require("passport");
const admController = require("../controllers/adm");
const { validateBody, schemas } = require("../helpers/userValidate");
const validateDBbody = require("../helpers/admDbValidate");
require("../passport");
const passportJWT = passport.authenticate("jwtAdm", { session: false });

const router = express.Router();

router.post(
  "/details",
  passportJWT,
  admController.handle_auth,
  validateBody(schemas.userSchema),
  validateDBbody.add_studentInfo,
  admController.result_data
);

router.get(
  "/stu_details",
  passportJWT,
  admController.handle_auth,
  admController.get_student_details
);
router.get(
  "/stu_res/:id",
  passportJWT,
  admController.handle_auth,
  admController.get_student_result
);

router.put(
  "/update_details/:id",
  passportJWT,
  admController.handle_auth,
  admController.update_student_results
);
router.delete(
  "/delete_student/:id",
  passportJWT,
  admController.handle_auth,
  admController.delete_student_details
);
module.exports = router;
