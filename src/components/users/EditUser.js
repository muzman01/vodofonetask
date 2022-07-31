import { Formik, Form } from "formik";
import "./style.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import UpdateUserInput from "../../components/inputs/updateUser/index";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginInput from "../inputs/logininput";
import AperatorSelectUpdate from "../inputs/updateUser/AperatorSelectUpdate";
import GenderSelecktUpdate from "../inputs/updateUser/GenderSelecktUpdate";
export default function EditUser({ setVisible, userId, users }) {
  const userInfos = {
    name: users.name,
    gender: users.gender,
    oparetor: users.oparetor,
  };
  const numberInfos = {
    number: [],
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(userInfos);
  const [phoneNumbersArray, setPhoneNumbersArray] = useState(users.number);
  const [userNumbers, setUserNumbers] = useState([]);
  const [phoneList, setPhoneList] = useState(users.number.length);
  const [phoneArray, setPhoneArray] = useState([]);
  const [genderError, setGenderError] = useState("");
  const { name, gender, oparetor } = login;
  const { number } = phoneNumbersArray;
  console.log(phoneNumbersArray);
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleNumberChange = (e) => {
    const { name, value } = e.target;

    setPhoneNumbersArray([{ ...phoneNumbersArray, [name]: value }]);
  };

  const loginValidation = Yup.object({
    name: Yup.string().required("name address is required.").max(100),
    number: Yup.string().required("number is required"),
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      setLoading(true);
      const { data } = await axios({
        method: "put",
        url: `https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd/${userId}`,
        headers: {},
        data: {
          name: login.name,
          number: phoneNumbersArray,
          gender: login.gender,
          oparetor: login.oparetor,
        },
      });
      console.log(data);
      setSuccess("user add succes");

      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  var fieldsArray = [];

  for (var i = 1; i <= phoneList; i++) {
    fieldsArray.push(
      <div className="input_wrap mt-8">
        <div className="w-full">
          <input
            type="text"
            name={`${i - 1}`}
            placeholder={`${users.number[i - 1]}`}
            className="input_wrap"
            onChange={handleNumberChange}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="login_2 mt-52">
        <div className="login_2_wrap">
          <span
            className=" ml-80 mt-2 text-red-500 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            {" "}
            close{" "}
          </span>
          <Formik
            enableReinitialize
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <UpdateUserInput
                  type="text"
                  name="name"
                  placeholder={`${users.name}`}
                  onChange={handleLoginChange}
                />
                <div className="border-t-2 border-indigo-500">
                  <br></br>
                  <span
                    onClick={() => setPhoneList(phoneList - 1)}
                    className="ml-48 mt-6 text-black font-bold p-2 px-4 rounded cursor-pointer "
                  >
                    {" "}
                    -
                  </span>
                  <span
                    onClick={() => setPhoneList(phoneList + 1)}
                    className="   mt-6 w-11   font-bold p-2 text-black rounded cursor-pointer "
                  >
                    {" "}
                    +
                  </span>
                  {fieldsArray}
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Gender <i className="info_icon"></i>
                  </div>
                  <GenderSelecktUpdate
                    handleLoginChange={handleLoginChange}
                    genderError={genderError}
                    checked={users.gender}
                  />
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Operatör <i className="info_icon"></i>
                  </div>
                  <AperatorSelectUpdate
                    handleLoginChange={handleLoginChange}
                    genderError={genderError}
                    checked={users.oparetor}
                  />
                </div>
                <br></br>
                <button
                  type="submit"
                  className="blue_btn"
                  onClick={loginSubmit}
                >
                  add new user
                </button>
              </Form>
            )}
          </Formik>

          <ClipLoader color="#187f62" loading={loading} size={150} />
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}
          <div className="sign_splitter"></div>
        </div>
      </div>
    </>
  );
}
