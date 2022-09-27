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
        <span
          style={{
            fontWeight: data.Winner === data.R_fighter ? "bold" : "normal",
          }}
        >
          {data.R_fighter}
        </span>{" "}
        vs.{" "}
        <span
          style={{
            fontWeight: data.Winner === data.B_fighter ? "bold" : "normal",
          }}
        >
          {data.B_fighter}
        </span>
      </p>
      <p>Won by: {data.win_by}</p>
    </div>
  );
};

export default Tooltip;
