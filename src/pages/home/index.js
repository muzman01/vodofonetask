import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "../../components/users/UserList";
import AddUser from "../../components/users/AddUser";
import { userReducer } from "../../functions/reducers";
import axios from "axios";
export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const getAllUserInApi = async () => {
    try {
      const { data } = await axios.get(
        "https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd"
      );
      setAllUsers(data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllUserInApi();
  }, []);
console.log(allUsers);
  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">
            Welcome <span className="text-blue-600">{user.email}</span>
          </h1>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Number or numbers</th>

              <th>
                {" "}
                <button
                  type="button"
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setVisible(true)}
                >
                  Add New User
                </button>
              </th>
            </tr>
            {allUsers.map((users) => (
              <UserList key={users.id} setVisible={setVisible} users={users} />
            ))}
          </table>
        </div>
        {visible ? (
          <div className="blurt">
            <AddUser setVisible={setVisible} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
