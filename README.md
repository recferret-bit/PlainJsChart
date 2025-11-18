# PureJsGradientChart

A lightweight, animated line chart visualization built with vanilla JavaScript and HTML5 Canvas. Features smooth gradient fills and animated line drawing.

![Screenshot_20230202_013738](https://user-images.githubusercontent.com/111155312/216302594-7173d2f0-7f98-4088-97a7-a6500a1c1627.png)

## Features

- **Pure JavaScript** - No external dependencies or frameworks required
- **Dual Canvas Rendering** - Separate layers for chart line and gradient fill
- **Animated Drawing** - Smooth line animation using linear interpolation (lerp)
- **Gradient Fill** - Vertical gradient lines from data points to x-axis
- **Responsive Design** - Canvas-based rendering with coordinate system

## Project Structure

```
PlainJsChart/
├── index.html          # Main HTML file with dual canvas setup
├── styles.css          # CSS styling for canvas layers
├── js/
│   └── index.js        # Core chart rendering logic
└── README.md
```

## How It Works

### Dual Canvas Architecture

The chart uses two stacked canvases:
- **Canvas 1** (z-index: 1) - Draws the coordinate system and main chart line
- **Canvas 2** (z-index: 2) - Renders vertical gradient lines for visual effect

### Animation System

The chart animates in segments:
1. Uses linear interpolation (lerp) to smoothly draw between data points
2. Incrementally renders the line at ~60fps (16ms intervals)
3. Fills vertical gradient lines as the main line progresses

### Key Functions

- `drawChart()` - Main animation loop that interpolates between data points
- `drawVerticalLine(fromX, fromY)` - Draws gradient lines from chart to x-axis
- `translateCoordinates(x1, y1)` - Converts data coordinates to canvas coordinates
- `lerp(x, y, a)` - Linear interpolation function for smooth animation
- `drawCoordinates()` - Renders the x and y axes

## Data Configuration

Chart data is defined in `js/index.js`:

```javascript
const chartPositionsX = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
const chartPositionsY = [100, 60, 50, 100, 120, 200, 90, 160, 220, 300, 400, 350, 320, 300, 250, 100];
```

- **chartPositionsX**: X-axis positions for each data point
- **chartPositionsY**: Y-axis values for each data point

## Customization

### Change Chart Colors

Modify the line color in `drawChart()`:
```javascript
ctx1.strokeStyle = 'blue'; // Change to any color
```

Modify the gradient colors in `drawVerticalLine()`:
```javascript
gradient.addColorStop(0, "rgba(0, 0, 255, 0.3)"); // Top color
gradient.addColorStop(1, "rgba(0, 0, 255, 0.1)"); // Bottom color
```

### Adjust Animation Speed

Change the animation speed by modifying:
- **Interval timing**: `setInterval(() => {...}, 16)` - Change 16ms to desired value
- **Interpolation step**: `t += 0.3` - Increase for faster drawing, decrease for slower

### Canvas Size

Modify dimensions in `index.html`:
```html
<canvas height='1000' width='1000' id='canvas1'></canvas>
```

And update constants in `js/index.js`:
```javascript
const maxHeight = 800, maxWidth = 800;
```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Watch the animated chart render

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript (const, arrow functions, template literals)

## Technical Details

- **Coordinate System**: Origin at bottom-left (10, 800), with y-axis inverted for canvas
- **Line Drawing**: Uses canvas `lineTo()` with `lineCap: 'round'` for smooth edges
- **Gradient**: Linear gradient created with `createLinearGradient()` for vertical fill effect
- **Performance**: Renders at ~60fps using 16ms interval timing

## License

Open source - feel free to use and modify.
