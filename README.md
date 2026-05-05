# Arihant Capital Backoffice Login

A pixel-perfect responsive login page built with React.js and pure CSS, inspired by Arihant Capital's backoffice login UI.

## Features

- **Responsive Design**: Fully responsive layout that adapts to desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations and transitions
- **Form Validation**: Client-side validation with error handling
- **Pure CSS**: No Tailwind CSS, only custom CSS with Flexbox
- **Cross-browser**: Compatible with all modern browsers
- **Accessibility**: ARIA-friendly with keyboard navigation support

## Layout Structure

- **Header**: Green gradient bar with ArihantCapital logo and tagline
- **Main Content**: Two-column layout
  - **Left Side**: Analytics illustration with charts and graphs
  - **Right Side**: Login card
- **Footer**: Contact information and links

## Technologies Used

- React.js 18.2.0
- Pure CSS (no Tailwind)
- Google Fonts (Inter)
- SVG Illustrations
- Flexbox for layout
- CSS Media Queries for responsiveness

## File Structure

```
arihant-login/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.jsx                 # Main React component
│   ├── LoginPage.jsx           # Login page component
│   ├── LoginPage.css           # Complete styling
│   └── index.js                # Entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

## Key Features

### Header
- **Green gradient background**: Linear gradient from dark to light green
- **Logo**: "ArihantCapital" with "Generating Wealth" tagline
- **Responsive**: Adapts to all screen sizes

### Login Form
- **Input validation**: Real-time error handling
- **Branch code field**: With placeholder and focus states
- **Submit button**: Green gradient with hover effects
- **Error messages**: Clear and user-friendly

### Illustration
- **Custom SVG**: Analytics dashboard with charts and graphs
- **Professional design**: Charts, trend lines, and people icons
- **Responsive sizing**: Adapts to screen size

### Responsive Breakpoints
- **Desktop**: > 1024px (side-by-side layout)
- **Tablet**: 768px - 1024px (stacked layout)
- **Mobile**: < 768px (optimized for small screens)

### CSS Features
- **Flexbox Layout**: Modern layout techniques
- **CSS Grid**: For responsive design
- **Smooth Transitions**: Hover effects and animations
- **Google Fonts**: Inter font family
- **Accessibility**: High contrast and reduced motion support
- **Cross-browser**: Compatible with all modern browsers

## CSS Architecture

### Base Styles
- Reset and normalize
- Typography with Inter font
- Color scheme with Arihant green palette

### Component Styles
- Header with gradient background
- Login card with shadow effects
- Form inputs with focus states
- Button with gradient and hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints at 480px, 768px, and 1024px
- Flexible layout using Flexbox

### Animations
- Fade-in animation for cards
- Smooth hover transitions
- Transform effects on interaction

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
