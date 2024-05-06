import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";

const Header = (props: any) => {
  const router = useRouter();
  const searchGames = [
    { title: "DOOM Ethernal" },
    { title: "Titanfall 2" },
    { title: "Helltaker" },
    { title: "Squad" },
    { title: "Wither 3" },
    { title: "Tic Tac Toe" },
    { title: "Sudoku" },
  ];
  return (
    <header className="bg-[#1F2030] p-2 absolute top-0 left-0 right-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between">
      <div>
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            props.setSliderOpened(true);
          }}
        >
          <MenuIcon color="primary" />
        </IconButton>
      </div>

      <Stack className="w-2/5">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          onChange={(e) => {
            router.push("/comingSoon");
          }}
          options={searchGames.map((option) => option.title)}
          PaperComponent={({ children, ...props }) => (
            <Paper
              {...props}
              sx={{ backgroundColor: "#33354D", color: "#fff" }}
            >
              {children}
            </Paper>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              InputLabelProps={{
                sx: {
                  color: "#a1a1aa",
                },
              }}
              sx={{
                background: "#33354D",
                color: "#fff", // Maintain white text for good contrast
                borderRadius: "5px",
                input: {
                  color: "#fff",
                },
              }}
              InputProps={{
                ...params.InputProps,
                type: "search",
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="search"
                      onClick={(e) => {
                        router.push("/comingSoon");
                      }}
                    >
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                props.setSearch(e.target.value);
              }}
            />
          )}
        />
      </Stack>

      {/*    sx={{*/}
      {/*    background: "#33354D",*/}
      {/*    color: "#fff",*/}
      {/*    borderRadius: "5px",*/}
      {/*    input: {*/}
      {/*        color: "#fff",*/}
      {/*    },*/}
      {/*}}*/}
      <div className="flex">
        <Checkbox
          icon={<FavoriteBorder color="primary" />}
          checkedIcon={<Favorite color="secondary" />}
        />
        {props.isLogined ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              router.push("/account");
            }}
          >
            Account
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => {
              router.push("/login");
            }}
          >
            Log in
          </Button>
        )}
      </div>
    </header>
  );
};
export default Header;
