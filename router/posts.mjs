import express from "express";
import * as PC from "../controller/post.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();
const validator = [
  body("text").trim().isLength({ min: 3 }).withMessage("최소 3자이상 입력"),
  validate,
];

// 전체 포스트 가져오기
// 특정 아이디에 대한 포스트 가져오기
// http://127.0.0.1:8080/post
// http://127.0.0.1:8080/post?userid={YOUR_ID}
router.get("/", PC.getPosts);

// 글번호에 대한 포스트 가져오기
// http://127.0.0.1:8080/post/:id
router.get("/:id", PC.getPost);

// 포스트 쓰기
// http://127.0.0.1:8080/post/
router.post("/", validator, PC.createPost);

// 포스트 수정하기
// http://127.0.0.1:8080/post/:id
router.put("/:id", PC.updatePost);

// 포스트 삭제하기
// http://127.0.0.1:8080/post/:id
router.delete("/:id", PC.deletePost);

export default router;
