"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import SideDrawer from "@/app/components/Drawer";

import { useState } from "react";

export default function Home() {
  const [sliderOpened, setSliderOpened] = useState(false);

  return (
    <div>
      <Header setSliderOpened={setSliderOpened}></Header>
      <SideDrawer
        sliderOpened={sliderOpened}
        setSliderOpened={setSliderOpened}
      ></SideDrawer>
    </div>
  );
}
