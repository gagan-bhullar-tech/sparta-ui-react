import { FC, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Colors } from "../../Common/Colors";
import MenuToggle from "./MenuToggle";

const NavLinksContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const LinksWrapper = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    height: 100%;
    list-style: none;
    background-color: white;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0px;
    width: 100%;
    z-index: 10000;
`;

const LinkItem = styled.li`
    padding: 0.5em 0.3em;
    font-size: 1.5rem;
    color: #222;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid ${Colors.lightGray};
    transition: all 220ms ease-in-out;
`;

const ALink = styled.a`
    text-decoration: none;
    color: inherit;
    font-size: inherit;
`;

const ButtonsContainer = styled.li`
    padding: 0.5em 0.3em;
    font-size: 1.5rem;
    color: #222;
    display: flex;
    transition: all 220ms ease-in-out;
    justify-content: center;
`;

const Button = styled.button`
    font-size: 1.1rem;
    border: 2px solid #bdd4f0;
`;

const MobileNavLinks: FC = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <NavLinksContainer>
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {isOpen && (
                <LinksWrapper>
                    <LinkItem>
                        <Button
                            className="btn btn-primary"
                            onClick={() => {
                                
                            }}
                        >
                            Capital
                        </Button>
                    </LinkItem>
                </LinksWrapper>
            )}
        </NavLinksContainer>
    );
};

export default MobileNavLinks;
