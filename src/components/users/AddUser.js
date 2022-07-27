import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/logininput/index";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const userInfos = {
  name: "",
  number: [],
};
export default function AddUser({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(userInfos);
  const { name, number } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
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
        method: "post",
        url: "https://62e12824fa99731d75cf9609.mockapi.io/api/users/userd",
        headers: {},
        data: {
          name,
          number,
        },
      });
      console.log(data);
      setSuccess("user add succes");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
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
            initialValues={{
              name,
              number,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="name"
                  placeholder="user name"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="text"
                  name="number"
                  placeholder="user phone number"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
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
