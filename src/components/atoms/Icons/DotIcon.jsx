import React from "react";

const DotIcon = (props) => {
    const { color } = props;
    return (
        <svg
            x="0px"
            y="0px"
            fill={color}
            width="10px"
            height="10px"
            viewBox="0 0 122.88 122.88"
            enable-background="new 0 0 122.88 122.88"
        >
            <g>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"
                />
            </g>
        </svg>
    );
};

export default DotIcon;
