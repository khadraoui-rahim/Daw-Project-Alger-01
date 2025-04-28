export const posts = [
    {
        id: 1,
        userId: 101, // link to a user
        image: 'https://picsum.photos/id/237/1200/1200', // or your own images
        caption: 'Sunset vibes 🌅',
        likes: 4,
        comments: [
            { id: 1, userId: 102, text: 'Amazing!' },
            { id: 2, userId: 103, text: 'Beautiful shot!' }
        ],
        timestamp: '2025-04-26T14:00:00Z'
    },
    {
        id: 2,
        userId: 102,
        image: 'https://picsum.photos/id/14/1200/1200',
        caption: 'At the beach 🏖️',
        likes: 2,
        comments: [],
        timestamp: '2025-04-26T12:00:00Z'
    },
    {
        id: 3,
        userId: 103,
        image: 'https://picsum.photos/id/239/1200/1200',
        caption: 'Mountain view 🌄',
        likes: 1,
        comments: [
            { id: 1, userId: 101, text: 'Lovely!' },
            { id: 2, userId: 102, text: 'Perfect!' }
        ],
        timestamp: '2025-04-26T10:00:00Z'
    },
    {
        id: 4,
        userId: 104,
        image: 'https://picsum.photos/id/240/1200/1200',
        caption: 'Cityscape 🌃',
        likes: 3,
        comments: [
            { id: 1, userId: 101, text: 'Stunning!' },
            { id: 2, userId: 103, text: 'Awesome!' }
        ],
        timestamp: '2025-04-26T08:00:00Z'
    },
    {
        id: 5,
        userId: 105,
        image: 'https://picsum.photos/id/241/1200/1200',
        caption: 'Nature walk 🌿',
        likes: 2,
        comments: [
            { id: 1, userId: 101, text: 'Lovely!' },
            { id: 2, userId: 102, text: 'Perfect!' }
        ],
        timestamp: '2025-04-26T06:00:00Z'
    }
];
