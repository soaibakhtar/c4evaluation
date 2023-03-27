var jwt = require("jsonwebtoken");

const authorisation = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
    jwt.verify(token, "masai", function (err, decoded) {
      if (decoded) {
        req.body.UserId = decoded.userId
        console.log(decoded)
        next();
      } else {
        res.send({ msg: err.message });
      }
    });
  } else {
    res.send({"err":`Plz Login First`});
  }
};
module.exports = { authorisation };
