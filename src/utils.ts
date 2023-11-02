const characters = "0123456789";

function generateString(length: number) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const generateShipmentId = () => {
  const suffix = generateString(5);
  return "FA" + suffix;
};

export const generateContainerSize = () => {
  const size = 20 + Math.round(Math.random() * 20);
  return size;
};
