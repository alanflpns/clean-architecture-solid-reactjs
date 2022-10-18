import { BrowserRouter, Routes, Route } from "react-router-dom";

type Factory = {
  MakeLogin: React.FC;
  MakeSignUp: React.FC;
};

function Router(Factory: Factory) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Factory.MakeLogin />} />
        <Route path="/signup" element={<Factory.MakeSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
