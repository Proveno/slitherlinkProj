"use client";

import Button from "@mui/material/Button";

import EngineeringIcon from "@mui/icons-material/Engineering";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DataObjectIcon from "@mui/icons-material/DataObject";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TagIcon from "@mui/icons-material/Tag";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { tokenInfo } from "@/lib/token";

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

  const getData = async () => {
    try {
      var token = await tokenInfo();
      setUsername(token.username);
      setId(token._id);
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
                  username: username,
                  password: password,
                }
              : {
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

  return (
    <>
      <div className="h-screen w-full overflow-auto p-4">
        <div className="md:pl-52 pt-24 md:py-8 w-full grid grid-cols-1 justify-items-center gap-4">
          <div className="w-full max-w-[30rem] bg-dark shadow-lg p-5 rounded-lg border-t-4 border-yellow">
            {username && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
