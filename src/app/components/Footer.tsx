import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import GamepadOutlinedIcon from "@mui/icons-material/GamepadOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Rating from "@mui/material/Rating";
import React, {useState} from "react";

const Footer = (props: any) => {
    const [like, setLike] = useState<string | null>();

    const handleLike = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        setLike(newValue);
        props.setLikeValue(newValue);
    };

    return (
        <footer
            className="bg-[--main-color] p-2 absolute bottom-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-end gap-1">
            <ToggleButtonGroup
                value={like}
                exclusive
                onChange={handleLike}
                aria-label="text alignment"
            >
                {/* like */}
                <ToggleButton value="like" aria-label="left aligned" sx={{border: 0}}>
                    <div className="flex">
                        {like === "like" ? (
                            <ThumbUpIcon color="secondary"/>
                        ) : (
                            <ThumbUpOutlinedIcon color="primary"/>
                        )}
                        <div className="p-1 text-xs text-[--text-color]">123321</div>
                    </div>
                </ToggleButton>
                {/* dislike */}
                <ToggleButton value="dislike" aria-label="centered" sx={{border: 0}}>
                    <div className="flex">
                        {like === "dislike" ? (
                            <ThumbDownIcon color="secondary"/>
                        ) : (
                            <ThumbDownOutlinedIcon color="primary"/>
                        )}

                        <div className="p-1 text-xs text-[--text-color]">123321</div>
                    </div>
                </ToggleButton>
            </ToggleButtonGroup>

            {/* Favorite */}
            <Checkbox
                onChange={(e) => {
                    props.setFavoriteValue(e.target.checked);
                }}
                icon={<FavoriteBorder color="primary"/>}
                checkedIcon={<Favorite color="secondary"/>}
            />
            {/* Feedback */}
            <div className="flex">
                <IconButton aria-label="feedback">
                    <FeedbackOutlinedIcon color="primary"/>
                </IconButton>
                <div className="py-2 text-[--text-color]">Feedback</div>
            </div>

      <Rating
        name="simple-controlled"
        onChange={(event, newValue) => {
          props.setRatingValue(newValue);
        }}
      />
      {/* Favorite */}
      {/* <Checkbox
        onChange={(e) => {
          props.setFavoriteValue(e.target.checked);
        }}
        icon={<FavoriteBorder color="primary" />}
        checkedIcon={<Favorite color="secondary" />}
      /> */}
      {/* Feedback */}
      <div className="flex">
        <IconButton aria-label="feedback">
          <FeedbackOutlinedIcon color="primary" />
        </IconButton>
        <div className="py-2">Feedback</div>
      </div>

      {/* Gamepad */}
      <IconButton
        aria-label="gamepad"
        onClick={(e) => {
          props.setContoll("Click");
        }}
      >
        <GamepadOutlinedIcon color="primary" />
      </IconButton>
      {/* fullscreen */}
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
