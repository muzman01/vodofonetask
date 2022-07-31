import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
export default function UserDetailPopUp({
  setSearcVisible,
  updateUser,
  searchUserId,
  loading,
  deleteUser,
}) {

  return (
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
          <span className="bg-transparent">{searchUserId?.name}</span>
        </td>
        <td className="p-3 px-5">
          <span className="bg-transparent">
            {Object.values(searchUserId?.number).map((k, i) => (
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
            onClick={() => updateUser(searchUserId?.id)}
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
            onClick={() => deleteUser(searchUserId?.id)}
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
  );
}
