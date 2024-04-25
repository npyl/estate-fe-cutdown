declare type Libraries = (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
)[];

export const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";
export const libraries = ["drawing", "places", "geometry"] as Libraries;
