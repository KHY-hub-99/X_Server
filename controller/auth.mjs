import express from "express";
import * as AR from "../data/auth.mjs";
import * as bcr from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretkey = config.jwt.secertKey;
const bcrSalt = config.bycrypt.saltRounds;
const jwtExpire = config.jwt.expiresInSec;

async function createJWT(id) {
  return jwt.sign({ id }, secretkey, { expiresIn: jwtExpire });
}

// 회원가입
export async function signup(req, res, next) {
  const { userid, password, name, email, url } = req.body;
  // 회원 중복 체크
  const found = await AR.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }
  const hashed = bcr.hashSync(password, bcrSalt);
  const user = await AR.addUser({ userid, password: hashed, name, email, url });
  const token = await createJWT(user.id);
  console.log(token);
  res.status(210).json({ token, user });
}

// 로그인 확인 //
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await AR.findByUserid(userid);
  if (!user) {
    res.status(401).json(`${userid}를 찾을 수 없습니다.`);
  }
  const isvalid = await bcr.compare(password, user.password);
  console.log(isvalid);
  if (!isvalid) {
    res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJWT(user.id);
  res.status(200).json({ token, user });
}

// 로그인 유지하기
export async function me(req, res, next) {
  const user = await AR.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
