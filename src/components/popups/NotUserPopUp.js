import React from "react";

export default function NotUserPopUp({ setSearcVisible }) {
  setTimeout(() => {
    window.location.reload();
  }, 500);
  return (
    <div className="blurt">
      <tbody className="absolute mt-56 ml-56">
        <h1 className="text-red-500 text-5xl">Kullanıcı Bulunamadı</h1>
        <span
          className=" ml-80 mt-2 text-red-500 cursor-pointer"
          onClick={() => setSearcVisible(false)}
        >
          {" "}
          close{" "}
        </span>
      </tbody>
    </div>
  );
}
