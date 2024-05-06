import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "@/app/components/Header";
import SideDrawer from "@/app/components/Drawer";

const ComingSoonPage = () => {
  const [drawerClick, setDrawerClick] = useState("");
  const [sliderOpened, setSliderOpened] = useState(false);

  useEffect(() => {
    switch (drawerClick) {
      case "Home":
        {
          console.log("Home");
        }
        break;
      case "Chat":
        {
          console.log("Chat");
        }
        break;
      case "History":
        {
          console.log("History");
        }
        break;
      case "Top":
        {
          console.log("Top");
        }
        break;
      case "Replay":
        {
          console.log("Replay");
        }
        break;
      default:
        {
        }
        break;
    }
  }, [drawerClick]);
  return (
    <div className="flex">
      <Header
        setSliderOpened={setSliderOpened}
        setDrawerClick={setDrawerClick}
      ></Header>
      <SideDrawer
        setSliderOpened={setSliderOpened}
        setDrawerClick={setDrawerClick}
      ></SideDrawer>
      <Box className="flex justify-center items-center min-h-screen">
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Coming Soon
        </Typography>
      </Box>
    </div>
  );
};

export default ComingSoonPage;
