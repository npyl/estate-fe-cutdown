import { Box, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePropertyMutation,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import ViewHeader from "src/pages/components/ViewHeader";

import "photoswipe/dist/photoswipe.css";

import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";
import { ConfirmationDialogBox } from "src/pages/components/ConfirmationDialogBox";

import { Map, MainContainer } from "./tabs";
import { UploadFileProvider } from "src/contexts/uploadFile";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SingleProperty: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { removeTab } = useTabsContext();

    const { propertyId } = router.query;

    const [cloneProperty] = useClonePropertyMutation();
    const [deleteProperty] = useDeletePropertyMutation();

    const [value, setValue] = useState(0);
    const [cloneConfirmDialogOpen, setCloneConfirmDialogOpen] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

    const handleEdit = () => router.push(`/property/edit/${propertyId}`);

    const handleClone = () => setCloneConfirmDialogOpen(true);
    const closeCloneConfirmaionDialog = () => setCloneConfirmDialogOpen(false);

    const handleCloneConfirmation = () => {
        closeCloneConfirmaionDialog();
        cloneProperty(+propertyId!)
            .unwrap()
            .then((newPropertyId) =>
                router.push(`/property/edit/${newPropertyId}`)
            );
    };

    const handleDelete = () =>
        deleteProperty(+propertyId!).then(() => {
            router.push("/");
            removeTab(propertyId as string);
        });

    return (
        <>
            <ViewHeader
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClone={handleClone}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label={t("Overview")} {...a11yProps(0)} />
                    <Tab label={t("Map")} {...a11yProps(1)} />
                </Tabs>
            </ViewHeader>
            <Box height={"100%"}>
                <TabPanel value={value} index={0}>
                    <Suspense fallback={<span>Loading...</span>}>
                        <MainContainer />
                    </Suspense>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box height={"400px"} width={"100%"}>
                        <Map />
                    </Box>
                </TabPanel>
            </Box>
            <ConfirmationDialogBox
                open={cloneConfirmDialogOpen}
                onClose={closeCloneConfirmaionDialog}
                text={"Are you Sure You want to Clone This Property?"}
                onConfirm={handleCloneConfirmation}
                action={"clone"}
            />
        </>
    );
};

SingleProperty.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <UploadFileProvider>{page}</UploadFileProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default SingleProperty;
