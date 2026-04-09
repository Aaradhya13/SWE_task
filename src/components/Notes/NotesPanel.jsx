import { useState, useEffect } from 'react';

// Minimal notes panel matching wall calendar style
function NotesPanel({ selectedDate, noteTitle, noteDetails, onNoteChange, onSave, onEdit, onDelete, onCancelEdit, monthNotes, currentMonth, editingNote }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Format date range for display
  const formatRange = (rangeKey) => {
    const [start, end] = rangeKey.split(' to ');
    const [, , startDay] = start.split('-');
    const [, , endDay] = end.split('-');
    
    if (startDay === endDay) {
      return `${currentMonth} ${parseInt(startDay)}`;
    }
    return `${currentMonth} ${parseInt(startDay)}–${parseInt(endDay)}`;
  };

  // Calculate number of lines needed
  const lineCount = monthNotes.length > 0 ? monthNotes.length * 2 : 5;

  // Open modal with selected note
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setIsFlipped(false);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsFlipped(false);
    setTimeout(() => setSelectedNote(null), 300);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  // Toggle flip on mobile tap
  const handleCardClick = () => {
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="text-center">
      {/* Header */}
      <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Notes</h3>

      {/* Notes list - static, no flip */}
      <div className="space-y-3">
        {monthNotes.length > 0 ? (
          monthNotes.map(({ range, title, details }) => (
            <div key={range} className="relative">
              <div 
                className="text-xs font-semibold text-gray-800 pb-2 border-b border-gray-300 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors px-1 rounded text-center"
                onClick={() => handleNoteClick({ range, title, details })}
              >
                <div className="flex-1 text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{formatRange(range)}</div>
                  <div>{title}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-1 mobile-icons-visible">
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onEdit({ range, title, details: details || '' }); 
                    }}
                    className="p-1 hover:bg-blue-100 rounded"
                    title="Edit"
                  >
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (window.confirm('Delete this note?')) {
                        onDelete(range); 
                      }
                    }}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="border-b border-gray-300"></div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedNote && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 mobile-no-blur"
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          onClick={closeModal}
        >
          {/* Backdrop - No blur */}
          <div className="absolute inset-0 bg-black/40" style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}></div>
          
          {/* Card Container */}
          <div 
            className="relative z-10 w-full max-w-lg"
            style={{ 
              perspective: '1200px',
              animation: 'scaleIn 0.4s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-2 -right-2 z-20 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 hover:scale-110 transition-all duration-300 ease-in-out"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flip Card - Desktop: 3D flip on hover, Mobile: Simple fade on tap */}
            <div
              className="relative w-full md:transition-all md:duration-500 md:ease-in-out md:hover:cursor-pointer"
              style={{
                transformStyle: window.innerWidth >= 768 ? 'preserve-3d' : 'flat',
                transform: window.innerWidth >= 768 && isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                height: '280px',
                willChange: isAnimating && window.innerWidth >= 768 ? 'transform' : 'auto',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
              onClick={handleCardClick}
              onMouseEnter={() => {
                if (window.innerWidth >= 768) {
                  setIsAnimating(true);
                  setIsFlipped(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth >= 768) {
                  setIsAnimating(true);
                  setIsFlipped(false);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 w-full h-full bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden ${
                  window.innerWidth < 768 ? (isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-300') : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility'
                }}
              >
                {/* Enhanced Decorative Banner */}
                <div className="h-20 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden flex items-center">
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                  }}></div>
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                  {/* NOTE Badge */}
                  <div className="absolute top-3 left-6 z-10">
                    <span className="inline-block px-4 py-1 bg-white rounded-full text-xs font-bold text-orange-600 shadow-lg">
                      NOTE
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{selectedNote.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{formatRange(selectedNote.range)}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{window.innerWidth >= 768 ? 'Hover to flip' : 'Tap to flip'}</span>
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`absolute inset-0 w-full h-full bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden ${
                  window.innerWidth < 768 ? (isFlipped ? 'opacity-100 transition-opacity duration-300' : 'opacity-0 pointer-events-none') : ''
                }`}
                style={{
                  backfaceVisibility: window.innerWidth >= 768 ? 'hidden' : 'visible',
                  WebkitBackfaceVisibility: window.innerWidth >= 768 ? 'hidden' : 'visible',
                  transform: window.innerWidth >= 768 ? 'rotateY(180deg) translateZ(0)' : 'translateZ(0)',
                  WebkitTransform: window.innerWidth >= 768 ? 'rotateY(180deg) translateZ(0)' : 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility'
                }}
              >
                {/* Header with enhanced gradient */}
                <div className="h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 flex items-center px-6 relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                  <h3 className="text-lg font-semibold text-white relative z-10">{selectedNote.title}</h3>
                </div>

                {/* Details Content */}
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{formatRange(selectedNote.range)}</span>
                  </div>
                  
                  {selectedNote.details ? (
                    <div className="text-sm text-gray-700 leading-relaxed" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {selectedNote.details}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <svg className="w-10 h-10 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xs font-medium">No additional details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Divider between saved notes and input area */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        {/* Add Note section heading */}
        <h4 className="text-xs font-semibold text-gray-700 mb-2">
          {editingNote ? 'Edit Note' : 'Add Note'}
        </h4>
        
        {/* Selected date info */}
        {selectedDate && (
          <div className="mb-3 text-xs text-gray-500">
            {selectedDate}
          </div>
        )}

        {/* Title input */}
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => onNoteChange('title', e.target.value)}
          placeholder="Note title..."
          disabled={!selectedDate}
          className="w-full p-2 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 mb-2"
        />

        {/* Details textarea */}
        <textarea
          value={noteDetails}
          onChange={(e) => onNoteChange('details', e.target.value)}
          placeholder="Note details (optional)..."
          disabled={!selectedDate}
          className="w-full h-20 p-2 text-xs border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed resize-none transition-all duration-200"
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={!selectedDate || !noteTitle.trim()}
            className="mt-2 flex-1 bg-blue-500 text-white text-xs py-2 px-3 rounded hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm hover:shadow-md"
          >
            {editingNote ? 'Update' : 'Save'}
          </button>
          {editingNote && (
            <button
              onClick={onCancelEdit}
              className="mt-2 bg-gray-400 text-white text-xs py-2 px-3 rounded hover:bg-gray-500 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 768px) {
          .mobile-icons-visible {
            opacity: 1 !important;
            visibility: visible !important;
          }
          .mobile-no-blur {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            filter: none !important;
          }
          .mobile-no-blur * {
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          input, textarea, button {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
          }
        }
      `}</style>
    </div>
  );
}

export default NotesPanel;
