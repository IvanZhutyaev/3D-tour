// Example configuration with placeholder images
// This demonstrates how to structure your tour configuration
export const exampleTourConfig = {
    title: "Virtual Tour Demo",
    description: "Navigate through different scenes using hotspots",
    
    scenes: [
        {
            id: 'entrance',
            name: 'Entrance Hall',
            image: '/images/entrance.jpg',
            initialLon: 0,
            initialLat: 0,
            description: 'Welcome to the entrance',
            hotspots: [
                {
                    lon: 45,
                    lat: 0,
                    targetScene: 1,
                    title: 'Living Room',
                    description: 'Go to the living room'
                },
                {
                    lon: -90,
                    lat: 0,
                    targetScene: 2,
                    title: 'Kitchen',
                    description: 'Go to the kitchen'
                }
            ]
        },
        {
            id: 'living-room',
            name: 'Living Room',
            image: '/images/living-room.jpg',
            initialLon: 90,
            initialLat: 0,
            description: 'Spacious living area',
            hotspots: [
                {
                    lon: 180,
                    lat: 0,
                    targetScene: 0,
                    title: 'Entrance',
                    description: 'Back to entrance'
                },
                {
                    lon: 45,
                    lat: 0,
                    targetScene: 2,
                    title: 'Kitchen',
                    description: 'Go to kitchen'
                }
            ]
        },
        {
            id: 'kitchen',
            name: 'Kitchen',
            image: '/images/kitchen.jpg',
            initialLon: -45,
            initialLat: 0,
            description: 'Modern kitchen space',
            hotspots: [
                {
                    lon: 135,
                    lat: 0,
                    targetScene: 0,
                    title: 'Entrance',
                    description: 'Back to entrance'
                },
                {
                    lon: -135,
                    lat: 0,
                    targetScene: 1,
                    title: 'Living Room',
                    description: 'Back to living room'
                }
            ]
        }
    ]
};
