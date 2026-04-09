import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from '../Notes/NotesPanel';
import { saveNote, getNotesForMonth, deleteNote } from '../../utils/notesStorage';
import { getHoliday } from '../../utils/holidays';

// Main calendar container component
function Calendar() {
  // Use real current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousDate, setPreviousDate] = useState(null);
  
  // Date range selection state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDetails, setNoteDetails] = useState('');
  const [monthNotes, setMonthNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Reset input fields when date selection changes
  useEffect(() => {
    if (!editingNote) {
      setNoteTitle('');
      setNoteDetails('');
    }
  }, [startDate, endDate]);

  // Get current month and year from currentDate
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

  // Get today's date for comparison
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Check if any date is selected
  const hasSelection = startDate !== null;

  // Helper: Check if a date is in the selected range
  const isInRange = (day) => {
    if (!startDate || !endDate || !day) return false;
    return day > startDate && day < endDate;
  };

  // Helper: Check if date is start date
  const isStartDate = (day) => {
    return startDate !== null && day === startDate;
  };

  // Helper: Check if date is end date
  const isEndDate = (day) => {
    return endDate !== null && day === endDate;
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const days = [];
    
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
    
    // Get number of days in current month
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    
    // Get number of days in previous month
    const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();
    
    // Calculate starting day (Monday = 0 in our grid)
    const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Add previous month's days
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isInRange: false,
        isStartDate: false,
        isEndDate: false,
        hasSelection: hasSelection
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === todayDay && 
                      currentMonthIndex === todayMonth && 
                      currentYear === todayYear;
      
      const holiday = getHoliday(currentYear, currentMonthIndex, day);
      
      days.push({
        day: day,
        isCurrentMonth: true,
        isToday: isToday,
        isSelected: isStartDate(day) || isEndDate(day),
        isInRange: isInRange(day),
        isStartDate: isStartDate(day),
        isEndDate: isEndDate(day),
        hasSelection: hasSelection,
        holiday: holiday
      });
    }
    
    // Add next month's days to complete the grid (42 days = 6 weeks)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day: day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isInRange: false,
        isStartDate: false,
        isEndDate: false,
        hasSelection: hasSelection
      });
    }
    
    return days;
  };

  // Load notes for current month
  useEffect(() => {
    const notes = getNotesForMonth(currentYear, currentMonthIndex);
    setMonthNotes(notes);
  }, [currentYear, currentMonthIndex]);

  // Navigate to previous month
  const handlePrevMonth = () => {
    console.log('Previous clicked - setting direction to: prev');
    setPreviousDate(currentDate);
    setAnimationDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentYear, currentMonthIndex - 1, 1));
      setStartDate(null);
      setEndDate(null);
      setTimeout(() => {
        setIsAnimating(false);
        setPreviousDate(null);
      }, 500);
    }, 50);
  };

  // Navigate to next month
  const handleNextMonth = () => {
    console.log('Next clicked - setting direction to: next');
    setPreviousDate(currentDate);
    setAnimationDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentYear, currentMonthIndex + 1, 1));
      setStartDate(null);
      setEndDate(null);
      setTimeout(() => {
        setIsAnimating(false);
        setPreviousDate(null);
      }, 500);
    }, 50);
  };

  // Date range selection logic
  const handleDayClick = (dayData) => {
    if (!dayData.isCurrentMonth) return;

    const clickedDay = dayData.day;

    // First click: set start date, clear end date
    if (startDate === null) {
      setStartDate(clickedDay);
      setEndDate(null);
    }
    // Second click: set end date (or swap if before start)
    else if (endDate === null) {
      if (clickedDay < startDate) {
        // Swap: clicked date becomes start, previous start becomes end
        setEndDate(startDate);
        setStartDate(clickedDay);
      } else if (clickedDay === startDate) {
        // Clicking same date: just keep it as single selection
        setStartDate(clickedDay);
        setEndDate(null);
      } else {
        // Normal case: set as end date
        setEndDate(clickedDay);
      }
    }
    // Third click: reset and start new selection
    else {
      setStartDate(clickedDay);
      setEndDate(null);
    }
  };

  const handleNoteChange = (field, value) => {
    if (field === 'title') setNoteTitle(value);
    if (field === 'details') setNoteDetails(value);
  };

  const handleSaveNote = () => {
    if (!startDate || !noteTitle.trim()) return;
    
    const end = endDate || startDate;
    
    // If editing, delete the old note first
    if (editingNote) {
      deleteNote(editingNote);
    }
    
    saveNote(currentYear, currentMonthIndex, startDate, currentYear, currentMonthIndex, end, noteTitle.trim(), noteDetails.trim());
    
    // Clear inputs and editing state
    setNoteTitle('');
    setNoteDetails('');
    setEditingNote(null);
    
    // Refresh notes display
    const notes = getNotesForMonth(currentYear, currentMonthIndex);
    setMonthNotes(notes);
  };

  const handleEditNote = (note) => {
    // Populate both title and details
    setNoteTitle(note.title);
    setNoteDetails(note.details || '');
    setEditingNote(note.range);
    
    // Parse the date range to set start and end dates
    const [start, end] = note.range.split(' to ');
    const [, , startDay] = start.split('-');
    const [, , endDay] = end.split('-');
    setStartDate(parseInt(startDay));
    setEndDate(parseInt(endDay));
  };

  const handleDeleteNote = (rangeKey) => {
    deleteNote(rangeKey);
    
    // Clear editing state if deleting the note being edited
    if (editingNote === rangeKey) {
      setNoteTitle('');
      setNoteDetails('');
      setEditingNote(null);
    }
    
    // Refresh notes display
    const notes = getNotesForMonth(currentYear, currentMonthIndex);
    setMonthNotes(notes);
  };

  const handleCancelEdit = () => {
    setNoteTitle('');
    setNoteDetails('');
    setEditingNote(null);
  };

  const days = generateCalendarDays();
  
  // Format selected date(s) for display
  const formattedSelectedDate = () => {
    if (startDate && endDate) {
      return `${currentMonth} ${startDate} - ${endDate}, ${currentYear}`;
    } else if (startDate) {
      return `${currentMonth} ${startDate}, ${currentYear}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex justify-center py-12 relative">
      {/* Hanging rope effect - Desktop only */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 z-30" style={{ width: '1126px', maxWidth: '100%' }}>
        {/* Left slanted rope */}
        <div 
          className="absolute w-0.5 h-28 bg-gray-700 rounded-full"
          style={{ 
            top: '32px',
            left: '50%',
            transformOrigin: 'top center',
            transform: 'translateX(-50%) rotate(-30deg)'
          }}
        ></div>
        
        {/* Right slanted rope */}
        <div 
          className="absolute w-0.5 h-28 bg-gray-700 rounded-full"
          style={{ 
            top: '32px',
            left: '50%',
            transformOrigin: 'top center',
            transform: 'translateX(-50%) rotate(30deg)'
          }}
        ></div>
        
        {/* Center nail - positioned at the top where ropes meet */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full shadow-lg border-2 border-gray-700 z-10"></div>
      </div>

      {/* Animation wrapper with perspective */}
      <div style={{ perspective: '1200px' }} className="relative w-full max-w-5xl mx-4">
        {/* Previous month container (animating out) */}
        {isAnimating && previousDate && (
          <div 
            className={`absolute top-0 left-0 w-full bg-white rounded-xl shadow-2xl pt-6 md:animate-swing ${
              animationDirection === 'next' ? 'calendar-exit-next' : 'calendar-exit-prev'
            }`}
            style={{ transformOrigin: 'top center', pointerEvents: 'none' }}
          >
            {/* Previous month content would go here - simplified for performance */}
          </div>
        )}

        {/* Current month container (animating in or static) */}
        <div 
          className={`bg-white rounded-xl shadow-2xl relative pt-6 w-full md:animate-swing ${
            isAnimating ? (animationDirection === 'next' ? 'calendar-enter-next' : 'calendar-enter-prev') : ''
          }`}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Hero section with month/year overlay */}
          <HeroSection 
            currentMonth={currentMonth}
            currentYear={currentYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          {/* Calendar and Notes section - seamless integration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 notes-calendar-container">
            {/* Notes section - left side */}
            <div className="md:col-span-1 notes-section">
              <NotesPanel
                selectedDate={formattedSelectedDate()}
                noteTitle={noteTitle}
                noteDetails={noteDetails}
                onNoteChange={handleNoteChange}
                onSave={handleSaveNote}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onCancelEdit={handleCancelEdit}
                monthNotes={monthNotes}
                currentMonth={currentMonth}
                editingNote={editingNote}
              />
            </div>

            {/* Calendar grid - right side */}
            <div className="md:col-span-2">
              <CalendarGrid days={days} onDayClick={handleDayClick} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .notes-section {
          filter: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
        
        .notes-calendar-container > * {
          filter: none !important;
        }
        
        .notes-calendar-container button,
        .notes-calendar-container input,
        .notes-calendar-container textarea {
          filter: none !important;
          opacity: 1 !important;
          -webkit-font-smoothing: antialiased !important;
        }
        
        .calendar-enter-next {
          animation: slideInDiagonalNext 0.5s ease-in-out;
        }

        .calendar-enter-prev {
          animation: slideInDiagonalPrev 0.5s ease-in-out;
        }

        .calendar-exit-next {
          animation: slideOutDiagonalNext 0.5s ease-in-out;
        }

        .calendar-exit-prev {
          animation: slideOutDiagonalPrev 0.5s ease-in-out;
        }

        /* Next (→): page goes ↖️ (bottom-right → top-left) */
        @keyframes slideOutDiagonalNext {
          0% {
            transform: translate(0, 0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-100%, -50%) rotateZ(-8deg) scale(0.85);
            opacity: 0;
          }
        }

        /* Next (→): incoming from bottom-left */
        @keyframes slideInDiagonalNext {
          0% {
            transform: translate(-100%, 50%) rotateZ(-8deg) scale(0.85);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
        }

        /* Previous (←): page goes ↗️ (bottom-left → top-right) */
        @keyframes slideOutDiagonalPrev {
          0% {
            transform: translate(0, 0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(100%, -50%) rotateZ(8deg) scale(0.85);
            opacity: 0;
          }
        }

        /* Previous (←): incoming from bottom-right */
        @keyframes slideInDiagonalPrev {
          0% {
            transform: translate(100%, 50%) rotateZ(8deg) scale(0.85);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) rotateZ(0deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Calendar;
