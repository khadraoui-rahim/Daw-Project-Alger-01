// src/data/users.js
import saraAvatar from '../assets/images/users/sara.jpg';
import alexAvatar from '../assets/images/users/alex.jpg';
import jhonAvatar from '../assets/images/users/jhon.jpg';
import maryAvatar from '../assets/images/users/mary.jpg';
import davidAvatar from '../assets/images/users/david.jpg';

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
