// src/data/users.js
// Use constants for external image URLs instead of imports
const saraAvatar = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const alexAvatar = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const jhonAvatar = 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const maryAvatar = 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const davidAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// Create a mapping for easier access

export const users = [
    {
        id: 101,
        username: "sara",
        password: "1234", // optional if you want a login feature
        avatar: saraAvatar
    },
    {
        id: 102,
        username: "alex",
        password: "1234",
        avatar: alexAvatar
    },
    {
        id: 103,
        username: "jhon",
        password: "1234",
        avatar: jhonAvatar
    },
    {
        id: 104,
        username: "mary",
        password: "1234",
        avatar: maryAvatar
    },
    {
        id: 105,
        username: "david",
        password: "1234",
        avatar: davidAvatar
    }
];
