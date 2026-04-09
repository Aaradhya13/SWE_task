// Static holiday data
export const holidays = {
  "2026-04-14": "Bihu (Rongali Bihu)",
  "2026-04-15": "Bihu Holiday",
  "2026-04-01": "April Fools' Day",
  "2026-04-22": "Earth Day",
  "2026-05-01": "Labour Day",
  "2026-05-10": "Mother's Day",
  "2026-12-25": "Christmas Day",
  "2026-01-01": "New Year's Day",
  "2026-01-26": "Republic Day",
  "2026-08-15": "Independence Day",
  "2026-10-02": "Gandhi Jayanti"
};

// Get holiday for a specific date
export const getHoliday = (year, month, day) => {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateKey = `${year}-${mm}-${dd}`;
  return holidays[dateKey] || null;
};
