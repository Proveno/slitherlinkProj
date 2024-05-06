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

export default function LoginForm() {
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
        try {
            fetch(
                `${process.env.NEXT_PUBLIC_API_HOST}/Login?login=${username}&password=${password}`,
                {
                    method: "POST",
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    const {success} = data;
                    if (success) {
                        router.push("/");
                    } else {
                        setError("ERROR");
                    }
                });
        } catch (error) {
        }
    };
    return (
        <div className="bg-[#28224f] grid place-items-center h-screen px-5">
            <div className="bg-[#1f2030] shadow-lg p-5 rounded-lg border-t-4 w-full max-w-[30rem]">
                <h1 className="text-[#bfc2cf] text-2xl text-center font-bold mt-3 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <TextField
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
                    />
                    <TextField
                        error={error.length > 0}
                        required
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
                        Login
                    </Button>
                    <div className={`flex ${error ? "justify-between" : "justify-end"}`}>
                        {error && (
                            <div className="bg-errorBack text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <div className="flex-1">
                            <Link className="text-[#bfc2cf] text-sm text-left flex-1" href="/">
                                <span className="underline">Home</span>
                            </Link>
                        </div>
                        <div className="flex-2">
                            <Link className="text-[#bfc2cf] text-sm text-right flex-1" href="/login/register">
                                <span className="underline">Register</span>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
