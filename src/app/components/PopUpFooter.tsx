import Button from "@mui/material/Button";

const PopUpFooter = (props: any) => {
    return (
        <footer className="bg-[--main-lightColor] p-2 absolute z-[20] mx-auto bottom-[62px] w-full">
            <div className="flex flex-wrap items-center justify-center">
                <p className="text-[--text-color] pr-[10px]">
                    {"Don't lose your progress!"}
                </p>
                <Button variant="outlined" color="primary">
                    Log in now
                </Button>
            </div>
        </footer>
    );
};
export default PopUpFooter;
