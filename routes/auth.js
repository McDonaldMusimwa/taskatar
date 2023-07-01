const router = require("express").Router();
const Authentication = require("../controller/auth");
const passport = require("passport");

router.post("/login", Authentication.login);

//google
router.get(
  "/google",
  passport.authenticate("google", {
    //what we want from the user
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/failed",
  })
);


router.get("/protected", (res, req) => {
  res.send("logged in ");
});

router.get("/failed", (res, req) => {
  res.send("failed ");
});

module.exports = router;
