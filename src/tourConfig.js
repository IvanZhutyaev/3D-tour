// Tour configuration
// Replace image paths with your own panoramic photos
export const tourConfig = {
    scenes: [
        {
            name: 'Living Room',
            image: 'panorama1.jpg', // Replace with your panoramic image
            initialLon: 0,
            initialLat: 0,
            hotspots: [
                {
                    lon: 45,  // Longitude position on sphere
                    lat: 0,   // Latitude position on sphere
                    targetScene: 1, // Index of target scene
                    title: 'Go to Kitchen'
                },
                {
                    lon: -90,
                    lat: 0,
                    targetScene: 2,
                    title: 'Go to Bedroom'
                }
            ]
        },
        {
            name: 'Kitchen',
            image: '/images/panorama2.jpg',
            initialLon: 180,
            initialLat: 0,
            hotspots: [
                {
                    lon: 180,
                    lat: 0,
                    targetScene: 0,
                    title: 'Back to Living Room'
                }
            ]
        },
        {
            name: 'Bedroom',
            image: '/images/panorama3.jpg',
            initialLon: 90,
            initialLat: 0,
            hotspots: [
                {
                    lon: 90,
                    lat: 0,
                    targetScene: 0,
                    title: 'Back to Living Room'
                }
            ]
        }
    ]
};
