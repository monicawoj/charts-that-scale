import { useState } from "react";
import Switch from "@mui/material/Switch";
import { useData } from "../../hooks/useData";
import { DATA_SUBSET_SIZE } from "../../constants";

const Header = () => {
  const { data, fullData, setData } = useData();
  const [isShowingFullData, setIsShowingFullData] = useState(
    data.length === fullData.length
  );
  const handleToggle = () => {
    setIsShowingFullData((prevValue) => !prevValue);
    setData(
      isShowingFullData ? fullData.slice(1, DATA_SUBSET_SIZE + 1) : fullData
    );
  };

  return (
    <div>
      <div>Total fights: {data.length}</div>
      <Switch
        checked={isShowingFullData}
        onChange={handleToggle}
        label="All fights"
      />
    </div>
  );
};

export default Header;
