import CalendarDay from './CalendarDay';

// Grid displaying weekday labels and all days of the month
function CalendarGrid({ days, onDayClick }) {
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div>
      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-0 mb-4">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-xs font-bold py-2 transition-colors duration-200 ${
              index >= 5 ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid - no gap for continuous range */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((dayData, index) => {
          // Determine position in range for styling
          const isRangeStart = dayData.isStartDate && dayData.isInRange === false;
          const isRangeEnd = dayData.isEndDate && dayData.isInRange === false;
          const isRangeMiddle = dayData.isInRange;
          const isSingleSelection = dayData.isStartDate && !dayData.isEndDate && days.every(d => !d.isEndDate);
          
          // Check if next/previous day is in range for continuous styling
          const prevDay = index > 0 ? days[index - 1] : null;
          const nextDay = index < days.length - 1 ? days[index + 1] : null;
          
          const hasRangeAfter = nextDay && (nextDay.isInRange || nextDay.isEndDate);
          const hasRangeBefore = prevDay && (prevDay.isInRange || prevDay.isStartDate);

          return (
            <CalendarDay
              key={index}
              day={dayData.day}
              isCurrentMonth={dayData.isCurrentMonth}
              isToday={dayData.isToday}
              isSelected={dayData.isSelected}
              isInRange={dayData.isInRange}
              isStartDate={dayData.isStartDate}
              isEndDate={dayData.isEndDate}
              isWeekend={index % 7 >= 5}
              isSingleSelection={isSingleSelection}
              hasRangeAfter={hasRangeAfter}
              hasRangeBefore={hasRangeBefore}
              hasSelection={dayData.hasSelection}
              holiday={dayData.holiday}
              onClick={() => onDayClick(dayData)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;
