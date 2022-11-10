import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Capital from "../Components/Capital";
import Landing from "../Components/Landing";

export const Paths = {
  landing: "/",
  capital: "/capital",
};

const AppRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path={Paths.landing} element={<Landing />} />
        <Route path={Paths.capital} element={<Capital />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
