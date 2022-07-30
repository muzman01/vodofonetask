import axios from "axios";
const API_RUL = process.env.REACT_APP_API_URL;
export async function filterAllData(option) {
  if (option === "default") {
  }
  if (option === "gendermale") {
    const url = `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?gender=1`;
    const { data } = await axios.get(url);
    return data;
  }
  if (option === "genderfemale") {
    const url = `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?gender=2`;
    const { data } = await axios.get(url);
    return data;
  }
  if (option === "optturkcell") {
    const url = `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?oparetor=Turkcell`;
    const { data } = await axios.get(url);
    return data;
  }
  if (option === "optvodafone") {
    const url = `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?oparetor=Vodafone`;
    const { data } = await axios.get(url);
    return data;
  }
  if (option === "opttelekom") {
    const url = `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?oparetor=TurkTelekom`;
    const { data } = await axios.get(url);
    return data;
  }
  if (option === "date") {
    const url =
      "https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?sortBy=creatTime&order=desc";
    const { data } = await axios.get(url);
    return data;
  }
}
