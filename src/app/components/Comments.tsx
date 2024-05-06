import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {useState} from "react";

const Comments = (props: any) => {
    const [comment, setComment] = useState("");
    return (
        <div className="w-full pt-[72px] h-screen relative right-0 bg-[#0c0d14]">
            <div className="bg-[#28224f] p-2 flex justify-between">
                <div className="text-[#bfc2cf] p-2">Comments</div>
                <div className="">
                    <IconButton aria-label="3Dots">
                        <MoreVertIcon color="primary"/>
                    </IconButton>
                    <IconButton
                        aria-label="closeComments"
                        onClick={(e) => {
                            props.setCommentOpened(false);
                        }}
                    >
                        <CloseIcon color="primary"/>
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
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    InputLabelProps={{
                        sx: {
                            color: "#a1a1aa",
                        },
                    }}
                    inputProps={{style: {color: "#fff"}}}
                    sx={{
                        background: "#373952",
                        color: "#fff",
                        borderRadius: "5px",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton aria-label="delete">
                                    <SendIcon color="primary"/>
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