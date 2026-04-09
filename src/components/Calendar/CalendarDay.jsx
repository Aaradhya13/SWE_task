// Individual day cell in the calendar grid with continuous range styling
function CalendarDay({ 
  day, 
  isCurrentMonth, 
  isToday, 
  isSelected, 
  isInRange, 
  isStartDate, 
  isEndDate, 
  isWeekend, 
  isSingleSelection,
  hasRangeAfter,
  hasRangeBefore,
  hasSelection,
  holiday,
  onClick 
}) {
  // Base container for positioning
  const containerClasses = "relative h-10 flex items-center justify-center";
  
  // Background layer for continuous range
  let backgroundLayer = null;
  if (isInRange || (isStartDate && hasRangeAfter) || (isEndDate && hasRangeBefore)) {
    const bgClasses = `absolute inset-y-0 bg-blue-100 transition-all duration-300 ease-out ${
      isStartDate ? 'left-1/2 right-0' : 
      isEndDate ? 'left-0 right-1/2' : 
      'left-0 right-0'
    }`;
    backgroundLayer = <div className={bgClasses}></div>;
  }
  
  // Day number circle/pill
  let dayClasses = "relative z-10 w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-200 ease-out cursor-pointer";
  let dayStyles = '';
  
  if (!isCurrentMonth) {
    // Grayed out for other months
    dayStyles = "text-gray-300";
  } else if (isStartDate || isEndDate) {
    // Start or end date: blue circle with white text (highest priority)
    dayStyles = "bg-blue-500 text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-110 active:scale-95";
  } else if (isInRange) {
    // In range: darker text on light background (second priority)
    dayStyles = "text-gray-800 font-semibold hover:bg-blue-200 rounded-full hover:scale-105";
  } else if (isToday && !hasSelection) {
    // Today: subtle ring (only when NO selection exists at all)
    dayStyles = "text-gray-800 font-semibold rounded-full ring-2 ring-blue-400 ring-offset-1 hover:bg-gray-100 hover:scale-105 hover:shadow-sm";
  } else if (isWeekend) {
    // Weekend: blue text
    dayStyles = `${holiday ? 'text-orange-600' : 'text-blue-500'} font-semibold hover:bg-blue-50 rounded-full hover:scale-105 hover:shadow-sm`;
  } else {
    // Default: black text (with holiday color if applicable)
    dayStyles = `${holiday ? 'text-orange-600' : 'text-gray-800'} hover:bg-gray-100 rounded-full hover:scale-105 hover:shadow-sm`;
  }

  return (
    <div className={containerClasses}>
      {/* Background layer for continuous range */}
      {backgroundLayer}
      
      {/* Day number with holiday indicator */}
      <div
        onClick={onClick}
        className={`${dayClasses} ${dayStyles} group relative flex flex-col`}
        title={holiday || ''}
      >
        <span>{day}</span>
        {/* Holiday dot indicator */}
        {holiday && isCurrentMonth && (
          <>
            <div className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full"></div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20 pointer-events-none">
              {holiday}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CalendarDay;
