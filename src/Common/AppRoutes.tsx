import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";

export const Paths = {
    capital: "/capital"
};

const AppRoutes: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;