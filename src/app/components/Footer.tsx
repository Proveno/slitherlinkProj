import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import {useState} from "react";
import Rating from "@mui/material/Rating";
import {styled} from '@mui/material/styles';

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
        '& .MuiRating-iconEmpty': {
            borderColor: '#ff6d75', // Цвет обводки пустых значков
        },
    });

    return (
        <footer
            className="bg-[#1F2030] p-2 absolute bottom-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-end gap-1">
            {/*<ToggleButtonGroup*/}
            {/*    value={like}*/}
            {/*    exclusive*/}
            {/*    onChange={handleLike}*/}
            {/*    aria-label="text alignment"*/}
            {/*>*/}
            {/*    /!* like *!/*/}
            {/*    <ToggleButton value="like" aria-label="left aligned">*/}
            {/*        <div className="flex">*/}
            {/*            {like === "like" ? (*/}
            {/*                <ThumbUpIcon color="secondary"/>*/}
            {/*            ) : (*/}
            {/*                <ThumbUpOutlinedIcon color="primary"/>*/}
            {/*            )}*/}
            {/*            <div className="p-1 text-xs text-white">123321</div>*/}
            {/*        </div>*/}
            {/*    </ToggleButton>*/}
            {/*    /!* dislike *!/*/}
            {/*    <ToggleButton value="dislike" aria-label="centered">*/}
            {/*        <div className="flex">*/}
            {/*            {like === "dislike" ? (*/}
            {/*                <ThumbDownIcon color="secondary"/>*/}
            {/*            ) : (*/}
            {/*                <ThumbDownOutlinedIcon color="primary"/>*/}
            {/*            )}*/}
            {/*            <div className="p-1 text-xs text-white">123321</div>*/}
            {/*        </div>*/}
            {/*    </ToggleButton>*/}
            {/*</ToggleButtonGroup>*/}

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
            {/*<div className="flex">*/}
            {/*    <IconButton aria-label="feedback">*/}
            {/*        <FeedbackOutlinedIcon color="primary"/>*/}
            {/*    </IconButton>*/}
            {/*    <div className="py-2">Feedback</div>*/}
            {/*</div>*/}
            {/* Gamepad */}
            {/*<IconButton*/}
            {/*  aria-label="gamepad"*/}
            {/*  onClick={(e) => {*/}
            {/*    props.setContoll("Click");*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <GamepadOutlinedIcon color="primary" />*/}
            {/*</IconButton>*/}
            {/* fullscreen */}
            <IconButton
                aria-label="fullscreen"
                onClick={(e) => {
                    props.setFullscreen(!props.fullscreen);
                }}
            >
                <FullscreenIcon color="primary"/>
            </IconButton>
        </footer>
    );
};
export default Footer;
