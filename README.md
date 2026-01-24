# 3D Panoramic Tour

A lightweight, customizable tool for creating interactive 3D tours based on Three.js. Transform your panoramic photos into immersive web tours with smooth navigation, interactive hotspots, and a modern interface.

![Three.js](https://img.shields.io/badge/Three.js-0.160-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🌐 **360° Panoramic Views** - Full spherical panorama support
- 🎯 **Interactive Hotspots** - Navigate between scenes with clickable hotspots
- 📱 **Mobile Friendly** - Touch controls and responsive design
- 🎨 **Customizable UI** - Easy to style and modify
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🖱️ **Smooth Controls** - Mouse drag, touch drag, and zoom
- 🔄 **Easy Configuration** - Simple JSON-based scene setup

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your tour!

### Adding Your Panoramas

1. **Create the images directory:**
```bash
mkdir public
mkdir public\images
```

2. **Add your panoramic photos** to `public/images/`:
   - Use equirectangular projection (360° x 180°)
   - Recommended resolution: 4096x2048 or higher
   - Supported formats: JPG, PNG

3. **Configure your tour** in `src/tourConfig.js`:
```javascript
export const tourConfig = {
    scenes: [
        {
            name: 'Your Scene Name',
            image: '/images/your-panorama.jpg',
            initialLon: 0,
            initialLat: 0,
            hotspots: [
                {
                    lon: 45,
                    lat: 0,
                    targetScene: 1,
                    title: 'Next Room'
                }
            ]
        }
    ]
};
```

## Project Structure

```
3D-tour/
├── public/
│   └── images/          # Your panoramic images
├── src/
│   ├── PanoramaTour.js  # Main tour class
│   └── tourConfig.js    # Tour configuration
├── index.html           # Main HTML file
├── main.js             # Application entry point
├── style.css           # Styles
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
├── SETUP.md           # Detailed setup guide
└── README.md          # This file
```

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Look Around | Mouse Drag | Touch Drag |
| Zoom | Mouse Wheel | Pinch |
| Navigate | Click Hotspots | Tap Hotspots |
| Change Scene | Click Scene List | Tap Scene List |
| Fullscreen | Click Button | Tap Button |

## Configuration Guide

### Scene Properties

- **name**: Display name for the scene
- **image**: Path to panoramic image
- **initialLon**: Initial horizontal viewing angle (0-360°)
- **initialLat**: Initial vertical viewing angle (-90° to 90°)
- **hotspots**: Array of navigation points

### Hotspot Properties

- **lon**: Horizontal position on sphere (0-360°)
- **lat**: Vertical position on sphere (-90° to 90°)
- **targetScene**: Index of destination scene
- **title**: Hotspot label/description

### Coordinate System

```
Longitude (lon):
  0° = Front
  90° = Right
  180° = Back
  270° (-90°) = Left

Latitude (lat):
  90° = Up
  0° = Eye level
  -90° = Down
```

## Building for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` folder, ready to deploy.

## Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
```bash
npm install -g vercel
vercel --prod
```

## Creating Panoramic Photos

### Using a Smartphone
- **Google Street View** (iOS/Android)
- **Panorama 360** (iOS/Android)
- **Cardboard Camera** (Android)

### Using a DSLR
1. Take overlapping photos in a circle
2. Stitch using software:
   - **Hugin** (Free, open-source)
   - **PTGui** (Professional)
   - **Adobe Photoshop** (Photo Merge)

### Using 360° Cameras
- Ricoh Theta series
- Insta360 series
- GoPro MAX

## Customization

### Styling
Modify `style.css` to change:
- Colors and transparency
- Button styles
- Hotspot appearance
- Loading screen
- Panel layouts

### Functionality
Extend `src/PanoramaTour.js` to add:
- Custom hotspot types
- Audio narration
- Mini-map display
- Auto-rotation mode
- VR/XR support
- Analytics tracking

## Advanced Features

### Auto-Rotation
Add to `PanoramaTour.js` `update()` method:
```javascript
if (!this.isUserInteracting) {
    this.lon += 0.1; // Adjust speed
}
```

### Custom Hotspot Styles
Modify hotspot creation in `addHotspots()`:
```javascript
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000, // Red hotspots
    transparent: true,
    opacity: 0.8
});
```

## Troubleshooting

**Images not loading?**
- Verify paths in `tourConfig.js`
- Check images are in `public/images/`
- Ensure correct file extensions

**Poor performance?**
- Compress panoramic images
- Reduce image resolution
- Limit hotspots per scene

**Hotspots not clickable?**
- Check coordinate values
- Verify targetScene indices
- Ensure camera can see hotspot location

## Documentation

For detailed setup instructions, see [SETUP.md](SETUP.md)

## Technologies

- [Three.js](https://threejs.org/) - 3D graphics library
- [Vite](https://vitejs.dev/) - Build tool and dev server
- Vanilla JavaScript - No framework dependencies

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - See [LICENSE](LICENSE) file for details

## Credits

Created with Three.js and modern web technologies. Perfect for virtual tours, real estate showcases, museum exhibits, and educational content.

---

**Ready to start?** Check out [SETUP.md](SETUP.md) for step-by-step instructions!
