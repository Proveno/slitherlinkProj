"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import SideDrawer from "@/app/components/Drawer";

import { useState } from "react";
import PopUpFooter from "@/app/components/PopUpFooter";

import MainPart from "@/app/components/MainPart";

export default function Home() {
  const [sliderOpened, setSliderOpened] = useState(false);

  return (
    <div className="flex">
      <Header setSliderOpened={setSliderOpened}></Header>
      <SideDrawer
        sliderOpened={sliderOpened}
        setSliderOpened={setSliderOpened}
      ></SideDrawer>
      <div className="w-full h-screen relative top-0 pt-[72px] bg-zinc-900">
        <div className="bg-zinc-100 text-center pt-48 h-full text-black relative pb-[114px]">
          Contrast view
        </div>
        <PopUpFooter></PopUpFooter>
        <Footer></Footer>
      </div>
      <div className="pt-[72px] w-1/5 min-w-[14rem]">Comments</div>
    </div>
  );
}
