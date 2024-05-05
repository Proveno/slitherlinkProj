"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Comments from "@/app/components/Comments";
import SideDrawer from "@/app/components/Drawer";

import { useEffect, useState } from "react";
import PopUpFooter from "@/app/components/PopUpFooter";
import { tokenInfo } from "@/lib/token";

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
      case "Home":
        {
          console.log("Home");
        }
        break;
      case "Chat":
        {
          setCommentOpened(true);
          setDrawerClick("");
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

  const [twoDArr, setTwoDArr] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [5, 5, 5, 5, 0],
    [5, 5, 5, 5, 5],
    [0, 0, 5, 5, 5],
  ]);

  const [userField, setUserField] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const [reload, setReload] = useState(false);

  console.table(userField);
  return (
    <div className="flex">
      <Header
        isLogined={isLogined}
        setSliderOpened={setSliderOpened}
        setSearch={setSearch}
      ></Header>
      <SideDrawer
        sliderOpened={sliderOpened}
        setSliderOpened={setSliderOpened}
        setDrawerClick={setDrawerClick}
      ></SideDrawer>
      <div className="w-full h-screen relative top-0 pt-[72px] bg-zinc-900">
        <div className="bg-zinc-100 text-center h-full text-black relative pb-[114px]">
          <div className={`bg-red-400 row-10 grid col-1 items-center `}>
            {twoDArr.map((rowArr, i) => {
              return (
                <>
                  <div className="bg-green-400 flex">
                    {rowArr.map((value, j) => {
                      return (
                        <>
                          <div className="w-8 h-8 bg-black"></div>
                          {rowArr.length - 1 !== j && (
                            <div
                              className={`w-8 h-8 ${
                                userField[i * 2][j] ? "bg-red-500" : " "
                              } cursor-pointer border border-black`}
                              onClick={(e) => {
                                var tmpArr = userField;
                                tmpArr[i * 2][j] = tmpArr[i * 2][j] ? 0 : 1;
                                setUserField(tmpArr);
                                setReload(!reload);
                              }}
                            ></div>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div className="bg-green-400 flex">
                    {rowArr.map((value, j) => {
                      return (
                        <>
                          <div
                            className={`w-8 h-8 ${
                              userField[i * 2 + 1][j] ? "bg-red-500" : " "
                            } cursor-pointer border border-black	`}
                            onClick={(e) => {
                              var tmpArr = userField;
                              tmpArr[i * 2 + 1][j] = tmpArr[i * 2 + 1][j]
                                ? 0
                                : 1;
                              setUserField(tmpArr);
                              setReload(!reload);
                            }}
                          ></div>
                          {rowArr.length - 1 !== j && (
                            <div className="w-8 h-8 bg-white"></div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
            <div className="bg-green-400 flex">
              {twoDArr[0].map((value, j) => {
                return (
                  <>
                    <div className="w-8 h-8 bg-black"></div>
                    {twoDArr[0].length - 1 !== j && (
                      <div
                        className={`w-8 h-8 ${
                          userField[twoDArr.length * 2][j] ? "bg-red-500" : " "
                        } cursor-pointer border border-black`}
                        onClick={(e) => {
                          var tmpArr = userField;
                          tmpArr[twoDArr.length * 2][j] = tmpArr[
                            twoDArr.length * 2
                          ][j]
                            ? 0
                            : 1;
                          setUserField(tmpArr);
                          setReload(!reload);
                        }}
                      ></div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
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
