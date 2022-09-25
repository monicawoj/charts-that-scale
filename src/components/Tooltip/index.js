import { useState, useMemo } from "react";
import { usePopper } from "react-popper";

const Tooltip = ({ position, data }) => {
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

  return (
    <div
      ref={setPopperElement}
      style={{ ...styles.popper, visibility: data ? "visible" : "hidden" }}
      {...attributes.popper}
    >
      position: {position.x} {position.y}
      {JSON.stringify(data)}
    </div>
  );
};

export default Tooltip;
