export const getOnlyDate = (data) => {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
