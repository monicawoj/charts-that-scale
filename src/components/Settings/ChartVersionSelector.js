import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const ChartVersionSelector = ({ value, handleChange }) => {
  const options = [
    {
      name: "SVG (animated)",
      value: "animated-svg",
    },
    {
      name: "Pixi (static)",
      value: "static-pixi-no-svg",
    },
    {
      name: "Pixi + SVG (static)",
      value: "static-pixi-with-svg",
    },
    {
      name: "Pixi + SVG (animated)",
      value: "animated-pixi-with-svg",
    },
    {
      name: "Pixi + SVG (tooltip)",
      value: "animated-pixi-with-tooltip",
    },
    {
      name: "Pixi + SVG (d3-brush)",
      value: "animated-pixi-with-brush",
    },
    {
      name: "React Pixi w/Graphics",
      value: "pixi-with-tooltip-and-brush",
    },
    {
      name: "Pure Pixi w/Sprites ",
      value: "pure-pixi-with-sprites",
    },
  ];

  return (
    <FormControl>
      <FormLabel id="chart-version-selector">Chart version</FormLabel>
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
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ChartVersionSelector;
