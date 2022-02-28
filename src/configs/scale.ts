import Constants from "./Constants";

const widthDesign = 428;
const heightDesign = 926;
const scale = (size: number, accordingHeight?: boolean) => {
  if (accordingHeight) {
    return (size * Constants.height) / heightDesign;
  }
  return (size * Constants.width) / widthDesign;
};

export default scale;