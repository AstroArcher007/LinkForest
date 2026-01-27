/**
 * profile.js
 * Simulates the public viewing experience.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mock Data (This represents what would come from the database)
    const publicProfileData = {
        username: "AlexCarter",
        bio: "Digital Artist & Developer | Welcome to my digital forest.",
        profilePic: "", // Add a URL here if you want an image, otherwise it shows initials
        links: [
            { title: "My Portfolio", url: "https://example.com" },
            { title: "Instagram", url: "https://instagram.com" },
            { title: "Twitter", url: "https://twitter.com" },
            { title: "YouTube Channel", url: "https://youtube.com" },
            { title: "Email Me", url: "mailto:alex@example.com" }
        ]
    };

    // 2. Render the Leaf
    if (window.renderLeafLayout) {
        window.renderLeafLayout('leafContainer', publicProfileData);
    } else {
        console.error("Leaf renderer not found. Check your script tags!");
    }
});