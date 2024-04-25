import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { NextPage } from "next";

const HomePage: NextPage = () => {
    return null;
};

HomePage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default HomePage;
