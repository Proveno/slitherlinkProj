import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Drawer from "@mui/material/Drawer";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ReplayIcon from "@mui/icons-material/Replay";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {useRouter} from "next/navigation";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";

export default function SideDrawer(parameters: any) {
    const router = useRouter();
    const [selected, setSelected] = React.useState(false);
    return (
        <Drawer
            open={parameters.sliderOpened}
            onClose={() => {
                parameters.setSliderOpened(false);
            }}
        >
            <div className="w-14 bg-[--background-color] h-screen text-center">
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

                {/* theme */}
                <div className="h-[72px] py-4">
                    <ToggleButton aria-label="home" value="check" selected={selected} onChange={() => {
                        setSelected(!selected);
                    }} sx={{border: 0}}>
                        <AutoAwesomeIcon color="primary"/>
                    </ToggleButton>
                </div>
            </div>
        </Drawer>
    );
}