/**
 * Configuration validator for tour config
 * Helps catch common configuration errors
 */

export class ConfigValidator {
    constructor(config) {
        this.config = config;
        this.errors = [];
        this.warnings = [];
    }
    
    validate() {
        this.validateScenes();
        this.validateHotspots();
        this.validateImages();
        this.checkCircularReferences();
        
        return {
            isValid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings
        };
    }
    
    validateScenes() {
        if (!this.config.scenes || !Array.isArray(this.config.scenes)) {
            this.errors.push('Config must have a "scenes" array');
            return;
        }
        
        if (this.config.scenes.length === 0) {
            this.errors.push('At least one scene is required');
            return;
        }
        
        this.config.scenes.forEach((scene, index) => {
            this.validateScene(scene, index);
        });
    }
    
    validateScene(scene, index) {
        const sceneLabel = `Scene ${index} (${scene.name || 'unnamed'})`;
        
        // Required fields
        if (!scene.name) {
            this.warnings.push(`${sceneLabel}: Missing "name" field`);
        }
        
        if (!scene.image) {
            this.errors.push(`${sceneLabel}: Missing "image" field`);
        }
        
        // Optional but recommended fields
        if (scene.initialLon === undefined) {
            this.warnings.push(`${sceneLabel}: Missing "initialLon" - will default to 0`);
        }
        
        if (scene.initialLat === undefined) {
            this.warnings.push(`${sceneLabel}: Missing "initialLat" - will default to 0`);
        }
        
        // Validate coordinate ranges
        if (scene.initialLon !== undefined) {
            if (scene.initialLon < -180 || scene.initialLon > 360) {
                this.warnings.push(
                    `${sceneLabel}: initialLon (${scene.initialLon}) is outside typical range (-180 to 360)`
                );
            }
        }
        
        if (scene.initialLat !== undefined) {
            if (scene.initialLat < -90 || scene.initialLat > 90) {
                this.errors.push(
                    `${sceneLabel}: initialLat (${scene.initialLat}) must be between -90 and 90`
                );
            }
        }
    }
    
    validateHotspots() {
        this.config.scenes.forEach((scene, sceneIndex) => {
            if (!scene.hotspots) {
                this.warnings.push(
                    `Scene ${sceneIndex} (${scene.name}): No hotspots defined - navigation limited`
                );
                return;
            }
            
            if (!Array.isArray(scene.hotspots)) {
                this.errors.push(
                    `Scene ${sceneIndex} (${scene.name}): hotspots must be an array`
                );
                return;
            }
            
            scene.hotspots.forEach((hotspot, hotspotIndex) => {
                this.validateHotspot(hotspot, sceneIndex, hotspotIndex, scene.name);
            });
        });
    }
    
    validateHotspot(hotspot, sceneIndex, hotspotIndex, sceneName) {
        const label = `Scene ${sceneIndex} (${sceneName}), Hotspot ${hotspotIndex}`;
        
        // Required fields
        if (hotspot.lon === undefined) {
            this.errors.push(`${label}: Missing "lon" coordinate`);
        }
        
        if (hotspot.lat === undefined) {
            this.errors.push(`${label}: Missing "lat" coordinate`);
        }
        
        if (hotspot.targetScene === undefined) {
            this.errors.push(`${label}: Missing "targetScene" index`);
        }
        
        // Validate coordinate ranges
        if (hotspot.lon !== undefined) {
            if (hotspot.lon < -180 || hotspot.lon > 360) {
                this.warnings.push(
                    `${label}: lon (${hotspot.lon}) is outside typical range (-180 to 360)`
                );
            }
        }
        
        if (hotspot.lat !== undefined) {
            if (hotspot.lat < -90 || hotspot.lat > 90) {
                this.errors.push(
                    `${label}: lat (${hotspot.lat}) must be between -90 and 90`
                );
            }
        }
        
        // Validate target scene
        if (hotspot.targetScene !== undefined) {
            if (!Number.isInteger(hotspot.targetScene)) {
                this.errors.push(`${label}: targetScene must be an integer`);
            } else if (hotspot.targetScene < 0) {
                this.errors.push(`${label}: targetScene cannot be negative`);
            } else if (hotspot.targetScene >= this.config.scenes.length) {
                this.errors.push(
                    `${label}: targetScene (${hotspot.targetScene}) exceeds number of scenes (${this.config.scenes.length})`
                );
            }
        }
        
        // Optional but recommended
        if (!hotspot.title) {
            this.warnings.push(`${label}: Missing "title" - consider adding for better UX`);
        }
    }
    
    validateImages() {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        
        this.config.scenes.forEach((scene, index) => {
            if (!scene.image) return;
            
            const hasValidExtension = imageExtensions.some(ext => 
                scene.image.toLowerCase().endsWith(ext)
            );
            
            if (!hasValidExtension) {
                this.warnings.push(
                    `Scene ${index} (${scene.name}): Image "${scene.image}" has unusual extension. ` +
                    `Supported: ${imageExtensions.join(', ')}`
                );
            }
            
            // Check for local file paths
            if (scene.image.startsWith('C:') || scene.image.startsWith('/Users/') || 
                scene.image.startsWith('/home/')) {
                this.errors.push(
                    `Scene ${index} (${scene.name}): Image path appears to be absolute file system path. ` +
                    `Use relative paths starting with / or ./`
                );
            }
        });
    }
    
    checkCircularReferences() {
        // Check if there are any scenes that can't be reached
        const reachable = new Set([0]); // Start scene is always reachable
        let changed = true;
        
        while (changed) {
            changed = false;
            this.config.scenes.forEach((scene, index) => {
                if (reachable.has(index) && scene.hotspots) {
                    scene.hotspots.forEach(hotspot => {
                        if (hotspot.targetScene !== undefined && 
                            !reachable.has(hotspot.targetScene)) {
                            reachable.add(hotspot.targetScene);
                            changed = true;
                        }
                    });
                }
            });
        }
        
        // Report unreachable scenes
        this.config.scenes.forEach((scene, index) => {
            if (!reachable.has(index)) {
                this.warnings.push(
                    `Scene ${index} (${scene.name}): Not reachable from starting scene (Scene 0)`
                );
            }
        });
    }
    
    printReport() {
        console.log('=== Tour Configuration Validation Report ===\n');
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ Configuration is valid with no issues!\n');
            return;
        }
        
        if (this.errors.length > 0) {
            console.log('❌ ERRORS:\n');
            this.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
            console.log('');
        }
        
        if (this.warnings.length > 0) {
            console.log('⚠️  WARNINGS:\n');
            this.warnings.forEach((warning, index) => {
                console.log(`${index + 1}. ${warning}`);
            });
            console.log('');
        }
        
        if (this.errors.length > 0) {
            console.log('❌ Configuration has errors that must be fixed.\n');
        } else {
            console.log('✅ Configuration is valid (with warnings).\n');
        }
    }
}

/**
 * Validate a tour configuration
 * @param {object} config - Tour configuration to validate
 * @returns {object} Validation result with isValid, errors, and warnings
 */
export function validateTourConfig(config) {
    const validator = new ConfigValidator(config);
    const result = validator.validate();
    validator.printReport();
    return result;
}
