<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your LinkForest</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="create.css">
</head>
<body class="dark-mode">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-opacity-80">
        <nav class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    <span class="text-2xl font-bold">LinkForest</span>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-6">
                    <button class="text-sm font-medium hover:text-green-500 transition" onclick="window.history.length > 1 ? window.history.back() : window.location.href='index.html'">← Back</button>
                    <a href="contact.html" class="hover:text-green-500 transition">Contact Us</a>
                    <button class="hover:text-green-500 transition" id="signOutBtn">Sign Out</button>
                    <button class="theme-btn" id="themeToggle">
                        <span class="theme-icon">☀️</span>
                    </button>
                </div>

                <!-- Mobile Hamburger -->
                <div class="md:hidden flex items-center space-x-4">
                    <button class="theme-btn" id="themeToggleMobile">
                        <span class="theme-icon">☀️</span>
                    </button>
                    <div class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div class="mobile-menu md:hidden" id="mobileMenu">
                <div class="flex flex-col space-y-4 mt-4 pb-4">
                    <a href="contact.html" class="hover:text-green-500 transition">Contact Us</a>
                    <button class="hover:text-green-500 transition text-left" id="signOutBtnMobile">Sign Out</button>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-6 py-24">
        <h1 class="text-4xl md:text-5xl font-bold mb-8 text-center">
            Create Your <span class="text-green-500">LinkForest</span>
        </h1>

        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Side - Preview -->
            <div class="lg:w-1/2">
                <div class="card p-6 rounded-2xl sticky top-24">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold">Preview</h2>
                        <div class="flex gap-2">
                            <button class="device-btn active" data-device="mobile" title="Mobile View">
                                📱
                            </button>
                            <button class="device-btn" data-device="tablet" title="Tablet View">
                                📱🔄
                            </button>
                            <button class="device-btn" data-device="desktop" title="Desktop View">
                                💻
                            </button>
                        </div>
                    </div>

                    <!-- Device Preview Frame -->
                    <div class="preview-container" id="previewContainer">
                        <div class="preview-frame mobile" id="previewFrame">
                            <div class="preview-content" id="previewContent">
                                <!-- Profile Section -->
                                <div class="text-center mb-8">
                                    <div class="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto mb-4 flex items-center justify-center text-4xl">
                                        👤
                                    </div>
                                    <h3 class="text-2xl font-bold mb-2" id="previewUsername">@username</h3>
                                    <p class="opacity-80" id="previewBio">Your bio goes here...</p>
                                </div>

                                <!-- Links Section -->
                                <div class="space-y-3" id="previewLinks">
                                    <div class="preview-link-placeholder">
                                        Add your first link to see it here! ➡️
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side - Link Builder -->
            <div class="lg:w-1/2">
                <div class="card p-6 rounded-2xl mb-6">
                    <h2 class="text-2xl font-bold mb-6">Profile Information</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block mb-2 text-sm font-medium">Username</label>
                            <input type="text" id="username" class="input-field w-full" placeholder="@yourname" maxlength="30">
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium">Bio</label>
                            <textarea id="bio" class="input-field w-full" rows="3" placeholder="Tell us about yourself..." maxlength="150"></textarea>
                        </div>
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-2xl font-bold">Your Links</h2>
                        <button class="accent-btn px-4 py-2 rounded-lg font-semibold text-sm" id="addLinkBtn">
                            + Add Link
                        </button>
                    </div>

                    <!-- Links Container -->
                    <div class="space-y-4" id="linksContainer">
                        <div class="text-center opacity-60 py-8">
                            Click "Add Link" to start building your LinkForest
                        </div>
                    </div>

                    <!-- Save Button -->
                    <button class="accent-btn w-full py-3 rounded-lg font-semibold mt-6" id="saveBtn">
                        Save LinkForest
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification Area -->
    <div id="notificationArea" class="notification-area"></div>

    <script type="module" src="create.js"></script>
</body>
</html>
