export const delay = async (time) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove("");
    }, time);
  });
};
