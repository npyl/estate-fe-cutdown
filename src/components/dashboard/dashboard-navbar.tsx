import {
  AppBar,
  AppBarProps,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { useRef, useState } from "react";
import { Menu as MenuIcon } from "../../icons/menu";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { DashboardNavbarSearch } from "./dashboard-navbar-search";
import { LanguageButton } from "../Language/LanguageButton";
import { SettingsButton } from "../settings-button";
import { Logo } from "../logo";
import useResponsive from "@/hooks/useResponsive";

const StyledTypography = styled(Typography)`
  color: ${({ theme }) =>
    theme.palette.mode === "light"
      ? theme.palette.neutral![900]
      : theme.palette.grey[100]};
`;

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),

  position: "fixed", // Allow things to show on top of the AppBar
  zIndex: 2,
}));

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = () => setOpenPopover(true);
  const handleClosePopover = () => setOpenPopover(false);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;
  const belowMd = useResponsive("down", "md");

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: {
            lg: "100%",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            height: 64,
            left: 0,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            p={3}
            sx={{
              display: {
                xs: "none",
                md: "inherit",
              },
            }}
          >
            <Link href="/" sx={{ display: "flex", alignItems: "center" }}>
              <Logo
                sx={{
                  height: 40,
                  width: 40,
                  marginRight: 2, // Adds some spacing between the logo and the text
                }}
              />
              {/* nick ama to svhseis se gamhsa */}
              <StyledTypography variant="h5">
                PropertyPro v0.75
              </StyledTypography>
            </Link>
          </Box>

          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <DashboardNavbarSearch />
          <Stack direction={"row"}>
            {belowMd ? null : (
              <>
                <LanguageButton />
                <SettingsButton />
              </>
            )}
            <AccountButton />
          </Stack>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
