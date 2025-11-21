import express from "express";
import * as AC from "../controller/auth.mjs";

const router = express.Router();

// 회원 가입
router.post("/signup", AC.signup);

// 로그인
router.post("/login", AC.login);

// 로그인 유지

export default router;
