const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser).patch(updateUser);

module.exports = router;
