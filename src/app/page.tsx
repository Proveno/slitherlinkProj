"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Comments from "@/app/components/Comments";
import SideDrawer from "@/app/lib/Drawer";

import {useState} from "react";
import PopUpFooter from "@/app/components/PopUpFooter";


export default function Home() {
    const [sliderOpened, setSliderOpened] = useState(false);
    const [search, setSearch] = useState("");

    const [drawerClick, setDrawerClick] = useState("");

    const [likeValue, setLikeValue] = useState();
    const [favoriteValue, setFavoriteValue] = useState(false);
    const [control, setControl] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [theme, setTheme] = useState(false);




    return (
        <div className="flex">
            <Header setSliderOpened={setSliderOpened} setSearch={setSearch}></Header>
            <SideDrawer
                sliderOpened={sliderOpened}
                setSliderOpened={setSliderOpened}
                setDrawerClick={setDrawerClick}
            ></SideDrawer>
            <div className="w-full h-screen relative top-0 pt-[72px] bg-zinc-900">
                <div className="bg-zinc-100 text-center pt-48 h-full text-black relative pb-[114px]">
                    Contrast view
                </div>
                <PopUpFooter></PopUpFooter>
                <Footer
                    setLikeValue={setLikeValue}
                    setFavoriteValue={setFavoriteValue}
                    setContoll={setControl}
                    setFullscreen={setFullscreen}
                ></Footer>
            </div>
            <div className=" w-1/3 min-w-[14rem]">
                <Comments></Comments>
            </div>
        </div>
    );
}
