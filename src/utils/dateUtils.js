export const isValidDateString = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

export const formatMessageTime = (val) => {
  if (val && isValidDateString(val)) {
    const date = new Date(val);

    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  } else {
    if (val) return val;
    return "";
  }
};
