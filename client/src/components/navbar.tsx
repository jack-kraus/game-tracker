import React from 'react';

export function Navbar() {
    return (
        <nav>
            <a href="/"><img src="images/logo_white.svg" alt="logo"/></a>
            <ul>
                <li><a href="/feed">Feed</a></li>
                <li><a href="/post">Post</a></li>
                <li><a href="/search">Search</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    );
}