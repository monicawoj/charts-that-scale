import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const ChartVersionSelector = ({ value, handleChange }) => {
  const options = [
    {
      name: "Pure SVG",
      value: "pure-svg",
    },
    {
      name: "Pure React Pixi",
      value: "static-pixi-no-svg",
    },
    {
      name: "React Pixi (static)",
      value: "static-pixi-with-svg",
    },
    {
      name: "React Pixi (animated)",
      value: "animated-react-pixi-with-svg",
    },
    {
      name: "Pixi (animated)",
      value: "animated-pixi-with-svg",
    },
    {
      name: "Pixi (tooltip)",
      value: "animated-pixi-with-tooltip",
    },
    {
      name: "Pixi (tooltip/brush)",
      value: "animated-pixi-with-tooltip-and-brush",
    },
  ];

  return (
    <FormControl>
      {/* <FormLabel id="chart-version-selector">Chart version</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="chart-version-selector"
        name="chart-version-selector"
        value={value}
        sx={{ justifyContent: "space-between" }}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.name}
            sx={{ margin: 0 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ChartVersionSelector;
