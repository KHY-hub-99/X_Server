import { db } from "../db/database.mjs";

// select p.id, p.text, p.createAt, u.userid, u.name, url from users as u join posts as p on u.idx = p.useridx order by p.createAt desc

const SELECT_JOIN =
  "select p.id, p.text, p.createAt, u.userid, u.name, url from users as u join posts as p on u.idx = p.useridx";
const ORDER_DESC = "order by p.createAt desc";
const ORDER_ASC = "order by p.createAt asc";

// 모든 포스트를 리턴
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

// 사용자 ID(userid)에 대한 포스트 리턴
export async function getAllByUserid(userid) {
  return db
    .execute(`${SELECT_JOIN} where u.userid=? ${ORDER_DESC}`, [userid])
    .then((result) => result[0]);
}

// 글 번호에 대한 포스트를 리턴
export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} where p.id=?`, [id])
    .then((result) => result[0][0]);
}

// 포스트를 작성
export async function create(text, useridx) {
  return db
    .execute("insert into posts (useridx, text) values (?, ?)", [useridx, text])
    .then((result) => getById(result[0].insertId));
}

// 포스트를 변경
export async function update(id, text) {
  return db
    .execute("update posts set text=? where id=?", [text, id])
    .then(() => getById(id));
}

// 포스트를 삭제
export async function removeId(id) {
  return db.execute("delete from posts where id=?", [id]);
}
