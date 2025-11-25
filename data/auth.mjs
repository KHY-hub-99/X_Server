import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";

const ObjectID = MongoDB.ObjectId;

// 회원가입 데이터 입력하기
export async function addUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

// 로그인 하기 //
export async function findByUserid(userid) {
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
