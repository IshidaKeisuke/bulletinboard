import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Container = styled("div")`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledBox = styled(Box)`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  padding: 4rem;
  margin: auto;
  width: 100%;
  max-width: 400px;
`;
