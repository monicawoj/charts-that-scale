import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useData } from "../../hooks/useData";
import { DATA_SUBSET_SIZE } from "../../constants";

const Header = () => {
  const { data, fullData, setData } = useData();
  const [isShowingFullData, setIsShowingFullData] = useState(
    data.length === fullData.length
  );
  const [dataLength, setDataLength] = useState(DATA_SUBSET_SIZE);

  const handleToggle = () => {
    setIsShowingFullData((prevValue) => !prevValue);
    setData(
      isShowingFullData ? fullData.slice(1, DATA_SUBSET_SIZE + 1) : fullData
    );
  };

  // const handleDataLengthChange = (e) => {
  //   const value = e.target.value;
  //   setDataLength(value);
  //   setData(fullData.slice(1, value + 1));
  // };

  // const dataLengths = [10, 100, 300, 500, 1000, 2000, 5000];

  return (
    <div>
      <div>Total fights: {data.length}</div>
      <FormGroup>
        {/* <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={dataLength}
          onChange={handleDataLengthChange}
          helperText="Please select your currency"
        >
          {dataLengths.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField> */}
        <FormControlLabel
          control={
            <Switch
              checked={isShowingFullData}
              onChange={handleToggle}
              label="All fights"
            />
          }
          label="All fights?"
        />
      </FormGroup>
    </div>
  );
};

export default Header;
