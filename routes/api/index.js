const router = require("express").Router();
const thoughtRoutes = require("./thoughts");
const userRoutes = require("./users");
const reactionRoutes = require("./reactions");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/reactions", reactionRoutes);

module.exports = router;
