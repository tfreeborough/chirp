interface LoadingProps {
    size?: number;
    style?: "normal" | "tadpole";
}

export const Loading = ({ size = 24, style = "normal" }: LoadingProps) => {
    if (style === "tadpole") {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ccc"
            >
                <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        );
    }
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 24 24`}
            xmlns="http://www.w3.org/2000/svg"
            fill="#ccc"
        >
            <rect x="1" y="1" width="7.33" height="7.33">
                <animate
                    id="spinner_oJFS"
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="0;spinner_5T1J.end+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="8.33" y="1" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="1" y="8.33" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.1s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="15.66" y="1" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="8.33" y="8.33" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="1" y="15.66" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="x"
                    dur="0.6s"
                    values="1;4;1"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.2s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="15.66" y="8.33" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="y"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="8.33" y="15.66" width="7.33" height="7.33">
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="x"
                    dur="0.6s"
                    values="8.33;11.33;8.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.3s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
            <rect x="15.66" y="15.66" width="7.33" height="7.33">
                <animate
                    id="spinner_5T1J"
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="x"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="y"
                    dur="0.6s"
                    values="15.66;18.66;15.66"
                />
                <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="width"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
                <animate
                    begin="spinner_oJFS.begin+0.4s"
                    attributeName="height"
                    dur="0.6s"
                    values="7.33;1.33;7.33"
                />
            </rect>
        </svg>
    );
};
