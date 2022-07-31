import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import EditUser from "./EditUser";
import { deleteByID } from "../../functions/fetchData";
export default function UserList({ users }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [visible, setVisible] = useState(false);
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const { data } = await deleteByID(id);

      setLoading(false);
      window.location.reload();
    } catch (error) {}
  };
  const updateUser = (id) => {
    setUserId(id);
    setVisible(true);
  };
  console.log(users);
  return (
    <>
      <tbody>
        <tr className="border-b hover:bg-orange-100 bg-gray-100">
          <td className="p-3 px-5">
            <span className="bg-transparent">{users.name}</span>
          </td>
          <td className="p-3 px-5">
            <span className="bg-transparent">
              {users.number.map((k, i) => (
                <ul>
                  <li key={i}>
                    <span className="text-sm text-blue-600 font-medium leading-tight">
                      Phone Number: {k}
                    </span>
                  </li>
                </ul>
              ))}
            </span>
          </td>
          <td className="p-3 px-5">
            <span className="bg-transparent">
              {users.gender === "1" ? (
                <span>Male</span>
              ) : users.gender === "2" ? (
                <span>Female</span>
              ) : (
                <span>Belirtmek istemiyor</span>
              )}
            </span>
          </td>
          <td className="p-3 px-5">
            <span className="bg-transparent">{users.oparetor}</span>
          </td>
          <td className="p-3 px-5 flex justify-end">
            <button
              type="button"
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => updateUser(users.id)}
            >
              {loading ? (
                <ClipLoader color="#187f62" loading={loading} size={50} />
              ) : (
                <>Update</>
              )}
            </button>
            <button
              type="button"
              className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => deleteUser(users.id)}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#187f62" loading={loading} size={50} />
              ) : (
                <>Delete</>
              )}
            </button>
          </td>
        </tr>
      </tbody>
      {visible ? (
        <div className="blurt">
          <EditUser setVisible={setVisible} userId={userId} users={users} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
