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

export const getMessageAge = (val) => {
  if (val && isValidDateString(val)) {
    const now = new Date();
    const diffMs = now - new Date(val);

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return "Dưới 1 phút trước";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ`;
    const days = Math.floor(hours / 24);
    return `${days} ngày`;
  } else {
    if (val) return "AAAA";
    return "";
  }
};
