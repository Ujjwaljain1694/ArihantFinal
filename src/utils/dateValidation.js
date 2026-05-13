export const validateDates = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return "Please select both From and To dates";
  }

  // Normalize dates to remove time component for comparison
  const d1 = new Date(fromDate);
  const d2 = new Date(toDate);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  if (d1.getTime() === d2.getTime()) {
    return "From Date and To Date cannot be the same";
  }

  if (d1.getTime() > d2.getTime()) {
    return "From Date should be less than To Date";
  }

  return "";
};
