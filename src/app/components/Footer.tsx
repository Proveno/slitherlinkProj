import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
import { useState } from "react";

const Footer = (props: any) => {
  const [like, setLike] = useState<string | null>();

  const handleLike = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setLike(newValue);
  };

  return (
    <footer className="bg-[#1F2030] p-2 absolute bottom-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-end gap-1">
      <ToggleButtonGroup
        value={like}
        exclusive
        onChange={handleLike}
        aria-label="text alignment"
      >
        {/* like */}
        <ToggleButton value="like" aria-label="left aligned">
          <div className="flex">
            {like === "like" ? (
              <ThumbUpIcon color="secondary" />
            ) : (
              <ThumbUpOutlinedIcon color="primary" />
            )}

            <div className="p-1 text-xs text-white">123321</div>
          </div>
        </ToggleButton>
        {/* dislike */}
        <ToggleButton value="dislike" aria-label="centered">
          <div className="flex">
            {like === "dislike" ? (
              <ThumbDownIcon color="secondary" />
            ) : (
              <ThumbDownOutlinedIcon color="primary" />
            )}

            <div className="p-1 text-xs text-white">123321</div>
          </div>
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Favorite */}
      <Checkbox
        icon={<FavoriteBorder color="primary" />}
        checkedIcon={<Favorite color="secondary" />}
      />
      {/* Feedback */}
      <div className="flex">
        <IconButton aria-label="feedback">
          <FeedbackOutlinedIcon color="primary" />
        </IconButton>
        <div className="py-2">Feedback</div>
      </div>

      {/* Gamepad */}
      <IconButton aria-label="gamepad">
        <GamepadOutlinedIcon color="primary" />
      </IconButton>
      {/* fullscreen */}
      <IconButton aria-label="fullscreen">
        <FullscreenIcon color="primary" />
      </IconButton>
    </footer>
  );
};
export default Footer;
