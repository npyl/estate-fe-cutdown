import React from "react";
import type { SVGProps } from "react";

export function Live(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M12 11.65a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 12.9a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0"></path>
                <path d="M12 7.65a5.25 5.25 0 0 0-3.712 8.962a.75.75 0 1 1-1.061 1.06a6.75 6.75 0 1 1 9.546 0a.75.75 0 0 1-1.06-1.06A5.25 5.25 0 0 0 12 7.649"></path>
                <path d="M12 3.75a9.15 9.15 0 0 0-6.47 15.62a.75.75 0 1 1-1.06 1.06a10.65 10.65 0 1 1 15.06 0a.75.75 0 0 1-1.06-1.06A9.15 9.15 0 0 0 12 3.75"></path>
            </g>
        </svg>
    );
}
