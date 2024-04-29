import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const Comments = (props: any) => {
  return (
    <div className="w-full pt-[72px] h-screen relative right-0 bg-[#0C0D14]">
      <div className="bg-[#28224F] p-2 flex justify-between">
        <div className="text-[#bfc2cf] p-2">Comments</div>
        <div className="">
          <IconButton aria-label="3Dots">
            <MoreVertIcon color="primary" />
          </IconButton>
          <IconButton aria-label="closeComments">
            <CloseIcon color="primary" />
          </IconButton>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-2">
        <TextField
          fullWidth
          id="description-objectcreate-input"
          label={"Your comment"}
          multiline
          variant="outlined"
          onChange={(e) => {}}
          InputLabelProps={{
            sx: {
              color: "#a1a1aa",
            },
          }}
          inputProps={{ style: { color: "#fff" } }}
          sx={{
            background: "#262626",
            color: "#fff",
            borderRadius: "5px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="delete">
                  <SendIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};
export default Comments;
