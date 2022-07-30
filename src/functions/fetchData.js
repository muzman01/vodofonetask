import axios from "axios";
const API_RUL = process.env.REACT_APP_API_URL;

export async function getAllApiUser() {
  const url = API_RUL;
  const res = await axios.get(url);
  return res.data;
}
export async function getApıUserName(username) {
  const url = `${API_RUL}?name=${username}`;
  const res = await axios.get(url);
  return res.data;
}
export async function getApıById(id) {
  const url = `${API_RUL}/${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function deleteByID(id) {
  const url = `${API_RUL}/${id}`;
  const res = await axios.delete(url);
  return res.data;
}

export async function addUser(name, number) {
  const url = API_RUL;
  const res = await axios({
    method: "post",
    url,
    headers: {},
    data: {
      name,
      number: number,
    },
  });
  return res.data;
}

export async function editUserById(id, name, number) {
  const url = `${API_RUL}/${id}`;
  const res = await axios({
    method: "put",
    url,
    headers: {},
    data: {
      name,
      number: number,
    },
  });
  return res.data;
}
export async function listOfDate(){
    const url = `${API_RUL}/?sortBy=createdAt&order=desc`;
    const res = await axios.get(url);
    return res.data;
}