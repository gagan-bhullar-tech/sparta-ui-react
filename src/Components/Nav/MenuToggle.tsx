import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import styled from "styled-components";

const Button = styled.div`
    z-index: 90;
    cursor: pointer;
`;

const transition = { duration: 0.3 };

interface MenuToggleProps {
    toggle: MouseEventHandler<HTMLDivElement>;
    isOpen: boolean;
}

const MenuToggle = (props: MenuToggleProps) => {
    return (
        <Button onClick={props.toggle}>
            <svg className="menu-icon" width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    animate={props.isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5", stroke: "hsl(0, 0%, 18%)" },
                        open: { d: "M 3 16.5 L 17 2.5", stroke: "hsl(0, 0%, 18%)" }
                    }}
                    transition={transition}
                />
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M 2 9.423 L 20 9.423"
                    stroke="hsl(0, 0%, 18%)"
                    animate={props.isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 }
                    }}
                    transition={transition}
                />
                <motion.path
                    fill="transparent"
                    strokeLinecap="round"
                    strokeWidth="3"
                    animate={props.isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346", stroke: "hsl(0, 0%, 18%)" },
                        open: { d: "M 3 2.5 L 17 16.346", stroke: "hsl(0, 0%, 18%)" }
                    }}
                    transition={transition}
                />
            </svg>
        </Button>
    );
};

export default MenuToggle;
