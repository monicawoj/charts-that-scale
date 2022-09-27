import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import Container from "@mui/material/Container";
import { useData } from "../../hooks/useData";

const Header = () => {
  const { data, fullData, setData } = useData();

  const handleChange = (e) => {
    setData(fullData.slice(1, e.target.value + 1));
  };

  const marks = [
    {
      value: 1000,
      label: 1000,
    },
    {
      value: fullData.length,
      label: fullData.length,
    },
  ];

  return (
    <Container>
      <FormGroup>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" color="inherit" noWrap>
            Total fights shown:
          </Typography>
          <Slider
            aria-label="Custom marks"
            value={data.length}
            min={0}
            max={fullData.length}
            onChange={handleChange}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Box>
      </FormGroup>
    </Container>
  );
};

export default Header;
