import { Button, Stack, SvgIconProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { DrawShape, ShapeData, StopDraw } from "./types";
import { drawShape, encodeShape, setShapeEvents } from "./util";

const StyledButton = styled(Button)({
    margin: "2px",
    padding: "3px 4px", // Reduced horizontal padding for a narrower look
    backgroundColor: "#dcdcdc", // Light gray background
    color: "#000",
    "& svg": {
        width: "24px", // A bit smaller icon size for a narrower button
        height: "24px",
    },
    "&:hover": {
        backgroundColor: "#c7c7c7", // Slightly darker gray for hover
    },
});

const SvgIcon = ({ children, ...props }: SvgIconProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
        {children}
    </svg>
);

interface DrawMultipleProps {
    map?: google.maps.Map;
    drawing: boolean;
    shapes?: ShapeData[];
    onDraw: (shape: DrawShape | StopDraw) => void;
    onShapeChange: (oldEncodedShape: string, newEncodedShape: string) => void;
}

export const DrawMultiple = ({
    map,
    drawing,
    shapes,
    onDraw,
    onShapeChange,
}: DrawMultipleProps) => {
    const drawingManagerRef = useRef<any>(null);
    const shapeRefs = useRef<(DrawShape | StopDraw)[]>([]);

    useEffect(() => {
        if (!map) {
            throw "Please DONT pass an undefined mapRef";
        }

        // Create a new instance of the DrawingManager
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYGON], // Customize the allowed drawing modes
            },

            polygonOptions: {
                // Customize polygon options
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            rectangleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
            circleOptions: {
                fillColor: "cyan",
                fillOpacity: 0.15,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
            },
        });

        // Set the map for the DrawingManager
        drawingManager.setMap(map);

        google.maps.event.addListener(
            drawingManager,
            "overlaycomplete",
            (event: google.maps.drawing.OverlayCompleteEvent) => {
                if (!event.overlay) return null;
                if (typeof event.overlay === typeof google.maps.Marker)
                    return null;

                const shape = event.overlay;
                shapeRefs.current?.push(shape as DrawShape);
                drawingManagerRef.current.setDrawingMode(null);

                /* catch drag/change events */
                const oldEncodedShape = encodeShape(shape as DrawShape);
                onShapeChange &&
                    setShapeEvents(shape as DrawShape, () =>
                        onShapeChange(
                            oldEncodedShape,
                            encodeShape(shape as DrawShape)
                        )
                    );

                onDraw(shape as DrawShape);
            }
        );

        // Store the reference to the DrawingManager
        drawingManagerRef.current = drawingManager;

        return () => {
            // Cleanup when the component unmounts
            drawingManagerRef.current = null;
            drawingManager.setMap(null);
        };
    }, [map]);

    useEffect(() => {
        if (!drawingManagerRef.current) return;
        if (!shapes) return;

        // clear map of any shape
        shapeRefs.current?.forEach((shape) => shape?.setMap(null));
        shapeRefs.current = [];

        // draw any imported shape
        shapes
            .filter((shape) => !!shape)
            .map((shape) =>
                shapeRefs.current?.push(
                    drawShape(shape, map!, !!drawing ? onShapeChange : null)
                )
            );
    }, [map, shapes]);

    const startDrawing = () =>
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.POLYGON
        );
    const startDrawingRect = () =>
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.RECTANGLE
        );
    const startDrawingCircle = () =>
        drawingManagerRef.current?.setDrawingMode(
            google.maps.drawing.OverlayType.CIRCLE
        );

    const stopDrawing = () => {
        shapeRefs.current?.forEach((shape) => shape?.setMap(null));
        shapeRefs.current = [];
        onDraw(null);
    };

    return drawing ? (
        <Stack
            style={{
                padding: 3,
                position: "absolute",
                left: 10,

                top: "15vh",
                backgroundColor: "rgba(255, 255, 255, 0.7)", // White background with opacity
                backdropFilter: "blur(10px)",
                borderRadius: "5px", // Soften the edges
            }}
        >
            <StyledButton onClick={startDrawing}>
                <SvgIcon>
                    <path
                        fill="currentColor"
                        d="M9.75 20.85c1.78-.7 1.39-2.63.49-3.85-.89-1.25-2.12-2.11-3.36-2.94A9.817 9.817 0 014.54 12c-.28-.33-.85-.94-.27-1.06.59-.12 1.61.46 2.13.68.91.38 1.81.82 2.65 1.34l1.01-1.7C8.5 10.23 6.5 9.32 4.64 9.05c-1.06-.16-2.18.06-2.54 1.21-.32.99.19 1.99.77 2.77 1.37 1.83 3.5 2.71 5.09 4.29.34.33.75.72.95 1.18.21.44.16.47-.31.47-1.24 0-2.79-.97-3.8-1.61l-1.01 1.7c1.53.94 4.09 2.41 5.96 1.79m11.09-15.6c.22-.22.22-.58 0-.79l-1.3-1.3a.562.562 0 00-.78 0l-1.02 1.02 2.08 2.08M11 10.92V13h2.08l6.15-6.15-2.08-2.08L11 10.92z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={startDrawingCircle}>
                <SvgIcon
                    sx={{
                        width: "10px",
                    }}
                >
                    <path
                        fill="currentColor"
                        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={startDrawingRect}>
                <SvgIcon>
                    <path
                        fill="currentColor"
                        d="M2 20V4h20v16H2Zm2-2h16V6H4v12Zm0 0V6v12Z"
                    />
                </SvgIcon>
            </StyledButton>

            <StyledButton onClick={stopDrawing}>
                <Typography fontSize={10}>Clear</Typography>
            </StyledButton>
        </Stack>
    ) : null;
};
