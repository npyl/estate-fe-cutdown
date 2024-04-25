import { MenuItem } from "@mui/material";
import { StyledOutlinedInput } from "src/pages/components/BulkEditDrawer/style";

import { Checkbox, Select, SelectChangeEvent } from "@mui/material";
import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { EditProps } from "./types";
import { DefaultOrEdit } from "./DefaultOrEdit";

type Variant = "property" | "customer";

interface EditLabelsProps extends EditProps<number[]> {
    variant: Variant;
}

export const EditLabels = ({ variant, data, setData }: EditLabelsProps) => {
    const { data: allLabels } = useGetLabelsQuery();
    const labelOptions =
        variant === "property"
            ? allLabels?.propertyLabels
            : allLabels?.customerLabels;

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        setData(value as number[]);
    };

    const nameForId = (id: number) =>
        labelOptions?.find((option) => option.id === id)?.name;

    const renderValue = (selected: number[]) =>
        selected.map((id) => nameForId(id)).join(", ");

    if (!labelOptions) return null;

    return (
        <DefaultOrEdit label="Add Labels" onDisable={() => setData([])}>
            <Select
                multiple
                value={data}
                onChange={handleChange}
                renderValue={renderValue}
                input={<StyledOutlinedInput />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {labelOptions.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            <Checkbox checked={data.indexOf(option.id!) > -1} />
                            <Label color={option.color} name={option.name} />
                        </MenuItem>
                    );
                })}
            </Select>
        </DefaultOrEdit>
    );
};
