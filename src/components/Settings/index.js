import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import { useData } from "../../hooks/useData";
import ChartVersionSelector from "./ChartVersionSelector";

const Settings = ({ chartVersion, handleChartVersionChange }) => {
  const { data, fullData, setData } = useData();

  const handleDataLengthChange = (e) => {
    setData(fullData.slice(1, e.target.value + 1));
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1000,
      label: 1000,
    },
    {
      value: 2000,
      label: 2000,
    },
    {
      value: 3000,
      label: 3000,
    },
    {
      value: 4000,
      label: 4000,
    },
    {
      value: fullData.length,
      label: fullData.length,
    },
  ];

  return (
    <FormGroup
      sx={{
        width: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <FormControl>
        <FormLabel id="data-length-slider">Total fights displayed</FormLabel>
        <Slider
          aria-labelledby="data-length-slider"
          aria-label="Custom marks"
          value={data.length}
          min={10}
          max={fullData.length}
          onChange={handleDataLengthChange}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </FormControl>
      <ChartVersionSelector
        value={chartVersion}
        handleChange={handleChartVersionChange}
      />
    </FormGroup>
  );
};

export default Settings;
