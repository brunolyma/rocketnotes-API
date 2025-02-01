const { Router } = require("express");

const UsersController = require("../controllers/UsersControllers");
const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);
module.exports = usersRoutes;
