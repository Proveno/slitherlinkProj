"use client";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenInfo } from "@/lib/token";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LinearProgress from "@mui/material/LinearProgress";

export default function PlayerTop() {
  const router = useRouter();
  const [t, setT] = useState<any>();

  const [players, setPlayers] = useState<any>();
  const [scores, setScores] = useState<any>();

  function countSumOfPoint(i: number) {
    var sum = 0;
    scores[i].map((score: number) => {
      sum += score;
    });
    return sum;
  }
  const getData = async () => {
    try {
      var token = await tokenInfo();
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Player`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then(async (resData) => {
          const { data } = resData;

          const promisedData = await Promise.all(
            data.map(async (player: any) => {
              const ress = await fetch(
                `${
                  process.env.NEXT_PUBLIC_API_HOST
                }/Score?game=${"Slitherlink"}&player=${player._id}`,
                {
                  method: "GET",
                }
              );
              const { data } = await ress.json();
              return data.map((score: any) => {
                return score.points;
              });
            })
          );
          setScores(promisedData);
          setPlayers(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="h-screen w-full overflow-auto p-4">
        <div className=" pt-24 md:py-8 w-full grid grid-cols-1 justify-items-center gap-4">
          <div className="w-full bg-dark shadow-lg p-5 rounded-lg border-t-4 border-yellow">
            <div className="bg-lightDark mt-5 rounded-md overflow-auto">
              {players ? (
                <>
                  <div className="bg-[#6842FE] font-bold  flex rounded-t-md py-4 justify-between min-w-[36rem] bg-fixed">
                    <div
                      className={`min-w-[12rem]  w-full text-center bg-yellow`}
                    >
                      Player
                    </div>
                    <div
                      className={`min-w-[12rem]  w-full text-center bg-yellow`}
                    >
                      Game
                    </div>
                    <div
                      className={`min-w-[12rem]  w-full text-center bg-yellow`}
                    >
                      Points
                    </div>
                  </div>
                  {players.map((moder: any, i: number) => {
                    return (
                      <div key={"MAINCONTAINER_" + moder._id}>
                        {/* rowDividerWide */}
                        <div
                          key={"rowDividerWide_" + i}
                          className="hidden md:flex w-full bg-[#6842FE]  min-w-[36rem] h-[2px]"
                        ></div>

                        {/* computer Info view */}
                        <div
                          key={"rowContainerWide_" + i}
                          className="hidden md:flex py-2 w-full justify-between divide-x-2 divide-yellow"
                        >
                          <div
                            key={"rowNameValueWide_" + i}
                            className="min-w-[12rem]  w-full py-2 text-center overflow-auto px-1"
                          >
                            {moder.username}
                          </div>
                          <div
                            key={"rowCreatorValueWide_" + i}
                            className="min-w-[12rem]  w-full py-2 text-center overflow-auto px-1"
                          >
                            {"Slitherlink"}
                          </div>
                          <div
                            key={"rowIsAvailableValueWide_" + i}
                            className="min-w-[12rem]  w-full py-2 text-center overflow-auto px-1"
                          >
                            {scores[i].length > 0 ? countSumOfPoint(i) : "-"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div>
                  <LinearProgress color="primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
