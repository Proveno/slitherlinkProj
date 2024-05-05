import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
 import HistoryIcon from "@mui/icons-material/History";
 import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
 import ReplayIcon from "@mui/icons-material/Replay";
 import ChatIcon from "@mui/icons-material/Chat";

 export default function SideDrawer(parameters: any) {
   return (
    <Drawer
      open={parameters.sliderOpened}
      onClose={() => {
        parameters.setSliderOpened(false);
      }}
    >
      <div className="w-14 bg-[#1F2030] text-[#a1a1aa] h-screen text-center">
        {/* Close */}
        <div className="h-[72px] py-4">
          <IconButton
            aria-label="close"
            onClick={(e) => {
              parameters.setSliderOpened(false);
            }}
          >
            <CloseIcon color="primary" />
           </IconButton>
         </div>
         {/* Home */}
         <div
           className="h-[72px] py-4"
           onClick={(e) => {
             parameters.setDrawerClick("Home");
             parameters.setSliderOpened(false);
           }}
         >
           <IconButton aria-label="home">
             <HomeIcon color="primary" />
           </IconButton>
         </div>
         {/* Chat */}
         <div className="h-[72px] py-4">
           <IconButton
             aria-label="home"
             onClick={(e) => {
               parameters.setDrawerClick("Chat");
               parameters.setSliderOpened(false);
             }}
           >
             <ChatIcon color="primary" />
           </IconButton>
         </div>

         {/* history */}
         <div className="h-[72px] py-4">
           <IconButton
             aria-label="home"
             onClick={(e) => {
               parameters.setDrawerClick("History");
               parameters.setSliderOpened(false);
             }}
           >
             <HistoryIcon color="primary" />
           </IconButton>
         </div>

         {/* top */}
         <div className="h-[72px] py-4">
           <IconButton
             aria-label="home"
             onClick={(e) => {
               parameters.setDrawerClick("Top");
               parameters.setSliderOpened(false);
             }}
           >
             <LocalFireDepartmentIcon color="primary" />
           </IconButton>
         </div>

         {/* replay */}
         <div className="h-[72px] py-4">
           <IconButton
             aria-label="home"
             onClick={(e) => {
               parameters.setDrawerClick("Replay");
               parameters.setSliderOpened(false);
             }}
           >
             <ReplayIcon color="primary" />
           </IconButton>
         </div>
      </div>
    </Drawer>
  );
}