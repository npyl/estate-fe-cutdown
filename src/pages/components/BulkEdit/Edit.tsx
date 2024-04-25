import { Autocomplete, MenuItem } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAllCustomersQuery } from "src/services/customers";
import { useAllUsersQuery } from "src/services/user";
import {
    StyledOnlyNumbersInput,
    StyledTextField,
    StyledSelect,
} from "src/pages/components/BulkEditDrawer/style";
import { EditProps } from "./types";
import { DefaultOrEdit } from "./DefaultOrEdit";
import { useGlobals } from "src/hooks/useGlobals";

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    interface Fullnames {
        [key: string]: string;
    }

    const usersData = useAllUsersQuery().data || [];

    const fullnames: Fullnames = useMemo(
        () =>
            usersData
                ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                .reduce((acc, manager) => {
                    const fullname = `${manager.firstName} ${manager.lastName}`;
                    return { ...acc, [fullname]: `${manager.id}` };
                }, {}),
        [usersData]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        if (value === null) return;
        setData(fullnameToId(value) || "");
    };

    const fullnameToId = (fullname: string) => fullnames[fullname];
    const idToFullname = (id: string) =>
        Object.keys(fullnames).find((key) => fullnames[key] === id) || "";

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={() => setData("")}>
            <Autocomplete
                disablePortal
                value={idToFullname(data) || ""}
                onChange={autocompleteChange}
                options={Object.keys(fullnames)}
                renderInput={(params) => <StyledTextField {...params} />}
            />
        </DefaultOrEdit>
    );
};

export const EditOwner = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    interface Fullnames {
        [key: string]: string;
    }

    const usersData = useAllCustomersQuery().data || [];

    const fullnames: Fullnames = useMemo(
        () =>
            usersData
                ?.filter((manager) => manager.firstName && manager.lastName) // filter nulls
                .reduce((acc, manager) => {
                    const fullname = `${manager.firstName} ${manager.lastName}`;
                    return { ...acc, [fullname]: `${manager.id}` };
                }, {}),
        [usersData]
    );

    const autocompleteChange = (_event: any, value: string | null) => {
        if (value === null) return;
        setData(fullnameToId(value) || "");
    };

    const fullnameToId = (fullname: string) => fullnames[fullname];
    const idToFullname = (id: string) =>
        Object.keys(fullnames).find((key) => fullnames[key] === id) || "";

    return (
        <DefaultOrEdit label={t("Owner")} onDisable={() => setData("")}>
            <Autocomplete
                disablePortal
                value={idToFullname(data) || ""}
                onChange={autocompleteChange}
                options={Object.keys(fullnames)}
                renderInput={(params) => <StyledTextField {...params} />}
            />
        </DefaultOrEdit>
    );
};

export const EditZipCode = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Zip Code")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput
                label=""
                value={+data}
                onChange={(n) => setData(n.toString())}
            />
        </DefaultOrEdit>
    );
};

export const EditArea = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Area")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput
                label=""
                value={+data}
                onChange={(n) => setData(n.toString())}
                adornment="m²"
            />
        </DefaultOrEdit>
    );
};

export const EditBedrooms = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    return (
        <DefaultOrEdit label={t("Bedrooms")} onDisable={() => setData("")}>
            <StyledOnlyNumbersInput
                type="number"
                label=""
                placeholder="1,2,3..."
                value={+data}
                onChange={(n) => setData(n.toString())}
            />
        </DefaultOrEdit>
    );
};

export const EditState = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const enums = useGlobals();
    const stateEnum = enums?.property?.state || [];

    return (
        <DefaultOrEdit label={t("State")} onDisable={() => setData("")}>
            <StyledSelect
                value={data}
                onChange={(e) => setData(e.target.value as string)}
            >
                {stateEnum.map((item, index) => (
                    <MenuItem key={index} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </StyledSelect>
        </DefaultOrEdit>
    );
};
