# Project Structure

Complete overview of the 3D Panoramic Tour project files and directories.

## Directory Tree

```
3D-tour/
├── public/                      # Static assets
│   ├── images/                  # Panoramic images (create this)
│   │   ├── panorama1.jpg       # Your panoramic photos
│   │   ├── panorama2.jpg
│   │   └── panorama3.jpg
│   └── example-config.js       # Example configuration
│
├── src/                        # Source code
│   ├── PanoramaTour.js        # Main tour engine
│   ├── tourConfig.js          # Tour configuration
│   ├── configValidator.js     # Configuration validator
│   └── utils.js               # Utility functions
│
├── index.html                  # Main HTML entry point
├── main.js                     # Application initialization
├── style.css                   # Styles and UI
├── vite.config.js             # Vite build configuration
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependencies
│
├── demo-standalone.html       # Standalone demo (no build needed)
├── validate-config.js         # Configuration validation script
│
├── .gitignore                 # Git ignore rules
├── .npmrc                     # NPM configuration
│
├── README.md                  # Main documentation
├── QUICK_START.md            # Quick start guide
├── SETUP.md                  # Detailed setup instructions
├── CONTRIBUTING.md           # Contribution guidelines
├── PROJECT_STRUCTURE.md      # This file
└── LICENSE                   # MIT License
```

## File Descriptions

### Core Application Files

#### `index.html`
- Main HTML template
- Defines UI structure
- Contains canvas, controls, scene list, info panel
- Loads main.js as entry point

#### `main.js`
- Application initialization
- Sets up UI event listeners
- Creates PanoramaTour instance
- Handles button clicks and scene switching

#### `style.css`
- Complete styling for the application
- Responsive design rules
- Control button styles
- Loading screen animation
- Hotspot appearance

### Source Code (`src/`)

#### `PanoramaTour.js`
**Main tour engine class**
- Scene management
- Camera controls
- Mouse/touch interaction
- Hotspot creation and detection
- Texture loading
- Animation loop

**Key Methods:**
- `loadScene(index)` - Load a specific scene
- `addHotspots(hotspots)` - Create hotspot meshes
- `update()` - Update camera position
- `animate()` - Animation loop
- `zoomIn()` / `zoomOut()` - Zoom controls

#### `tourConfig.js`
**Tour configuration**
- Defines all scenes
- Sets panoramic image paths
- Configures hotspots
- Sets initial camera positions

**Structure:**
```javascript
{
    scenes: [
        {
            name: string,
            image: string,
            initialLon: number,
            initialLat: number,
            hotspots: [...]
        }
    ]
}
```

#### `configValidator.js`
**Configuration validation utilities**
- Validates scene structure
- Checks hotspot coordinates
- Verifies image paths
- Detects unreachable scenes
- Reports errors and warnings

**Usage:**
```javascript
import { validateTourConfig } from './src/configValidator.js';
validateTourConfig(config);
```

#### `utils.js`
**Helper functions**
- Coordinate conversions
- Distance calculations
- Image preloading
- Math utilities (clamp, lerp)
- Browser detection
- Fullscreen helpers

### Configuration Files

#### `package.json`
**Node.js project configuration**
- Dependencies: three, vite
- Scripts: dev, build, preview, validate
- Project metadata

#### `vite.config.js`
**Vite build tool configuration**
- Development server settings
- Build output configuration
- Asset handling
- Code splitting rules

#### `.gitignore`
**Git ignore rules**
- node_modules/
- dist/
- Build artifacts
- Log files

#### `.npmrc`
**NPM configuration**
- Package manager settings
- Ensures exact versions

### Documentation

#### `README.md`
**Main documentation**
- Project overview
- Features list
- Quick start guide
- Configuration examples
- Deployment instructions

#### `QUICK_START.md`
**5-minute quick start**
- Installation steps
- Adding images
- Configuration basics
- First run instructions

#### `SETUP.md`
**Detailed setup guide**
- Prerequisites
- Installation
- Panorama requirements
- Configuration details
- Customization options
- Troubleshooting

#### `CONTRIBUTING.md`
**Contribution guidelines**
- Development workflow
- Code style
- Feature requests
- Bug reports
- Pull request process

#### `PROJECT_STRUCTURE.md`
**This file**
- Complete project overview
- File descriptions
- Directory organization

### Demo Files

#### `demo-standalone.html`
**Standalone demonstration**
- Works without build process
- Uses CDN for Three.js
- Generated gradient panorama
- Basic controls
- Good for testing

#### `public/example-config.js`
**Example configuration**
- Shows proper structure
- Multiple scenes
- Hotspot examples
- Best practices

#### `validate-config.js`
**Configuration validator script**
- Standalone validation tool
- Run with: `node validate-config.js`
- Checks tourConfig.js
- Reports errors/warnings

## Asset Organization

### Images (`public/images/`)

**Recommended structure:**
```
public/images/
├── scene-01-entrance.jpg
├── scene-02-living-room.jpg
├── scene-03-kitchen.jpg
├── scene-04-bedroom.jpg
└── scene-05-bathroom.jpg
```

**Naming conventions:**
- Use descriptive names
- Include scene number/order
- Use lowercase with hyphens
- Keep names short but clear

**File requirements:**
- Format: Equirectangular projection
- Aspect ratio: 2:1
- Resolution: 4096x2048 or higher
- File format: JPG, PNG, or WebP
- Optimize for web (compress)

## Build Output

When you run `npm run build`, Vite creates:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── three-[hash].js
└── images/
    └── (copied from public/images/)
```

This `dist/` folder is ready for deployment to any static hosting service.

## Development Workflow

1. **Edit Configuration**
   - Modify `src/tourConfig.js`
   - Run `npm run validate` to check

2. **Add Images**
   - Place in `public/images/`
   - Update image paths in config

3. **Customize Appearance**
   - Edit `style.css`
   - Modify `index.html` structure

4. **Extend Functionality**
   - Edit `src/PanoramaTour.js`
   - Add new utilities to `src/utils.js`

5. **Test**
   - Run `npm run dev`
   - Test in browser
   - Check multiple scenes
   - Test on mobile

6. **Build**
   - Run `npm run build`
   - Test with `npm run preview`
   - Deploy `dist/` folder

## Adding New Features

### New Hotspot Types

1. Extend `addHotspots()` in `PanoramaTour.js`
2. Add new hotspot properties in `tourConfig.js`
3. Update validator in `configValidator.js`

### Audio Narration

1. Add audio files to `public/audio/`
2. Use Three.js Audio/AudioListener
3. Add audio property to scene config
4. Load and play in `loadScene()`

### Mini-Map

1. Create new component in `src/MiniMap.js`
2. Add HTML element in `index.html`
3. Style in `style.css`
4. Initialize in `main.js`

### VR Support

1. Install WebXR dependencies
2. Add VR button UI
3. Enable XR in renderer
4. Handle VR controllers

## Performance Considerations

**Image Optimization:**
- Compress panoramas (70-80% JPEG quality)
- Use progressive JPEG
- Consider WebP format
- Lazy load non-visible scenes

**Code Optimization:**
- Vite automatically code-splits
- Three.js is chunked separately
- Assets are hashed for caching

**Runtime Optimization:**
- Dispose old textures when changing scenes
- Limit hotspot count per scene
- Use requestAnimationFrame for smooth updates

## Security Notes

- No server-side code required
- All assets are static files
- Safe to deploy to any static host
- No authentication needed
- No database required

## Browser Compatibility

**Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 8+)

**Required Features:**
- WebGL
- ES6 Modules
- Canvas 2D API

## Getting Help

1. Check [QUICK_START.md](QUICK_START.md) for basics
2. Read [SETUP.md](SETUP.md) for detailed setup
3. Review [README.md](README.md) for full documentation
4. Check `demo-standalone.html` for working example
5. Run `npm run validate` to check configuration

## Next Steps

After understanding the structure:

1. ✅ Run `npm install`
2. ✅ Create `public/images/` directory
3. ✅ Add your panoramic photos
4. ✅ Configure `src/tourConfig.js`
5. ✅ Run `npm run validate`
6. ✅ Start with `npm run dev`
7. ✅ Customize `style.css`
8. ✅ Build with `npm run build`
9. ✅ Deploy to hosting

Happy touring! 🌐
