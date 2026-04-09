const STORAGE_KEY = 'calendar_notes';

// Format date as YYYY-MM-DD with zero padding
export const formatDate = (year, month, day) => {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

// Load all notes from localStorage
export const loadNotes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

// Save note for a date range with title and details
export const saveNote = (startYear, startMonth, startDay, endYear, endMonth, endDay, title, details) => {
  const startFormatted = formatDate(startYear, startMonth, startDay);
  const endFormatted = formatDate(endYear, endMonth, endDay);
  const rangeKey = `${startFormatted} to ${endFormatted}`;
  
  const notes = loadNotes();
  notes[rangeKey] = { title, details };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

// Delete note by date range key
export const deleteNote = (rangeKey) => {
  const notes = loadNotes();
  delete notes[rangeKey];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

// Get notes for a specific month (YYYY-MM)
export const getNotesForMonth = (year, month) => {
  const notes = loadNotes();
  const monthPrefix = formatDate(year, month, 1).slice(0, 7); // Get YYYY-MM
  
  return Object.entries(notes)
    .filter(([key]) => key.startsWith(monthPrefix))
    .map(([key, value]) => ({ 
      range: key, 
      title: value.title || value, // Support old format
      details: value.details || '' 
    }));
};
