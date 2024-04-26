import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Box from "@mui/material/Box";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return <Box>Hello!</Box>;
};

HomePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HomePage;
