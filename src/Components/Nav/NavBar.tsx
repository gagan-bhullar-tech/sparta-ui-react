import { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Paths } from "../../Common/AppRoutes";
import { Colors } from "../../Common/Colors";
import { Desktop, Mobile } from "../../Common/Responsive";
import MobileNavLinks from "./MobileNavLinks";
import NavLinks from "./NavLinks";

export const NavType = {
  default: 0,
};

const NavBarContainer = styled.div`
  display: flex;
  height: 60px;
  border-bottom: 2px solid ${Colors.lightestPrimaryColor};
  align-items: center;
  padding-top: 0.25rem;
  justify-content: space-between;
  width: 100%;
  background: white;
  margin-bottom: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  margin-left: 1rem;
  font-size: 2rem;
  cursor: pointer;
  color: #003e99;
`;

const RightSection = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <NavBarContainer id="nav-bar">
      <LeftSection onClick={() => navigate(Paths.landing)}>Sparta</LeftSection>
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
