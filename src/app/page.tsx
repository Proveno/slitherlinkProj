"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Comments from "@/app/components/Comments";
import SideDrawer from "@/app/components/Drawer";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import PopUpFooter from "@/app/components/PopUpFooter";
import { tokenInfo } from "@/lib/token";
import { generateGame } from "@/lib/Game/Slitherlink";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PlayerTop from "@/app/components/PlayerTop";

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
  const [isBorderShown, setIsBorderShown] = useState(false);

  const [twoDArr, setTwoDArr] = useState<any>();
  const [numbersArr, setNumbersArr] = useState<any>();

  const [userField, setUserField] = useState<any>();

  const [reload, setReload] = useState(false);
  const [isPlayerTopOpened, setIsPlayerTopOpened] = useState<boolean>(false);
  const [isSimilarValue, setIsSimilarValue] = useState<boolean>();
  const [playerId, setPlayerId] = useState<string>();

  const [open, setOpen] = useState(false);
  const handleClose = (value: string) => {
    setOpen(false);
    const generatedGame = generateGame(9, 9);
    setTwoDArr(generatedGame.pointsField);
    setNumbersArr(generatedGame.userField);
    var arrTmp = [];
    for (let i = 0; i < 9; i++) {
      var rowTmpArr = [];
      var rowTmpArr2 = [];
      for (let j = 0; j < 9; j++) {
        rowTmpArr.push(0);
        rowTmpArr2.push(0);
      }
      rowTmpArr2.push(0);

      arrTmp.push(rowTmpArr);
      arrTmp.push(rowTmpArr2);
    }
    var rowTmpArr = [];
    for (let j = 0; j < 9; j++) {
      rowTmpArr.push(0);
    }
    arrTmp.push(rowTmpArr);
    setUserField(arrTmp);

    setSize(9);
    setIsBorderShown(false);
  };
  function SimpleDialog(props: any) {
    const { onClose, open } = props;
    const handleClose = () => {
      onClose();
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="w-full rounded-md border-yellow border-2 bg-dark">
          <DialogTitle color={"secondary"}>{"Your result"}</DialogTitle>

          <div
            className="w-full flex justify-center p-4"
            key={"OpenedPreViewQRCodeValue"}
          >
            {isSimilarValue ? "Nice job!" : "Ur an idiot 🙉"}
          </div>
        </div>
      </Dialog>
    );
  }

  const getData = async () => {
    try {
      var token = await tokenInfo();
      if (token._id) {
        setIsLogined(true);
        setPlayerId(token._id);
      }

      const generatedGame = generateGame(9, 9);
      setTwoDArr(generatedGame.pointsField);
      setNumbersArr(generatedGame.userField);
      var arrTmp = [];
      for (let i = 0; i < 9; i++) {
        var rowTmpArr = [];
        var rowTmpArr2 = [];
        for (let j = 0; j < 9; j++) {
          rowTmpArr.push(0);
          rowTmpArr2.push(0);
        }
        rowTmpArr2.push(0);

        arrTmp.push(rowTmpArr);
        arrTmp.push(rowTmpArr2);
      }
      var rowTmpArr = [];
      for (let j = 0; j < 9; j++) {
        rowTmpArr.push(0);
      }
      arrTmp.push(rowTmpArr);
      setUserField(arrTmp);
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
          setIsPlayerTopOpened(!isPlayerTopOpened);
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

  const [size, setSize] = useState<number>(9);
  const handleSize = (
    event: React.MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    if (newValue) {
      const generatedGame = generateGame(newValue, newValue);
      setTwoDArr(generatedGame.pointsField);
      setNumbersArr(generatedGame.userField);
      var arrTmp = [];
      for (let i = 0; i < newValue; i++) {
        var rowTmpArr = [];
        var rowTmpArr2 = [];
        for (let j = 0; j < newValue; j++) {
          rowTmpArr.push(0);
          rowTmpArr2.push(0);
        }
        rowTmpArr2.push(0);

        arrTmp.push(rowTmpArr);
        arrTmp.push(rowTmpArr2);
      }
      var rowTmpArr = [];
      for (let j = 0; j < newValue; j++) {
        rowTmpArr.push(0);
      }
      arrTmp.push(rowTmpArr);
      setUserField(arrTmp);

      setSize(newValue);
    }
  };

  return (
    <div className="flex">
      {<SimpleDialog open={open} onClose={handleClose} />}
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
        <div className="bg-zinc-100 text-center h-full text-black relative pb-[114px] overflow-auto">
          {isPlayerTopOpened ? (
            <PlayerTop />
          ) : (
            <>
              {twoDArr && (
                <div className={`row-10 grid col-1 place-items-center	pt-48 `}>
                  <div className="mb-4">
                    <ToggleButtonGroup
                      value={size}
                      exclusive
                      onChange={handleSize}
                      aria-label="text alignment"
                    >
                      <ToggleButton value={9} aria-label="left aligned">
                        <div className="flex">
                          <div className="p-1 w-14 text-xs">9x9</div>
                        </div>
                      </ToggleButton>
                      <ToggleButton value={15} aria-label="left aligned">
                        <div className="flex">
                          <div className="p-1 w-14 text-xs ">15x15</div>
                        </div>
                      </ToggleButton>
                      <ToggleButton value={30} aria-label="left aligned">
                        <div className="flex">
                          <div className="p-1 w-14 text-xs ">30x30</div>
                        </div>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>

                  {twoDArr.map((rowArr: any, i: number) => {
                    return (
                      <>
                        <div className="flex">
                          {rowArr.map((value: number, j: number) => {
                            return (
                              <>
                                <div
                                  className={`${
                                    isBorderShown
                                      ? value === 5
                                        ? "bg-green-400 "
                                        : "bg-white"
                                      : ""
                                  } w-2 h-2`}
                                ></div>
                                {rowArr.length - 1 !== j && (
                                  <div
                                    className={`w-8 h-2 ${
                                      userField[i * 2][j] ? "bg-red-500" : " "
                                    } cursor-pointer border border-black`}
                                    onClick={(e) => {
                                      var tmpArr = userField;
                                      tmpArr[i * 2][j] = tmpArr[i * 2][j]
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

                        {twoDArr.length - 1 !== i && (
                          <div className="flex">
                            {rowArr.map((value: number, j: number) => {
                              return (
                                <>
                                  <div
                                    className={`w-2 h-8 ${
                                      userField[i * 2 + 1][j]
                                        ? "bg-red-500"
                                        : " "
                                    } cursor-pointer border border-black	`}
                                    onClick={(e) => {
                                      var tmpArr = userField;
                                      tmpArr[i * 2 + 1][j] = tmpArr[i * 2 + 1][
                                        j
                                      ]
                                        ? 0
                                        : 1;
                                      setUserField(tmpArr);
                                      setReload(!reload);
                                    }}
                                  ></div>
                                  {rowArr.length - 1 !== j && (
                                    <div className="w-8 h-8 bg-white">
                                      {numbersArr[i][j]}
                                    </div>
                                  )}
                                </>
                              );
                            })}
                          </div>
                        )}
                      </>
                    );
                  })}
                  <div className="flex mt-4 gap-4">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => {
                        setIsBorderShown(!isBorderShown);
                      }}
                    >
                      {isBorderShown ? "Hide border" : "Show border"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={async (e) => {
                        var tmpArr: any = [];
                        for (let i = 0; i < twoDArr.length; i++) {
                          var rowTmpArr = [];
                          for (let j = 0; j < twoDArr[0].length; j++) {
                            rowTmpArr.push(0);
                          }
                          tmpArr.push(rowTmpArr);
                        }
                        twoDArr.map((rowArr: any, i: number) => {
                          rowArr.map((value: number, j: number) => {
                            if (rowArr.length - 1 !== j) {
                              if (userField[i * 2][j]) {
                                tmpArr[i][j] = 5;
                                tmpArr[i][j + 1] = 5;
                              }
                            }
                          });
                          if (twoDArr.length - 1 !== i) {
                            rowArr.map((value: number, j: number) => {
                              if (userField[i * 2 + 1][j]) {
                                tmpArr[i][j] = 5;
                                tmpArr[i + 1][j] = 5;
                              }
                            });
                          }
                        });
                        var isSimilar = true;
                        twoDArr.map((rowArr: any, i: number) => {
                          rowArr.map((value: number, j: number) => {
                            if (tmpArr[i][j] !== value) {
                              isSimilar = false;
                            }
                          });
                        });
                        setIsSimilarValue(isSimilar);
                        if (isSimilar && isLogined) {
                          fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Score`, {
                            method: "POST",
                            body: JSON.stringify({
                              player: playerId,
                              game: "Slitherlink",
                              points: tmpArr.length - 1,
                            }),
                          });
                        }
                        setOpen(true);
                      }}
                    >
                      Check
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={async (e) => {
                        const generatedGame = generateGame(size, size);
                        setTwoDArr(generatedGame.pointsField);
                        setNumbersArr(generatedGame.userField);
                        var arrTmp = [];
                        for (let i = 0; i < size; i++) {
                          var rowTmpArr = [];
                          var rowTmpArr2 = [];
                          for (let j = 0; j < size; j++) {
                            rowTmpArr.push(0);
                            rowTmpArr2.push(0);
                          }
                          rowTmpArr2.push(0);

                          arrTmp.push(rowTmpArr);
                          arrTmp.push(rowTmpArr2);
                        }
                        var rowTmpArr = [];
                        for (let j = 0; j < size; j++) {
                          rowTmpArr.push(0);
                        }
                        arrTmp.push(rowTmpArr);
                        setUserField(arrTmp);

                        setIsBorderShown(false);
                      }}
                    >
                      Restart
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
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
