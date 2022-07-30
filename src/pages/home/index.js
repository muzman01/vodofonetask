import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../../components/users/UserList";
import AddUser from "../../components/users/AddUser";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  getAllApiUser,
  getApıUserName,
  getApıById,
  deleteByID,
  listOfDate,
} from "../../functions/fetchData";
import { filterAllData } from "../../functions/filterUsers";
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
  const [filterStata, setFilterState] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchUserName, setSearchUserName] = useState([]);
  const [inputGetName, setInputGetName] = useState();
  const [seachUserId, setSearchUserId] = useState();
  const [error, setError] = useState("");
  const getAllUserInApi = async () => {
    const a = await listOfDate();

    setLoading(true);
    try {
      const data = await getAllApiUser();
      setLoading(false);
      setAllUsers(data);
    } catch (error) {}
  };
  const handleChangeUserName = async (e) => {
    const name = e.target.value;
    setInputGetName(name);
  };
  const searchBtn = async () => {
    setLoading(true)
    setSearcVisibleName(true);
    setLoadingSerch(true);
    try {
      const data = await getApıUserName(inputGetName);
      setLoading(false)
      setSearchUserName(data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const handleChangeUserId = async (e) => {
    const id = e.target.value;
    setLoading(true)
    setSearcVisible(true);
    setLoadingSerch(true);
    try {
      const data = await getApıById(id);
      setLoading(false)
      setSearchUserId(data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const data = await deleteByID(id);
      setLoading(false);
      window.location.reload();
    } catch (error) {}
  };
  const updateUser = (id) => {
    setUserId(id);
    setVisible(true);
  };
  const logOutBtn = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    window.location.reload();
  };
  const onSelect = async (e) => {
    if (e.target.value === "default") {
      setFilterState(false);
      return;
    }
    setLoading(true);
    setFilterState(true);
    try {
      const result = await filterAllData(e.target.value);
      setLoading(false);
      setFilterData(result);
    } catch (error) {}
  };
  useEffect(() => {
    getAllUserInApi();
  }, []);
console.log(filterData);
  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
          <h1 className="text-3xl">
            Welcome <span className="text-blue-600">{user.email}</span>
          </h1>
          <div className="absolute mt-20">
            <button className="blue_btn" onClick={logOutBtn}>
              Log Out
            </button>
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
                <th>
                  <select
                    id="countries"
                    className="bg-gray-200 border border-gray-300 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onSelect}
                  >
                    <option selected value="default">
                      Filter Users
                    </option>
                    <option value="gendermale">by gender Male</option>
                    <option value="genderfemale">by gender Female</option>
                    <option value="optturkcell">by operator Turkcell</option>
                    <option value="optvodafone">by operator Vodafone</option>
                    <option value="opttelekom">by operator Telekom</option>
                    <option value="date">creation time</option>
                  </select>
                </th>
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
              <th className="text-left p-3 px-5">Gender</th>
              <th className="text-left p-3 px-5">Operatör</th>

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
            {loading ? (
              <div style={{ marginLeft: "100%" }}>
                {" "}
                <ClipLoader color="#187f62" loading={loading} size={200} />
              </div>
            ) : (
              <></>
            )}
            {filterStata ? (
              <>
                {filterData?.map((users) => (
                  <UserList
                    key={users.id}
                    setVisible={setVisible}
                    users={users}
                  />
                ))}
              </>
            ) : (
              <>
                {" "}
                {allUsers?.map((users) => (
                  <UserList
                    key={users.id}
                    setVisible={setVisible}
                    users={users}
                  />
                ))}
              </>
            )}
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
