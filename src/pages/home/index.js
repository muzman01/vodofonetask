import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../../components/users/UserList";
import AddUser from "../../components/users/AddUser";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [searcVisible, setSearcVisible] = useState(false);
  const [searcVisibleName, setSearcVisibleName] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSerch, setLoadingSerch] = useState(false);
  const [userId, setUserId] = useState();
  const [searchUserName, setSearchUserName] = useState([]);
  const [inputGetName, setInputGetName] = useState();
  const [seachUserId, setSearchUserId] = useState();
  const [error, setError] = useState("");
  const getAllUserInApi = async () => {
    try {
      const { data } = await axios.get(
        "https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd"
      );
      setAllUsers(data);
    } catch (error) {}
  };
  const handleChangeUserName = async (e) => {
    const name = e.target.value;
    setInputGetName(name);
  };
  const searchBtn = async () => {
    setSearcVisibleName(true);
    setLoadingSerch(true);
    try {
      const { data } = await axios.get(
        `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd?name=${inputGetName}`
      );
      console.log(data);
      setSearchUserName(data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const handleChangeUserId = async (e) => {
    const id = e.target.value;
    setSearcVisible(true);
    setLoadingSerch(true);
    try {
      const { data } = await axios({
        method: "get",
        url: `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd/${id}`,
      });

      setSearchUserId(data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd/${id}`,
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {}
  };
  const updateUser = (id) => {
    setUserId(id);
    setVisible(true);
  };
  const logOutBtn = () =>{
    Cookies.set('user',"")
    dispatch({
      type: "LOGOUT",
    });
    window.location.reload();
  }
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
          <div className="absolute mt-20">
            <button className="blue_btn" onClick={logOutBtn}>Log Out</button>
          </div>
          <div className="ml-36 p-4 flex">
            <div className="input_wrap">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search UserName"
                  className="input_wrap2"
                  onChange={handleChangeUserName}
                />
                <button className="blue_btn" onClick={searchBtn}>
                  search
                </button>
              </div>
            </div>
            <div className="input_wrap ml-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search İd"
                  className="input_wrap"
                  onChange={handleChangeUserId}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Number or numbers</th>
              <th className="text-left p-3 px-5">user Id</th>

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

            {allUsers?.map((users) => (
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
        {searcVisible ? (
          <>
            {error !== "" ? (
              <>
                <div className="blurt">
                  <tbody className="absolute mt-56 ml-56">
                    <h1 className="text-red-500 text-5xl">
                      Kullanıcı Bulunamadı
                    </h1>
                    <span
                      className=" ml-80 mt-2 text-red-500 cursor-pointer"
                      onClick={() => setSearcVisible(false)}
                    >
                      {" "}
                      close{" "}
                    </span>
                  </tbody>
                </div>
              </>
            ) : (
              <div className="blurt">
                <tbody className="absolute mt-56 ml-56">
                  <span
                    className=" ml-80 mt-2 text-red-500 cursor-pointer"
                    onClick={() => setSearcVisible(false)}
                  >
                    {" "}
                    close{" "}
                  </span>
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">
                      <span className="bg-transparent">
                        {seachUserId?.name}
                      </span>
                    </td>
                    <td className="p-3 px-5">
                      <span className="bg-transparent">
                        {seachUserId?.number.map((k, i) => (
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

                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => updateUser(seachUserId?.id)}
                      >
                        {loading ? (
                          <ClipLoader
                            color="#187f62"
                            loading={loading}
                            size={50}
                          />
                        ) : (
                          <>Update</>
                        )}
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => deleteUser(seachUserId?.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <ClipLoader
                            color="#187f62"
                            loading={loading}
                            size={50}
                          />
                        ) : (
                          <>Delete</>
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        {searcVisibleName ? (
          <>
            {error !== "" ? (
              <>
                {loadingSerch ? (
                  <ClipLoader color="#187f62" loading={loading} size={150} />
                ) : (
                  <>
                    {" "}
                    <div className="blurt">
                      <tbody className="absolute mt-56 ml-56">
                        <h1 className="text-red-500 text-5xl">
                          Kullanıcı Bulunamadı
                        </h1>
                        <span
                          className=" ml-80 mt-2 text-red-500 cursor-pointer"
                          onClick={() => setSearcVisibleName(false)}
                        >
                          {" "}
                          close{" "}
                        </span>
                      </tbody>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="blurt">
                <div className="absolute mt-56 ml-56">
                  {searchUserName?.map((users) => (
                    <UserList
                      key={users.id}
                      setVisible={setVisible}
                      users={users}
                    />
                  ))}
                  <span
                    className=" ml-80 mt-2 text-red-500 cursor-pointer"
                    onClick={() => setSearcVisibleName(false)}
                  >
                    {" "}
                    close{" "}
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
