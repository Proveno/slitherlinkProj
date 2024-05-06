import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { tokenInfo } from "@/lib/token";
import { useRouter } from "next/navigation";

const Comments = (props: any) => {
  const [comment, setComment] = useState("");
  const [playerId, setPlayerId] = useState<string>();
  const [allComments, setAllComments] = useState<any>();
  const router = useRouter();
  const getData = async () => {
    try {
      var token = await tokenInfo();
      if (token._id) {
        setPlayerId(token._id);
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Comment`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then(async (resData) => {
            const { data } = resData;

            const promisedData = await Promise.all(
              data.map(async (comment: any) => {
                const ress = await fetch(
                  `${process.env.NEXT_PUBLIC_API_HOST}/Player?id=${comment.player}`,
                  {
                    method: "GET",
                  }
                );
                const { data } = await ress.json();
                console.log(data);
                return {
                  ...comment,
                  player:
                    comment.player === token._id
                      ? comment.player
                      : data.username,
                };
              })
            );
            setAllComments(promisedData);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full pt-[72px] h-screen relative right-0 bg-[#0c0d14]">
      <div className="bg-[#28224f] p-2 flex justify-between">
        <div className="text-[#bfc2cf] p-2">Comments</div>
        <div className="">
          <IconButton
            aria-label="closeComments"
            onClick={(e) => {
              props.setCommentOpened(false);
            }}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </div>
      </div>
      <div className="overflow-auto">
        {allComments &&
          allComments.map((comm: any) => {
            return (
              <>
                {comm.player === playerId ? (
                  <div className="bg-[#6842FE] m-2 p-2 rounded-md rounded-br-none">
                    {comm.comment}
                  </div>
                ) : (
                  <div className="bg-[#3b3b3b] text-white m-2 p-2 rounded-md rounded-bl-none">
                    {comm.comment}
                    <div className="text-xs">{comm.player}</div>
                  </div>
                )}
              </>
            );
          })}
      </div>

      <div className="absolute bottom-0 w-full p-2">
        <TextField
          value={comment}
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
          inputProps={{ style: { color: "#fff" } }}
          sx={{
            background: "#373952",
            color: "#fff",
            borderRadius: "5px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    if (playerId) {
                      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Comment`, {
                        method: "POST",
                        body: JSON.stringify({
                          player: playerId,
                          game: "Slitherlink",
                          comment: comment,
                        }),
                      });
                      setAllComments([
                        ...allComments,
                        {
                          player: playerId,
                          game: "Slitherlink",
                          comment: comment,
                        },
                      ]);
                      setComment("");
                    } else {
                      router.push("/login");
                    }
                  }}
                >
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
