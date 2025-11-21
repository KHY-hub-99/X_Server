import express from "express";
import * as AC from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";
import { users } from "../data/auth.mjs";
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();
const validationLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 3자 이상")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("특수문자 사용불가"),
  body("password").trim().isLength({ min: 4 }).withMessage("최소 4자 이상"),
  validate,
];

const validationSign = [
  ...validationLogin,
  body("name").trim().notEmpty().withMessage("이름을 입력하세요."),
  body("email").trim().isEmail().withMessage("이메일 형식을 확인하세요."),
  validate,
];

// 회원 가입
router.post("/signup", validationSign, AC.signup);

// 로그인
router.post("/login", validationLogin, AC.login);

// 로그인 유지
router.post("/me", isAuth, AC.me);

export default router;
