import Button from "@mui/material/Button";

const PopUpFooter = (props: any) => {
    return (
        <footer className="bg-[#28224f] p-2 absolute z-[20] mx-auto bottom-[56px] w-full">
            <div className="flex flex-wrap items-center justify-center">
                <p className="text-[#bfc2cf] pr-[10px]">
                    {"Don't lose your progress!"}
                </p>
                <Button variant="outlined" color="primary" href={"/login/"}>
                    Log in now
                </Button>
            </div>
        </footer>
    );
};
export default PopUpFooter;
