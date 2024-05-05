"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      light: "#4A34AB",
      main: "#9296A8",
      dark: "#e1b712",
      contrastText: "#12",
    },
    secondary: {
      light: "#3b3b3b",
      main: "#6842FE",
      dark: "#18181b",
      contrastText: "#fff",
    },
  },
});

const darkTheme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
        light: "#4A34AB",
        main: "#9296A8",
        dark: "#e1b712",
        contrastText: "#12",
        },
        secondary: {
        light: "#3b3b3b",
        main: "#6842FE",
        dark: "#18181b",
        contrastText: "#fff",
        },
        mode: "dark",
    },
});


export default theme;
