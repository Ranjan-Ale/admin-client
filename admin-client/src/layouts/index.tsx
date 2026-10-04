import { Outlet } from "react-router"
import Header from "./header"
import Footer from "./footer";
import Sidebar from "./sidebar";

const AdminLayout = () => {
	return (
		<>
		<div className="app-wrapper">
			<Header />
			<Sidebar />
			<main className="app-main">
				<Outlet />
			</main>
			<Footer />
		</div>
		</>
	)
}

export default AdminLayout;