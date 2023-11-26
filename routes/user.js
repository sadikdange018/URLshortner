const express = require("express");
const {
    handleUserSignup,
    handleUserLogin,
} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
//router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;