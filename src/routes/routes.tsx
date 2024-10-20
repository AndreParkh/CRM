import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SimpleLogin from "../components/authorization/simple/SimpleLogin";
import { MainPage } from "../components/main/mainPage";
import { AdminPage } from '../Pages/AdminPage';

export const RouteNavigation: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminPage />} />
			{/* <Route path="/simple_login" element={<SimpleLogin />} /> */}
			{/* <Route path="/main_page" element={<MainPage />} /> */}
		</Routes>
	);
};
