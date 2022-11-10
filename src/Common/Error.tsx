import { FC } from "react";
import styled from "styled-components";

const ErrorStyle = styled.div`
  color: red;
  font-size: 14px;
  padding-left: 0px;
`;

const Error: FC<{ children: any }> = (props) => {
  return <ErrorStyle>{props?.children}</ErrorStyle>;
};

export default Error;
