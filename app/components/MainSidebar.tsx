import { Sidebar } from "~/src";
import {
	HiArrowSmRight,
	HiChartPie,
	HiTable,
	HiUser,
} from "react-icons/hi";
import { SidebarContext } from "~/src/components/Sidebar/SidebarContext";

export const MainSidebar = () => {
	return (
		<SidebarContext.Provider value={{ isCollapsed: true }}>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href="#" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiUser}>
						Users
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiArrowSmRight}>
						Sign In
					</Sidebar.Item>
					<Sidebar.Item href="#" icon={HiTable}>
						Sign Up
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</SidebarContext.Provider>
	);
};
