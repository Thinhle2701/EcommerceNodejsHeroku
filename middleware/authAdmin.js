const jwt = require("jsonwebtoken");
const user = require("../model/user");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const checkAdmin = await user.findOne({ userId: decoded.userID });
    if (checkAdmin.user_type == "admin") {
      //   next();
      console.log();
    } else {
      //   return res.json({
      //     success: false,
      //     message: "You are not allow to access",
      //   });
      console.log(checkAdmin);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

module.exports = verifyToken;
