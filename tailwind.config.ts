import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    lightMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            // colors: {
            //     backgroundColor: "rgba(var(--background-color))",
            //     mainColor: "rgba(var(--main-color))",
            //     mainLightColor: "rgba(var(--main-lightColor))",
            //     textContainerColor: "rgba(var(--text-containerColor))",
            //     buttonColor: "rgba(var(--buttons-color))",
            //     textColor: "rgba(var(--text-color))",
            // },
        },
    },
    plugins: [],
};
export default config;