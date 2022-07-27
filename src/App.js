import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import LoggedInRouters from "./routers/LoggedInRouters";
import NotLoggedRouters from "./routers/NotLoggedRouters";

function App() {
  console.log(process.env.ADMİN_NAME);
  return (
    <>
      <Routes>
        <Route element={<LoggedInRouters />}>
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<NotLoggedRouters />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </>
  );
}

export default App;
