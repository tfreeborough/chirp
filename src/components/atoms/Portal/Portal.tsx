import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    target: Element;
}

export const Portal = ({
    children,
    target,
}: PropsWithChildren<PortalProps>) => {
    return createPortal(children, target);
};
