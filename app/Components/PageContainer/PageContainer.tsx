import { Stack, styled } from "@mui/material";

export const PageContainer = styled(Stack)({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "300px",
  gap: "10px",
  overflowY: "auto",
  marginTop: '50px',
  boxSizing: 'border-box'
});
