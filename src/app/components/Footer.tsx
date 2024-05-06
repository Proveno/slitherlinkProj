import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { tokenInfo } from "@/lib/token";

const Footer = (props: any) => {
  const [like, setLike] = useState<string | null>();
  const handleLike = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setLike(newValue);
    props.setLikeValue(newValue);
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconEmpty": {
      borderColor: "#ff6d75", // Цвет обводки пустых значков
    },
  });
  const [playerId, setPlayerId] = useState<string>();

  const getData = async () => {
    try {
      var token = await tokenInfo();
      if (token._id) {
        setPlayerId(token._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <footer className="bg-[#1F2030] p-2 absolute bottom-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-end gap-1">
      <Rating
        name="simple-controlled"
        onChange={(event, newValue) => {
          fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Rating`, {
            method: "POST",
            body: JSON.stringify({
              player: playerId,
              game: "Slitherlink",
              rating: newValue,
            }),
          });
          props.setRatingValue(newValue);
        }}
      />

      <IconButton
        aria-label="fullscreen"
        onClick={(e) => {
          props.setFullscreen(!props.fullscreen);
        }}
      >
        <FullscreenIcon color="primary" />
      </IconButton>
    </footer>
  );
};
export default Footer;
