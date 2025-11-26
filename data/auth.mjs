import { useVirtualId } from "../db/database.mjs";
import Mongoose from "mongoose";

// versionKey: Mongoose가 문서를 저장할 때 자동으로 추가하는 _v라는 필드를 설정
const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

// 회원가입 데이터 입력하기
export async function addUser(user) {
  return new User(user).save().then((data) => data.id);
}

// 로그인 하기 //
export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
