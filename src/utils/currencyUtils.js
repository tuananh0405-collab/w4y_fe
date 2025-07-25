import check from "check-types";

export const formatNumber = (value) => {
  const parsedValue = parseInt(value, 10);

  // Return an empty string if the value is not a valid integer (incl. NaN)
  if (!check.integer(parsedValue)) {
    return "";
  }

  if (Math.abs(parsedValue) >= 1000000) {
    const valueInMillions = parsedValue / 1000000;
    // Format to one decimal place, removing trailing '.0'
    return `${parseFloat(valueInMillions.toFixed(1))}m`;
  }

  if (Math.abs(parsedValue) >= 1000) {
    const valueInThousands = parsedValue / 1000;
    // Format to one decimal place, removing trailing '.0'
    return `${parseFloat(valueInThousands.toFixed(1))}k`;
  }

  return parsedValue.toString();
};

export const formatCurrencyRange = (value1, value2) => {
  const parsedValue1 = parseInt(value1, 10);
  const parsedValue2 = parseInt(value2, 10);

  if (!check.integer(parsedValue1) || !check.integer(parsedValue2)) {
    return "";
  }

  const min = Math.min(parsedValue1, parsedValue2);
  const max = Math.max(parsedValue1, parsedValue2);

  if (min === max) {
    return formatNumber(min);
  }

  const getScale = (num) => {
    const absNum = Math.abs(num);
    if (absNum >= 1000000) {
      return "m";
    }
    if (absNum >= 1000) {
      return "k";
    }
    return null;
  };

  const minScale = getScale(min);
  const maxScale = getScale(max);

  if (minScale && minScale === maxScale) {
    if (minScale === "m") {
      const minInMillions = parseFloat((min / 1000000).toFixed(1));
      const maxInMillions = parseFloat((max / 1000000).toFixed(1));
      return `${minInMillions} - ${maxInMillions} triệu`;
    }
    if (minScale === "k") {
      const minInThousands = parseFloat((min / 1000).toFixed(1));
      const maxInThousands = parseFloat((max / 1000).toFixed(1));
      return `${minInThousands}k - ${maxInThousands}k`;
    }
  }

  return `${min} - ${max}`;
};
