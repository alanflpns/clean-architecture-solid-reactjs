import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../../pages";

import "../../styles/global.scss";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
