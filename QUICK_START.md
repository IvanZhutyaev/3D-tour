# Quick Start Guide

Get your 3D panoramic tour running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- Three.js (3D graphics library)
- Vite (development server and build tool)

## Step 2: Add Your Panoramic Images

### Option A: Use Your Own Images

1. Create the public directory:
```bash
mkdir public
mkdir public\images
```

2. Copy your panoramic photos to `public\images\`:
   - `panorama1.jpg`
   - `panorama2.jpg`
   - `panorama3.jpg`

**Requirements:**
- Format: Equirectangular (360° x 180°)
- Aspect ratio: 2:1
- Recommended size: 4096x2048px or larger

### Option B: Use Placeholder Images

If you don't have panoramic images yet, you can use placeholder images from:
- https://www.flickr.com/search/?text=equirectangular
- https://polyhaven.com/hdris (free HDRIs)
- Create a test panorama with a smartphone app

## Step 3: Configure Your Tour

Edit `src/tourConfig.js`:

```javascript
export const tourConfig = {
    scenes: [
        {
            name: 'First Scene',
            image: '/images/panorama1.jpg',
            initialLon: 0,
            initialLat: 0,
            hotspots: [
                {
                    lon: 90,
                    lat: 0,
                    targetScene: 1,
                    title: 'Go to Second Scene'
                }
            ]
        },
        {
            name: 'Second Scene',
            image: '/images/panorama2.jpg',
            initialLon: 180,
            initialLat: 0,
            hotspots: [
                {
                    lon: 0,
                    lat: 0,
                    targetScene: 0,
                    title: 'Back to First Scene'
                }
            ]
        }
    ]
};
```

## Step 4: Start Development Server

```bash
npm run dev
```

The tour will open automatically at `http://localhost:3000`

## Step 5: Navigate Your Tour

- **Look around**: Click and drag with mouse
- **Zoom**: Use mouse wheel
- **Navigate**: Click white hotspots to move between scenes
- **Change scenes**: Use the scene list on the right

## Next Steps

### Customize the Appearance

Edit `style.css` to change:
- Colors
- Button styles
- Panel positions
- Hotspot appearance

### Add More Scenes

1. Add more images to `public/images/`
2. Add more scene objects to `tourConfig.js`
3. Connect scenes with hotspots

### Position Hotspots Correctly

Use these coordinates as a starting point:
- **Front**: lon: 0
- **Right**: lon: 90
- **Back**: lon: 180
- **Left**: lon: -90 or 270

Adjust `lat` to position vertically (0 = eye level)

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Common Issues

### "Cannot find module 'three'"
Run `npm install`

### Images not showing
- Check paths in `tourConfig.js`
- Ensure images are in `public/images/`
- Check browser console for errors

### Hotspots not visible
- Adjust lon/lat coordinates
- Make sure targetScene index is correct
- Check if you're looking in the right direction

## Tips for Best Results

1. **Image Quality**: Higher resolution = better quality, but larger file size
2. **File Size**: Compress images to balance quality and loading speed
3. **Naming**: Use descriptive scene names for better navigation
4. **Hotspot Placement**: Position hotspots where users naturally look
5. **Testing**: Test on both desktop and mobile devices

## Need Help?

- Check [SETUP.md](SETUP.md) for detailed instructions
- Read [README.md](README.md) for full documentation
- Review example configuration in `public/example-config.js`

## Creating Your First Panorama

Don't have panoramic photos? Try these free tools:

**Smartphone Apps:**
- Google Street View (iOS/Android) - Free
- Panorama 360 (iOS/Android) - Free

**Desktop Software:**
- Hugin (Windows/Mac/Linux) - Free
- Microsoft ICE (Windows) - Free

**Online Services:**
- Momento360 - Free tier available
- Kuula - Free tier available

---

**You're ready to go!** Start the development server and see your tour in action. 🚀
