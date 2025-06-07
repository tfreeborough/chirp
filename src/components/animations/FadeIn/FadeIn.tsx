import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface FadeInProps {
    delay?: number;
}

export const FadeIn = ({
    delay = 0,
    children,
}: PropsWithChildren<FadeInProps>) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                duration: 0.5,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};
