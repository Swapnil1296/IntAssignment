const express = require("express");
const passport = require("passport");

const { validateBody, schemas } = require("../helpers/admValidate");
const admController = require('../controllers/adm');

require("../passport");
const passportSignIn = passport.authenticate("localAdm", { session: false });

const router = express.Router();


router.post("/login", validateBody(schemas.authSchemas), passportSignIn,admController.handle_auth, admController.login);



module.exports = router;
