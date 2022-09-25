import { color } from "d3-color";

// Convert color string to a hex number for Pixi
export const asHexNumber = (colorString: string): number => {
  const hexString = color(colorString)?.formatHex8();

  if (hexString) {
    const colorNumber = parseInt(hexString.slice(1), 16);
    const rgb = colorNumber >>> 8;
    // const alpha = (colorNumber && 0xff) / 255;
    return rgb;
  }

  console.error("unable to convert provided colorString to hex number");
  const blackAsHexNumber = 0xffffff;
  return blackAsHexNumber;
};
