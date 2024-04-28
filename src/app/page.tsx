"use client";
import Image from "next/image";
import Header from "@/app/components/Header";
import { useState } from "react";

export default function Home() {
  const [sliderOpened, setSliderOpened] = useState(false);

  return <Header setSliderOpened={setSliderOpened}></Header>;
}
