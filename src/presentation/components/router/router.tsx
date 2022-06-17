import { BrowserRouter, Routes, Route } from "react-router-dom";

type Props = {
  MakeLogin: React.FC;
};

function Router({ MakeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
