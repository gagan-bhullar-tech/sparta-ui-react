import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../Common/Colors";
import { Desktop, Mobile } from "../../Common/Responsive";
import MobileNavLinks from "./MobileNavLinks";
import NavLinks from "./NavLinks";

export const NavType = {
    default: 0
};

const NavBarContainer = styled.div`
    display: flex;
    height: 60px;
    border-bottom: 2px solid ${Colors.lightGray};
    align-items: center;
    padding-top: 0.25rem;
    justify-content: space-between;
    width: 100%;
    background: white;
`;

const LeftSection = styled.div`
    display: flex;
    margin-left: 1rem;
    font-size: 2rem;
    color: #003e99;
`;

const RightSection = styled.div`
    display: flex;
    margin-right: 1rem;
`;

const NavBar: FC = () => {
return (
        <NavBarContainer id="nav-bar">
            <LeftSection>
                Sparta
            </LeftSection>
            <RightSection>
                <Desktop>
                    <NavLinks />
                </Desktop>
                <Mobile>
                    <MobileNavLinks />
                </Mobile>
            </RightSection>
        </NavBarContainer>
    );
};

export default NavBar;