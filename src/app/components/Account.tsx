"use client";

import Button from "@mui/material/Button";

import EngineeringIcon from "@mui/icons-material/Engineering";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DataObjectIcon from "@mui/icons-material/DataObject";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TagIcon from "@mui/icons-material/Tag";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import Compressor from "compressorjs";
import { tokenInfo } from "@/lib/token";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "next/link";
import Chip from "@mui/material/Chip";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LinearProgress from "@mui/material/LinearProgress";

import setCanvasPreview from "@/lib/setCanvasPreview";
import Avatar from "@mui/material/Avatar";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ASPECT_RATIO = 16 / 9;
const MIN_DIMENSION = 100;

export default function ModeratorAccount(params: any) {
  const router = useRouter();
  //form
  const [isWrong, setIsWrong] = useState(false);

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  async function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const getData = async () => {
    try {
      var token = await tokenInfo();
      setUsername(token.username);
      setId(token._id);
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Player?id=${token._id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then(async (resData) => {
          const { data } = resData;
          setImage(data.avatar);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/Player?id=${id}`,
        {
          method: "PUT",
          body: JSON.stringify(
            password.length > 8
              ? {
                  avatar: image,
                  username: username,
                  password: password,
                }
              : {
                  avatar: image,
                  username: username,
                }
          ),
        }
      );

      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };
  const [image, setImage] = useState("");
  const [imageCropFieldOpened, setImageCropFieldOpened] = useState(false);
  const [crop, setCrop] = useState<any>();
  const imgRef = useRef<any>();
  const canvasRef = useRef<any>();

  return (
    <>
      <div className="h-screen w-full overflow-auto p-4">
        <div className="md:pl-52 pt-24 md:py-8 w-full grid grid-cols-1 justify-items-center gap-4">
          <div className="w-full max-w-[30rem] bg-dark shadow-lg p-5 rounded-lg border-t-4 border-yellow">
            {username && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {imageCropFieldOpened ? (
                  <div className="flex flex-col items-center py-35">
                    <ReactCrop
                      onChange={(pixelCrop, percentCrop) =>
                        setCrop(percentCrop)
                      }
                      crop={crop}
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                    >
                      <img
                        ref={imgRef}
                        src={image}
                        alt="Avatar Image"
                        onLoad={(e) => {
                          const { width, height, naturalWidth, naturalHeight } =
                            e.currentTarget;

                          const crop = makeAspectCrop(
                            {
                              unit: "%",
                              width: MIN_DIMENSION,
                            },
                            ASPECT_RATIO,
                            width,
                            height
                          );
                          const centeredCrop = centerCrop(crop, width, height);
                          setCrop(centeredCrop);
                        }}
                      />
                    </ReactCrop>
                    <div className="mt-4 w-full">
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{
                          fontSize: 16,
                        }}
                        fullWidth
                        onClick={() => {
                          setCanvasPreview(
                            imgRef.current,
                            canvasRef.current,
                            convertToPixelCrop(
                              crop,
                              imgRef.current.width,
                              imgRef.current.height
                            )
                          );

                          const dataURL = canvasRef.current.toDataURL();
                          setImage(dataURL);
                          setImageCropFieldOpened(false);
                        }}
                      >
                        Crop Image
                      </Button>
                    </div>
                    {crop && <canvas ref={canvasRef} className="hidden" />}
                  </div>
                ) : (
                  <>
                    {image.length > 0 && (
                      <div className="flex justify-center">
                        <Avatar
                          sx={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={image}
                          variant="square"
                        >
                          <ImageNotSupportedIcon />
                        </Avatar>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <div className=" ">
                        <div className="py-2 ">{"Avatar"}</div>
                      </div>
                      <div className="justify-end flex">
                        <div className="mx-2">
                          {image.length > 0 && (
                            <Button
                              color="error"
                              sx={{
                                height: "39.99px",
                                color: "#18181b",
                              }}
                              variant="contained"
                              onClick={(e) => {
                                setImage("");
                              }}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          )}
                        </div>

                        <div className="w-[9rem]">
                          <Button
                            component="label"
                            fullWidth
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon color="secondary" />}
                            sx={{
                              fontSize: 16,
                              color: "#18181b",
                            }}
                          >
                            {"Upload"}
                            <input
                              accept="image/*"
                              id="contained-button-file"
                              multiple
                              hidden
                              type="file"
                              onChange={(e) => {
                                var file = e.target.files![0];
                                new Compressor(file, {
                                  quality: 0.6, // its not recommended to go below 0.6 (to save quality).
                                  success: async (compressedResult: any) => {
                                    const url = await blobToBase64(
                                      compressedResult
                                    );

                                    setImageCropFieldOpened(true);
                                    setImage(url as string);
                                  },
                                });
                              }}
                            />
                            {/* <VisuallyHiddenInput type="file" /> */}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <>
                      <TextField
                        value={username}
                        error={error.length > 0}
                        required
                        id="username-login-input"
                        label={"Username"}
                        type="text"
                        variant="outlined"
                        onChange={(e) => {
                          setError("");
                          setUsername(e.target.value);
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "#a1a1aa",
                          },
                        }}
                        sx={{
                          background: "#262626",
                          color: "#fff",
                          borderRadius: "5px",
                          input: {
                            color: "#fff",
                          },
                        }}
                      />
                      <TextField
                        error={error.length > 0}
                        id="password-login-input"
                        label={"Password"}
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setError("");
                          setPassword(e.target.value);
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "#a1a1aa",
                          },
                        }}
                        sx={{
                          background: "#262626",
                          borderRadius: "5px",
                          input: {
                            color: "#fff",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff color="primary" />
                                ) : (
                                  <Visibility color="primary" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          fontSize: 16,
                          color: "#18181b",
                        }}
                        type="submit"
                      >
                        {"Submit"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          fontSize: 16,
                          borderWidth: "2px",
                        }}
                        onClick={async (e) => {
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_HOST}/Login/logout`,
                            {
                              method: "POST",
                            }
                          );
                          router.push(`/login/`);
                        }}
                      >
                        {"Log out"}
                      </Button>
                    </>
                  </>
                )}

                <div
                  className={`flex ${
                    error ? "justify-between" : "justify-end"
                  }`}
                >
                  {error && (
                    <div className="bg-errorBack text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                      {error}
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
