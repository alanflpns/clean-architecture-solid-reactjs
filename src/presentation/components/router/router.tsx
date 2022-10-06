import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "../../pages";

type Props = {
  MakeLogin: React.FC;
};

function Router({ MakeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
