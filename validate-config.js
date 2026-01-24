/**
 * Standalone configuration validator script
 * Run with: node validate-config.js
 */

import { validateTourConfig } from './src/configValidator.js';
import { tourConfig } from './src/tourConfig.js';

console.log('Validating tour configuration...\n');

const result = validateTourConfig(tourConfig);

if (result.isValid) {
    console.log('🎉 Your configuration is ready to use!\n');
    console.log('Next steps:');
    console.log('1. Ensure your panoramic images are in public/images/');
    console.log('2. Run: npm run dev');
    console.log('3. Open http://localhost:3000 in your browser\n');
    process.exit(0);
} else {
    console.log('Please fix the errors above before running your tour.\n');
    process.exit(1);
}
