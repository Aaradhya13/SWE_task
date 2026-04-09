import CalendarHeader from './CalendarHeader';

// Hero section with curved overlay and month/year display
function HeroSection({ currentMonth, currentYear, onPrevMonth, onNextMonth }) {
  return (
    <div className="relative">
      {/* Spiral binding loops */}
      <div className="absolute -top-2 left-0 right-0 flex justify-center z-20">
        <div className="flex items-end gap-[0.35rem] sm:gap-2">
          {[...Array(18)].map((_, i) => (
            <div 
              key={i} 
              className="w-[0.65rem] h-[0.65rem] sm:w-3 sm:h-3 border-[1.5px] border-gray-700 border-b-0 rounded-t-full bg-white"
            ></div>
          ))}
        </div>
      </div>

      {/* Hero image section */}
      <div className="relative h-80 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800')" }}>
        </div>

        {/* Curved overlay shape at bottom */}
        <div className="absolute bottom-0 right-0 w-full h-32 hidden md:block">
          {/* Blue curved shape */}
          <svg className="absolute bottom-0 right-0 w-1/2 h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
            <path d="M 0 150 L 0 40 Q 200 80 400 20 L 400 150 Z" fill="#3b82f6" />
          </svg>
          
          {/* White curved shape */}
          <svg className="absolute bottom-0 left-0 w-1/2 h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
            <path d="M 0 150 L 0 80 Q 200 20 400 60 L 400 150 Z" fill="white" />
          </svg>

          {/* Month and Year text with navigation - Desktop */}
          <div className="absolute bottom-6 right-8 text-right z-10 flex items-center gap-3">
            {/* Previous month button */}
            <button
              onClick={onPrevMonth}
              className="text-white opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Month and Year */}
            <div>
              <div className="text-white text-5xl font-bold tracking-tight">{currentYear}</div>
              <div className="text-white text-3xl font-semibold tracking-wide uppercase">{currentMonth}</div>
            </div>

            {/* Next month button */}
            <button
              onClick={onNextMonth}
              className="text-white opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Month and Year text with navigation - Mobile */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center px-4">
          <div className="flex items-center justify-between w-full max-w-sm">
            {/* Previous month button */}
            <button
              onClick={onPrevMonth}
              className="text-white opacity-80 hover:opacity-100 active:scale-95 transition-all duration-200 p-2"
              aria-label="Previous month"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Month and Year */}
            <div className="text-center">
              <div className="text-white text-4xl font-bold tracking-tight">{currentYear}</div>
              <div className="text-white text-2xl font-semibold tracking-wide uppercase">{currentMonth}</div>
            </div>

            {/* Next month button */}
            <button
              onClick={onNextMonth}
              className="text-white opacity-80 hover:opacity-100 active:scale-95 transition-all duration-200 p-2"
              aria-label="Next month"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
