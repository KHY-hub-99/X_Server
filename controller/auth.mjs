import express from "express";
import * as AR from "../data/auth.mjs";

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await AR.addUser(userid, password, name, email);
  if (user) {
    res.status(200).json(user);
  }
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const loginSuccess = await AR.loginUser(userid, password);
  console.log(loginSuccess);
  if (loginSuccess === true) {
    return res.status(200).json({ message: "로그인 되었습니다." });
  } else {
    return res
      .status(404)
      .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
  }
}

// export async function login(req, res, next) {
//   const { userid, password } = req.body;
//   const user = await AR.loginUser(userid, password);
//   if (user) {
//     res.status(200).json({ message: `${userid}님 로그인 되었습니다.` });
//   } else {
//     res
//       .status(404)
//       .json({ message: `${userid}님 아이디 또는 비밀번호가 맞지 않습니다.` });
//   }
// }
