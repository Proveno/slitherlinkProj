"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Comments from "@/app/components/Comments";
import SideDrawer from "@/app/components/Drawer";

import {useEffect, useState} from "react";
import PopUpFooter from "@/app/components/PopUpFooter";
import {tokenInfo} from "@/lib/token";

export default function Home() {
    const [sliderOpened, setSliderOpened] = useState(false);
    const [commentOpened, setCommentOpened] = useState(true);
    const [search, setSearch] = useState("");

    const [drawerClick, setDrawerClick] = useState("");

    const [likeValue, setLikeValue] = useState();
    const [ratingValue, setRatingValue] = useState();
    const [contoll, setContoll] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const [isLogined, setIsLogined] = useState(false);
    const [theme, setTheme] = useState(false);

    const getData = async () => {
        try {
            var token = await tokenInfo();
            if (token._id) {
                setIsLogined(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        switch (drawerClick) {
            case "Home": {
                console.log("Home");
            }
                break;
            case "Chat": {
                setCommentOpened(true);
                setDrawerClick("");
            }
                break;
            case "History": {
                console.log("History");
            }
                break;
            case "Top": {
                console.log("Top");
            }
                break;
            case "Replay": {
                console.log("Replay");
            }
                break;
            default: {
            }
                break;
        }
    }, [drawerClick]);

    return (
        <div className="flex">
            <div className={`${fullscreen ? "hidden" : ""}`}>
                <Header
                    isLogined={isLogined}
                    setSliderOpened={setSliderOpened}
                    setSearch={setSearch}
                ></Header>
            </div>
            <SideDrawer
                sliderOpened={sliderOpened}
                setSliderOpened={setSliderOpened}
                setDrawerClick={setDrawerClick}
            ></SideDrawer>
            <div className="w-full h-screen relative top-0 pt-[72px] bg-zinc-900">
                <div className="bg-zinc-100 text-center pt-48 h-full text-black relative pb-[114px]">
                    Contrast view
                </div>
                <div
                    className={`${fullscreen ? "hidden" : ""} ${
                        isLogined ? "hidden" : ""
                    }`}
                >
                    <PopUpFooter></PopUpFooter>
                </div>
                {/* <div className={`${fullscreen ? "hidden" : ""}`}> */}
                <Footer
                    setLikeValue={setLikeValue}
                    setRatingValue={setRatingValue}
                    setContoll={setContoll}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                ></Footer>
                {/* </div> */}
            </div>
            <div
                className={`${commentOpened ? " " : "hidden"} ${
                    fullscreen ? "hidden" : ""
                } w-1/3 min-w-[14rem]`}
            >
                <Comments setCommentOpened={setCommentOpened}></Comments>
            </div>
        </div>
    );
}
