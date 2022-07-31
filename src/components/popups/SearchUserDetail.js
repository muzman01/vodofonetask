import React from "react";
import UserList from "../users/UserList";

export default function SearchUserDetail({
  searchUserName,
  setVisible,
  setSearcVisibleName,
}) {
  return (
    <div className="absolute mt-56 ml-56">
      {searchUserName?.map((users) => (
        <UserList key={users.id} setVisible={setVisible} users={users} />
      ))}
      <span
        className=" ml-80 mt-2 text-red-500 cursor-pointer"
        onClick={() => setSearcVisibleName(false)}
      >
        {" "}
        close{" "}
      </span>
    </div>
  );
}
