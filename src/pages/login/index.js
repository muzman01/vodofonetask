import "./style.css";
import LoginForm from "../../components/login/LoginForm";

import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
      </div>
    </div>
  );
}
