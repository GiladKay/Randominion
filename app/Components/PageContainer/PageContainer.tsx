import { Stack, styled } from "@mui/material";

export const PageContainer = styled(Stack)({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minWidth: "300px",
  gap: "10px",
  overflowY: "auto",
  marginTop: '50px',
//   height: "calc(100vh - 50px)",
  padding: "8px",
});
