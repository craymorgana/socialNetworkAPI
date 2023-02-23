const router = require("express").Router();
const {
	getUsers,
	getSingleUser,
	createUser,
	deleteUser,
	updateUser,
} = require("../../controllers/userController");

//post route /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;
