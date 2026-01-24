// Tour configuration
// Replace image paths with your own panoramic photos
export const tourConfig = {
    scenes: [
        {
            name: 'Living Room',
            image: '/images/panorama1.jpg', // ✅ ИСПРАВЛЕНО: добавлен правильный путь
            initialLon: 0,
            initialLat: 0,
            hotspots: [
                // Хотспоты закомментированы, пока нет других сцен
                // Раскомментируйте, когда добавите panorama2.jpg и panorama3.jpg
                // {
                //     lon: 45,
                //     lat: 0,
                //     targetScene: 1,
                //     title: 'Go to Kitchen'
                // },
                // {
                //     lon: -90,
                //     lat: 0,
                //     targetScene: 2,
                //     title: 'Go to Bedroom'
                // }
            ]
        }
        // Добавьте больше сцен, когда у вас будет больше панорам:
        // {
        //     name: 'Kitchen',
        //     image: '/images/panorama2.jpg',
        //     initialLon: 180,
        //     initialLat: 0,
        //     hotspots: [
        //         {
        //             lon: 180,
        //             lat: 0,
        //             targetScene: 0,
        //             title: 'Back to Living Room'
        //         }
        //     ]
        // }
    ]
};
