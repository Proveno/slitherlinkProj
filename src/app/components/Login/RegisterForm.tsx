"use client";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (username.length === 0 || password.length === 0) {
            setError("All fields are necessary.");
            return;
        }
        if (password.length < 8) {
            setError("Password is too short.");
            return;
        }

        try {
            console.log("HMMM");
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}/Register`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    const {success} = data;
                    if (success) {
                        router.push("/login");
                    }
                });
        } catch (error) {
        }
    };

    return (
        <div className="bg-[#28224f] grid place-items-center h-screen px-5">
            <div className="bg-[#1f2030] shadow-lg p-5 rounded-lg border-t-4 border-yellow w-full max-w-[30rem]">
                <h1 className="text-[#bfc2cf] text-2xl text-center font-bold mt-3 mb-6">
                    Registration
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <TextField
                        error={error.length > 0}
                        required
                        id="username-register-input"
                        label={"Username"}
                        type="text"
                        variant="outlined"
                        onChange={(e) => {
                            setError("");
                            setUsername(e.target.value);
                        }}
                        InputLabelProps={{
                            sx: {
                                color: "#bfc2cf",
                            },
                        }}
                        sx={{
                            background: "#373952",
                            color: "#fff",
                            borderRadius: "5px",
                            input: {
                                color: "#fff",
                            },
                        }}
                    />
                    <TextField
                        error={error.length > 0}
                        required
                        id="password-register-input"
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
                                color: "#bfc2cf",
                            },
                        }}
                        sx={{
                            background: "#373952",
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
                                            <VisibilityOff color="primary"/>
                                        ) : (
                                            <Visibility color="primary"/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        color={"secondary"}
                        sx={{
                            fontSize: 16,
                            color: "#bfc2cf",
                        }}
                        type="submit"
                    >
                        {"Submit"}
                    </Button>
                    <div
                        className={`flex ${error ? "justify-between" : "justify-end"}`}
                    >
                        {error && (
                            <div className="bg-errorBack text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <Link className="text-[#bfc2cf] text-sm text-right" href={"/login/"}>
                            <span className="underline">Log in</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
