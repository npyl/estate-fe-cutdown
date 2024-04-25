import { Box, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { Suspense, useState } from "react";

import TabPanel from "src/components/Tabs";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import ViewHeader from "./components/ViewHeader";

import "photoswipe/dist/photoswipe.css";

import { useTranslation } from "react-i18next";

import { Map, MainContainer } from "./tabs";
import { UploadFileProvider } from "src/contexts/uploadFile";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingleProperty: NextPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <>
      <ViewHeader onEdit={() => {}} onDelete={() => {}} onClone={() => {}}>
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
    </>
  );
};

SingleProperty.getLayout = (page) => (
  <DashboardLayout>
    <UploadFileProvider>{page}</UploadFileProvider>
  </DashboardLayout>
);

export default SingleProperty;
