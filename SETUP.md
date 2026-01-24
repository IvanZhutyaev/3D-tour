# 3D Tour Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Adding Your Panoramic Photos

1. Create an `images` folder in the public directory:
```bash
mkdir public
mkdir public/images
```

2. Add your panoramic photos to `public/images/`:
   - `panorama1.jpg` - First scene
   - `panorama2.jpg` - Second scene
   - `panorama3.jpg` - Third scene

3. **Panorama Requirements:**
   - Format: Equirectangular projection (360° x 180°)
   - Recommended resolution: 4096x2048 or higher
   - Aspect ratio: 2:1
   - Formats supported: JPG, PNG

## Creating Panoramic Photos

You can create panoramic photos using:
- **Mobile apps**: Google Street View, Panorama 360
- **DSLR**: Take overlapping photos and stitch with Hugin, PTGui
- **360° cameras**: Ricoh Theta, Insta360

## Configuration

Edit `src/tourConfig.js` to customize your tour:

```javascript
export const tourConfig = {
    scenes: [
        {
            name: 'Scene Name',
            image: '/images/your-panorama.jpg',
            initialLon: 0,    // Initial horizontal view (degrees)
            initialLat: 0,    // Initial vertical view (degrees)
            hotspots: [
                {
                    lon: 45,         // Hotspot position longitude
                    lat: 0,          // Hotspot position latitude
                    targetScene: 1,  // Target scene index
                    title: 'Go to Next Room'
                }
            ]
        }
    ]
};
```

### Understanding Coordinates

- **lon (Longitude)**: Horizontal position
  - 0° = Front
  - 90° = Right
  - 180° = Back
  - -90° = Left

- **lat (Latitude)**: Vertical position
  - 0° = Eye level
  - 45° = Looking up
  - -45° = Looking down

## Running the Project

### Development Mode
```bash
npm run dev
```
This will start a development server at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Output will be in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```

## Controls

- **Mouse Drag**: Look around the panorama
- **Mouse Wheel**: Zoom in/out
- **Touch Drag**: Look around (mobile)
- **Pinch**: Zoom (mobile)
- **Hotspots**: Click to navigate between scenes
- **Scene List**: Click scene names to jump directly

## Customization

### Styling
Edit `style.css` to customize the appearance:
- Control buttons
- Scene list panel
- Hotspot appearance
- Loading screen
- Colors and transparency

### Functionality
Modify `src/PanoramaTour.js` to add features:
- Custom hotspot types
- Audio narration
- Mini-map
- Auto-rotation
- VR mode support

## Tips

1. **Optimize Images**: Compress panoramas to reduce loading time
2. **Use HTTPS**: Required for fullscreen and some mobile features
3. **Test on Mobile**: Ensure touch controls work smoothly
4. **Logical Flow**: Plan hotspot placement for intuitive navigation
5. **Loading Feedback**: Ensure loading screen shows for large images

## Troubleshooting

### Images not loading
- Check file paths in `tourConfig.js`
- Ensure images are in `public/images/`
- Verify image format is supported

### Performance issues
- Reduce image resolution
- Limit number of hotspots per scene
- Use image compression tools

### Hotspots not visible
- Adjust lon/lat coordinates
- Check if camera is looking in the right direction
- Verify targetScene indices are correct

## Advanced Features

### Adding Audio
```javascript
// In PanoramaTour.js
const listener = new THREE.AudioListener();
this.camera.add(listener);
const sound = new THREE.Audio(listener);
```

### Auto-rotation
```javascript
// In update() method
if (!this.isUserInteracting) {
    this.lon += 0.1;
}
```

### VR Support
Consider integrating WebXR for VR headset support:
```bash
npm install three/examples/jsm/webxr/VRButton.js
```

## Deployment

### GitHub Pages
```bash
npm run build
# Deploy the dist folder
```

### Netlify
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
```bash
vercel --prod
```

## License

MIT License - feel free to use and modify for your projects!
