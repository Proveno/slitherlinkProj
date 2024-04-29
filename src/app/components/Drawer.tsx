import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ReplayIcon from "@mui/icons-material/Replay";
import {useRouter} from "next/navigation";

export default function SideDrawer(parameters: any) {
    const router = useRouter();
    return (
        <Drawer
            open={parameters.sliderOpened}
            onClose={() => {
                parameters.setSliderOpened(false);
            }}
        >
            <div className="w-14 bg-[#1F2030] text-[#a1a1aa] h-screen text-center">
                {/* Close */}
                <div className="h-[72px] py-4">
                    <IconButton
                        aria-label="close"
                        onClick={(e) => {
                            parameters.setSliderOpened(false);
                        }}
                    >
                        <CloseIcon color="primary"/>
                    </IconButton>
                </div>
                {/* Home */}
                <div className="h-[72px] py-4">
                    <IconButton aria-label="home"
                                onClick={() => router.push('http://localhost:3000', parameters.setSliderOpened(false))}>
                        <HomeIcon color="primary"/>
                    </IconButton>
                </div>

                {/* history */}
                <div className="h-[72px] py-4">
                    <IconButton aria-label="home">
                        <HistoryIcon color="primary"/>
                    </IconButton>
                </div>

                {/* top */}
                <div className="h-[72px] py-4">
                    <IconButton aria-label="home">
                        <LocalFireDepartmentIcon color="primary"/>
                    </IconButton>
                </div>

                {/* replay */}
                <div className="h-[72px] py-4">
                    <IconButton aria-label="home">
                        <ReplayIcon color="primary"/>
                    </IconButton>
                </div>
            </div>
        </Drawer>
    );
}