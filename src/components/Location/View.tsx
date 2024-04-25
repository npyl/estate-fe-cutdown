import { Grid, List } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import { ILocation } from "src/types/location";

interface ViewLocationProps {
  location: ILocation;
}

interface CustomerProps {
  street: string;
  number: string;
  city: string;
}

const Customer = ({ street, number, city }: CustomerProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container>
        <Grid item xs={6} padding={0}>
          <List>
            <ListItem label={t("Street")} value={street || "-"} />

            <ListItem label={t("Number")} value={number || "-"} />
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          <List>
            <ListItem label={t("City")} value={city || "-"} />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

interface PropertyProps {
  location?: ILocation;
}

const Property = ({ location }: PropertyProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem label={t("Street")} value={location?.street || "-"} />

            <ListItem label={t("Number")} value={location?.number || "-"} />

            <ListItem label={t("City")} value={location?.city || "-"} />
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <List>
            <ListItem label={t("Zip Code")} value={location?.zipCode || "-"} />
            <ListItem label={t("Region")} value={location?.region || "-"} />
            <ListItem label={t("Country")} value={location?.country || "-"} />
            <ListItem
              label={t("Neighborhood")}
              value={location?.complex || "-"}
            />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export const ViewLocation = ({ location }: ViewLocationProps) => {
  const pathname = usePathname();
  const isProperty = useMemo(() => pathname.includes("property"), [pathname]);

  return isProperty ? (
    <Property location={location} />
  ) : (
    <Customer
      street={location?.street}
      number={location?.number}
      city={location?.city}
    />
  );
};
