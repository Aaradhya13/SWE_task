// Header showing current month/year with navigation buttons
function CalendarHeader({ currentMonth, currentYear, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Previous month button */}
      <button
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Current month and year */}
      <h2 className="text-2xl font-bold text-gray-800">
        {currentMonth} {currentYear}
      </h2>

      {/* Next month button */}
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default CalendarHeader;
