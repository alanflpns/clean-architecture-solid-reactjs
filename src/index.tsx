import React from "react";
import ReactDOM from "react-dom/client";
import { makeLogin } from "./factories/pages/login/login-factory";
import { Router } from "./presentation/components";

import "./presentation/styles/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router MakeLogin={makeLogin} />
  </React.StrictMode>
);
