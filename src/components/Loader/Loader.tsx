import { Box, CircularProgress, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <CircularProgress size={64} sx={{ color: theme.palette.primary.main }} />
    </Box>
  );
};

export default Loader;
