import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const Header = (props: any) => {
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

      <div className="w-2/5">
        <TextField
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
          fullWidth
          id="search-input"
          label={"Search"}
          type="text"
          variant="outlined"
          InputLabelProps={{
            sx: {
              color: "#a1a1aa",
            },
          }}
          sx={{
            background: "#33354D",
            color: "#fff",
            borderRadius: "5px",
            input: {
              color: "#fff",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="delete">
                  <SearchIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="flex">
        <Checkbox
          icon={<FavoriteBorder color="primary" />}
          checkedIcon={<Favorite color="secondary" />}
        />
        <Button variant="contained" color="secondary">
          Log in
        </Button>
      </div>
    </header>
  );
};
export default Header;
