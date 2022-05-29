import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../../pages";

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
