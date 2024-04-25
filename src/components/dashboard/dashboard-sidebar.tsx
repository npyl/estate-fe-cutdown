import {
  Box,
  Drawer,
  Link,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TFunction } from "i18next";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Home as HomeIcon } from "../../icons/home";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import { useRouter } from "next/router";
import { LanguageButton } from "../Language/LanguageButton";
import { SettingsButton } from "../settings-button";
import useResponsive from "@/hooks/useResponsive";

interface DashboardSidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  adminOnly?: boolean;
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t("main"),
    items: [
      {
        title: t("Properties"),
        path: "/property",
        icon: <HomeIcon fontSize="small" />,
      },
    ],
  },
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
    noSsr: true,
  });

  const sections = useMemo(() => getSections(t), [t]);

  const organizationsRef = useRef<HTMLButtonElement | null>(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState<boolean>(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleCloseOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(false);
  };

  const belowMd = useResponsive("down", "md");

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "background.default",
            }}
          >
            {sections.map((section, index) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
            {belowMd ? (
              <Stack direction="row" justifyContent="center">
                <LanguageButton />
                <SettingsButton />
              </Stack>
            ) : null}
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            display: "absolute",
            top: "64px",
            backgroundColor: "#FFF",
            border: 0,
            color: "#FFFFFF",
            width: 200,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          paddingTop: !open ? "100px" : 0,
          width: 200,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {open && (
        <Stack p={2} alignItems="center">
          <Link href="/">
            <Typography variant="h5">PropertyPro</Typography>
          </Link>
        </Stack>
      )}
      {content}
    </Drawer>
  );
};
