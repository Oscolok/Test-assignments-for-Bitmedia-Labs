const { Router } = require("express");
const router = Router();
const Joi = require("joi");

const controller = require("./users.controller");
const { validate } = require("../helpers/validate");

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  level: Joi.number().required(),
  score: Joi.number().required(),
});

router.post("/", validate(createUserSchema), controller.addUser);

router.get("/", controller.listUsers);

const updateUserSchema = Joi.object({
  level: Joi.number(),
  score: Joi.number(),
}).min(1);
router.put("/:userId", validate(updateUserSchema), controller.updateUser);

exports.usersRouter = router;
