import { defaultAxiosUrl } from "./createAxios";
import { DASHBOARDURL } from "./urls";

export const getDashboardTableData = () => defaultAxiosUrl.get(DASHBOARDURL);
