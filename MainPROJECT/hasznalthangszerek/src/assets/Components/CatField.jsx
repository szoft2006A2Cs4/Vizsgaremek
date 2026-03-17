import { useEffect } from "react";
import CatCard from "./CatCard";
import { HStack } from "@chakra-ui/react";
import axios from "../scripts/axios";

class CatsData {
  Name;
  ImgSRC;

  constructor(Name, ImgSRC) {
    this.Name = Name;
    this.ImgSRC = ImgSRC;
  }
}

const logos = [
  "https://res.cloudinary.com/dknhbvrq9/image/upload/v1773136331/keyboard-music_jjhdgz.svg",
  "https://res.cloudinary.com/dknhbvrq9/image/upload/v1773136330/audio-waveform_aad52k.svg",
  "https://res.cloudinary.com/dknhbvrq9/image/upload/v1773136331/wind_lfme2k.svg",
  "https://res.cloudinary.com/dknhbvrq9/image/upload/v1773136330/guitar_c8jrmj.svg",
  "https://res.cloudinary.com/dknhbvrq9/image/upload/v1773136330/drum_tf2az3.svg",
];

export default function catField({ cats }) {
  const catList = new Array();
  for (var c of cats) {
    catList.push(c);
  }

  const formedDataList =
    catList?.map((cat, i) => {
      return new CatsData(cat.split(" ")[0], logos[i]);
    }) || [];

  return (
    <HStack id="catField" paddingTop="11" paddingBottom="11">
      {formedDataList.map((cat, index) => {
        return <CatCard data={cat} key={cat.Name} index={index} />;
      })}
    </HStack>
  );
}
