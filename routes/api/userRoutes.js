const router = require("express").Router();
const {
	getUsers,
	getSingleUser,
	createUser,
	deleteUser,
} = require("../../controllers/userController");

//post route /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

router.route("/:userId").delete(deleteUser);

module.exports = router;
