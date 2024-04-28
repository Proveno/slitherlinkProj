"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import SideDrawer from "@/app/components/Drawer";

import {useState} from "react";
import PopUpFooter from "@/app/components/PopUpFooter";

export default function Home() {
    const [sliderOpened, setSliderOpened] = useState(false);

    return (
        <div>

            <Header setSliderOpened={setSliderOpened}></Header>
            <PopUpFooter></PopUpFooter>
            <Footer></Footer>
            <SideDrawer
                sliderOpened={sliderOpened}
                setSliderOpened={setSliderOpened}
            ></SideDrawer>
        </div>
    );
}
