import { FC } from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
    display: flex;
    font-size: 14px;
    border-top: 2px solid #dfe6ed;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 0px;
`;

interface FooterProps {
    children?: React.ReactNode;
    version: string;
}

const Footer: FC<FooterProps> = props => {
    return (
        <FooterStyle>
            <div className="version-label">{props.version}</div>
        </FooterStyle>
    );
};

export default Footer;
