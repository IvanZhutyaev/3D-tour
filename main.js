import * as THREE from 'three';
import { PanoramaTour } from './src/PanoramaTour.js';
import { tourConfig } from './src/tourConfig.js';

// Initialize the tour
const tour = new PanoramaTour('canvas', tourConfig);

// UI Controls
const fullscreenBtn = document.getElementById('fullscreen-btn');
const zoomInBtn = document.getElementById('zoom-in-btn');
const zoomOutBtn = document.getElementById('zoom-out-btn');
const infoBtn = document.getElementById('info-btn');
const closeInfoBtn = document.getElementById('close-info');
const infoPanel = document.getElementById('info-panel');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

zoomInBtn.addEventListener('click', () => tour.zoomIn());
zoomOutBtn.addEventListener('click', () => tour.zoomOut());

infoBtn.addEventListener('click', () => {
    infoPanel.classList.remove('hidden');
});

closeInfoBtn.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
});

// Generate scene buttons
const sceneButtonsContainer = document.getElementById('scene-buttons');
tourConfig.scenes.forEach((scene, index) => {
    const btn = document.createElement('button');
    btn.className = 'scene-btn';
    btn.textContent = scene.name;
    btn.addEventListener('click', () => {
        tour.loadScene(index);
        // Update active state
        document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
    if (index === 0) btn.classList.add('active');
    sceneButtonsContainer.appendChild(btn);
});

// Start the tour
tour.start();
