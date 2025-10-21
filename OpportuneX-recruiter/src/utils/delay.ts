export const delay = async (time) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(null);
    }, time);
  });
};
