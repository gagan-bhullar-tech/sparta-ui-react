import { ReactChild } from "react";
import MediaQuery from "react-responsive";

interface ResponsiveProps {
    children: ReactChild;
}

export const Mobile = ({ children }: ResponsiveProps) => {
    return <MediaQuery maxWidth={992}>{children}</MediaQuery>;
};

export const Desktop = ({ children }: ResponsiveProps) => {
    return <MediaQuery minWidth={993}>{children}</MediaQuery>;
};
