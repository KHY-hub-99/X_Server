import express from "express";
import * as AR from "../data/auth.mjs";
import * as bcr from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretkey = config.jwt.secertKey;
const bcrSalt = config.bycrypt.saltRounds;
const jwtExpire = config.jwt.expiresInSec;

async function createJWT(idx) {
  return jwt.sign({ idx }, secretkey, { expiresIn: jwtExpire });
}

// 회원가입
export async function signup(req, res, next) {
  const { userid, password, name, email, url } = req.body;
  // 회원 중복 체크
  const found = await AR.findByuserId(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }
  const hashed = bcr.hashSync(password, bcrSalt);
  const user = await AR.addUser({ userid, password: hashed, name, email, url });
  const token = await createJWT(user.idx);
  res.status(210).json({ token, user });
}

// 로그인 확인 //
// export async function login(req, res, next) {
//   const { userid, password } = req.body;
//   const loginSuccess = await AR.loginUser(userid, password);
//   console.log(loginSuccess);
//   if (loginSuccess === true) {
//     return res.status(200).json({ message: "로그인 되었습니다." });
//   } else {
//     return res
//       .status(404)
//       .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
//   }
// }

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await AR.findByuserId(userid);
  if (!user) {
    res.status(401).json(`${userid}를 찾을 수 없습니다.`);
  }
  const isvalid = await bcr.compare(password, user.password);
  console.log(isvalid);
  if (!isvalid) {
    res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJWT(user.idx);
  console.log(token);
  res.status(200).json({ token, user });
}

export async function me(req, res, next) {
  const user = await AR.findById(req.idx);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
  }
  res
    .status(200)
    .json({ /*token: req.token,*/ idx: user.idx, userid: user.userid });
}
