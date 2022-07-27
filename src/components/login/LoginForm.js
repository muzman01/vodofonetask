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
const loginInfos = {
  email: "",
  password: "",
};
const data = {
  email: "muzman@muzman.com",
  password: "12345",
};
const ACCNAME = "muzman@muzman.com";
const ACCKEY = "12345";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSubmit = async () => {
    setLoading(true);
    if (email === ACCNAME || password === ACCKEY) {
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } else {
      setLoading(false);
      setError("Username or password is incorrect");
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <span>vodofone user</span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
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
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
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
    </div>
  );
}
