import { name } from "ejs";
import { db } from "../db/database.mjs";

// 회원가입 데이터 입력하기
export async function addUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users (userid, password, name, email, url) values (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

// 로그인 하기 //
// export async function loginUser(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   if (user) {
//     return true;
//   }
// }

// export async function loginUser(userid, password) {
//   const user = users.find(
//     (user) => user.userid === userid && user.password === password
//   );
//   return user;
// }

export async function findByuserId(userid) {
  return db
    .execute("select idx, password from users where userid=?", [userid])
    .then((result) => {
      console.log(result);
      return result[0][0];
    });
}

export async function findById(idx) {
  return db
    .execute("select idx, userid from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
