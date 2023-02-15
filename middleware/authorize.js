const jwt = require("jsonwebtoken");

const autorize = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.redirect("/todos")
  } catch (err) {
    next();
    res.clearCookie("token");
    res.redirect("/users/login")
  }
}

module.exports = autorize