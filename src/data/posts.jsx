export const posts = [
    {
        id: 1,
        userId: 101, // link to a user
        image: 'https://picsum.photos/id/237/1200/1200', // or your own images
        caption: 'Sunset vibes 🌅',
        likes: 4,
        likedBy: [101, 102, 103, 105], // IDs of users who liked the post
        comments: [
            { id: 1, userId: 102, text: 'Amazing!', timestamp: '2025-04-26T14:00:00Z' },
            { id: 2, userId: 103, text: 'Beautiful shot!', timestamp: '2025-04-26T14:00:00Z' }
        ],
        timestamp: '2025-04-26T14:00:00Z'
    },
    {
        id: 2,
        userId: 102,
        image: 'https://picsum.photos/id/14/1200/1200',
        caption: 'At the beach 🏖️',
        likes: 2,
        likedBy: [101, 105],
        comments: [
            { id: 1, userId: 101, text: 'Lovely!', timestamp: '2025-04-26T12:00:00Z' },
            { id: 2, userId: 103, text: 'Perfect!', timestamp: '2025-04-26T12:00:00Z' }
        ],
        timestamp: '2025-04-26T12:00:00Z'
    },
    {
        id: 3,
        userId: 103,
        image: 'https://picsum.photos/id/239/1200/1200',
        caption: 'Mountain view 🌄',
        likes: 1,
        likedBy: [101],
        comments: [
            { id: 1, userId: 101, text: 'Lovely!', timestamp: '2025-04-26T10:00:00Z' },
            { id: 2, userId: 102, text: 'Perfect!', timestamp: '2025-04-26T10:00:00Z' },
            { id: 3, userId: 103, text: 'Great!', timestamp: '2025-04-26T10:00:00Z' },
            { id: 4, userId: 104, text: 'Awesome!', timestamp: '2025-04-26T10:00:00Z' }
        ],
        timestamp: '2025-04-26T10:00:00Z'
    },
    {
        id: 4,
        userId: 104,
        image: 'https://picsum.photos/id/240/1200/1200',
        caption: 'Cityscape 🌃',
        likes: 3,
        likedBy: [101, 102, 105],
        comments: [
            { id: 1, userId: 101, text: 'Stunning!', timestamp: '2025-04-26T08:00:00Z' },
            { id: 2, userId: 103, text: 'Awesome!', timestamp: '2025-04-26T08:00:00Z' }
        ],
        timestamp: '2025-04-26T08:00:00Z'
    },
    {
        id: 5,
        userId: 105,
        image: 'https://picsum.photos/id/241/1200/1200',
        caption: 'Nature walk 🌿',
        likes: 2,
        likedBy: [102, 103],
        comments: [
            { id: 1, userId: 101, text: 'Lovely!', timestamp: '2025-04-26T06:00:00Z' },
            { id: 2, userId: 102, text: 'Perfect!', timestamp: '2025-04-26T06:00:00Z' }
        ],
        timestamp: '2025-04-26T06:00:00Z'
    }
];
