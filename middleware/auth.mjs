import jwt from "jsonwebtoken";
import * as AR from "../data/auth.mjs";

const AUTH_ERROR = { message: "인증 에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("header error");
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  console.log("토큰 분리 성공", token);
  jwt.verify(token, "asadfe!@#$", async (error, decoded) => {
    if (error) {
      console.log("Token Error");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded);
    const user = await AR.findById(decoded.id);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user.id", user.id);
    console.log("user.userid", user.userid);
    req.userid = user.userid;
    next();
  });
};
