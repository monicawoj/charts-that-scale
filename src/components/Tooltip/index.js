import { useState, useMemo } from "react";
import { usePopper } from "react-popper";
import { useTooltipData } from "../../hooks/useTooltipData";

const Tooltip = () => {
  const {
    tooltipData: { position, data },
  } = useTooltipData();

  const virtualReference = useMemo(
    () => ({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          top: position.y,
          right: position.x,
          bottom: position.y,
          left: position.x,
        };
      },
    }),
    [position.x, position.y]
  );

  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(virtualReference, popperElement);

  if (!data) return <></>;

  return (
    <div
      ref={setPopperElement}
      className="tooltip"
      style={{
        ...styles.popper,
        visibility: data ? "visible" : "hidden",
      }}
      {...attributes.popper}
    >
      <p>
        <span style={{ fontWeight: "bold" }}>{data.Winner}</span> vs.
        {data.Winner === data.R_fighter ? data.B_fighter : data.R_fighter}
      </p>
      <p>Won by: {data.win_by}</p>
    </div>
  );
};

export default Tooltip;
