import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return null;
};

HomePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HomePage;
