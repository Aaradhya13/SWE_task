# Wall Calendar Component

A polished, interactive React calendar component inspired by physical wall calendars, featuring date range selection, integrated notes with title/details structure, holiday markers, and a beautiful hanging calendar aesthetic with realistic page-flip animations.

🔗 **Live Demo**: [https://swe-task-gray.vercel.app/](https://swe-task-gray.vercel.app/)

## 🎯 Features

### Core Features
- **Wall Calendar Aesthetic**: Physical calendar design with hero image, spiral binding rings, and hanging rope effect
- **Day Range Selector**: Select start and end dates with clear visual states for selected range
- **Enhanced Notes System**: Add notes with title and details, edit/delete functionality, and flip card popup display
- **Holiday Markers**: Visual indicators (orange dots) with tooltips for holidays
- **Fully Responsive**: Seamless adaptation between desktop and mobile layouts with optimized interactions

### Creative Additions
- **Hanging Effect**: Realistic slanted rope from central nail(desktop only)
- **Diagonal Page-Flip Animation**: Natural month navigation where next month goes top-left (↖️) and previous goes top-right (↗️)
- **3D Flip Cards**: Desktop hover reveals note details with 3D transform, mobile tap with fade transition
- **Spiral Binding**: Authentic calendar rings at the top (responsive sizing)
- **Month Navigation**: Navigate between months with smooth diagonal animations
- **Today Indicator**: Current date highlighted in the calendar
- **localStorage Persistence**: All notes saved automatically with title and details

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **localStorage** - Client-side data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎨 Design Choices

### Architecture
- **Component Structure**: Modular components (Calendar, HeroSection, CalendarGrid, CalendarDay, NotesPanel)
- **State Management**: React hooks (useState, useEffect) for local state
- **Data Persistence**: localStorage with JSON serialization for notes with title/details structure
- **Utility Modules**: Separate files for notes storage and holiday data

### Styling Approach
- **Tailwind CSS**: Rapid development with utility classes
- **Responsive Design**: Mobile-first approach with conditional rendering for desktop/mobile interactions
- **Custom Animations**: CSS keyframes for hanging swing and diagonal page-flip effects
- **3D Transforms**: Perspective and rotateY for desktop flip cards, simple opacity for mobile

### UX Decisions
- **Date Range Selection**: Intuitive click-to-select pattern (first click = start, second click = end)
- **Visual Feedback**: Clear states for hover, selected, and in-range dates
- **Notes Organization**: Month-based filtering with edit/delete controls (always visible on mobile, hover on desktop)
- **Mobile Optimization**: 
  - Smaller spiral rings and tighter spacing
  - Always-visible edit/delete icons for better touch accessibility
- **Animation Direction**: Natural page-turning where next month exits top-left and previous exits top-right

## 📱 Responsive Behavior

### Desktop (≥768px)
- Side-by-side layout: Notes panel (left) + Calendar grid (right)
- Hanging rope effect with slanted ropes from central nail 
- Curved overlay design on hero section
- Full-size spiral binding rings (w-3 h-3, gap-2)
- 3D flip card on hover with perspective and rotateY transforms
- Edit/delete icons appear only on hover

### Mobile (<768px)
- Stacked vertical layout
- Simplified header without curved overlay
- Scaled-down spiral rings (w-2 h-2, gap-1) with reduced spacing
- Touch-optimized buttons and inputs
- Simple fade transitions for flip cards (no 3D transforms for text clarity)
- Edit/delete icons always visible for better accessibility

## 💾 Data Storage

Notes are stored in localStorage with enhanced structure:
```json
{
  "calendar_notes": {
    "2026-04-14 to 2026-04-16": {
      "title": "Bihu holiday",
      "details": "Traditional Assamese festival celebration"
    },
    "2026-04-27 to 2026-04-30": {
      "title": "lab internals",
      "details": "Computer lab practical exams"
    }
  }
}
```

- **Key Format**: `YYYY-MM-DD to YYYY-MM-DD`
- **Value Structure**: Object with `title` and `details` fields
- **Filtering**: Notes filtered by month prefix (e.g., "2026-04")
- **Persistence**: Automatic save on note submission
- **Edit/Delete**: Full CRUD operations with localStorage sync

## 🎯 Key Features Demonstration

### Date Range Selection
1. Click any date to set start date (highlighted in blue)
2. Click another date to set end date
3. All dates between are highlighted with lighter blue
4. Click again to reset and start new selection

### Notes Management
1. Select a date or date range
2. Enter note title (required) and details (optional)
3. Click "Save" button
4. Note appears in the list with date range
5. Click note to view in popup card
6. Desktop: Hover to flip and see details
7. Mobile: Tap to flip between front and back
8. Edit: Click edit icon to modify note
9. Delete: Click delete icon to remove note
10. Notes persist across page refreshes

### Holiday Markers
- Orange dot indicator on holiday dates
- Hover to see holiday name in tooltip
- Static holiday data for demonstration

### Month Navigation
- Click left arrow (←) for previous month - page flips top-right (↗️)
- Click right arrow (→) for next month - page flips top-left (↖️)
- Smooth diagonal animation with transform and opacity
- No blur on interactive elements during animation

### Responsive Design
- Resize browser window to see layout adaptation
- Mobile view: Vertical stack with optimized spacing and always-visible controls
- Desktop view: Side-by-side with hanging effect and hover interactions

## 🚀 Implemented Enhancements

✅ Holiday markers with visual indicators and tooltips  
✅ Enhanced notes with title + details structure  
✅ Edit and delete functionality for notes  
✅ Flip card popup with 3D animation (desktop) and fade (mobile)  
✅ Diagonal page-flip animation for month navigation  
✅ Hanging calendar effect with slanted ropes  
✅ Mobile-optimized interactions 
✅ localStorage persistence for all note data  

## 🔧 Technical Optimizations

### Performance
- Conditional rendering for desktop/mobile features
- willChange property for animation optimization
- Minimal re-renders with proper state management

### Accessibility
- Always-visible edit/delete icons on mobile
- Clear visual feedback for all interactions
- Keyboard support (ESC to close modal)
- Semantic HTML structure

### Cross-browser Compatibility
- WebKit prefixes for font smoothing
- Fallback styles for older browsers
- Tested on Chrome, Firefox, Safari, Edge

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 💻 Author

Created as part of my frontend engineering assessment showcasing React, responsive design, animations, and UX implementation skills.
