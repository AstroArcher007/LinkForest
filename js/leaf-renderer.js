/**
 * leaf-renderer.js
 * Visual Engine for LinkForest Leaf Layout
 * Fixed: Trunk starts dynamically below content (No overlapping text)
 */
function renderLeafLayout(containerId, userData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Reset Container
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.id = 'leafWrapper';
    wrapper.className = 'relative w-full min-h-full flex flex-col items-center pt-8 pb-12';
    container.appendChild(wrapper);

    // 2. SVG Layer
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = 'leafSvg';
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '0';
    wrapper.appendChild(svg);

    // 3. Profile Header (Added ID 'leafHeader' for measuring)
    const header = document.createElement('div');
    header.id = 'leafHeader'; 
    header.className = 'relative z-10 flex flex-col items-center mb-6'; // Reduced margin since line handles gap
    header.innerHTML = `
        <div class="w-24 h-24 rounded-full p-1 bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.5)] mb-3">
            <div class="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-3xl overflow-hidden">
                ${userData.profilePic 
                    ? `<img src="${userData.profilePic}" class="w-full h-full object-cover">` 
                    : `<span class="text-white">${userData.username ? userData.username[0].toUpperCase() : 'U'}</span>`
                }
            </div>
        </div>
        <h2 class="text-2xl font-bold text-white drop-shadow-md text-center break-words px-4">
            @${userData.username}
        </h2>
        <p class="text-gray-400 text-sm mt-1 max-w-[280px] text-center leading-relaxed px-4">
            ${userData.bio || ''}
        </p>
    `;
    wrapper.appendChild(header);

    // 4. Link Nodes
    if (userData.links && userData.links.length > 0) {
        userData.links.forEach((link, index) => {
            const btn = document.createElement('a');
            btn.href = link.url;
            btn.target = "_blank";
            btn.id = `node-${index}`;
            
            // Style
            btn.className = `
                relative z-10 flex items-center justify-center text-center
                w-40 md:w-48 py-3 px-4 mb-10
                bg-white/5 backdrop-blur-md 
                border border-green-500/30 rounded-full 
                text-white text-sm font-medium
                transition-all duration-200
                hover:scale-105 hover:bg-green-500/40 hover:border-green-400 
                hover:shadow-[0_0_15px_rgba(16,185,129,0.6)]
            `;
            btn.innerHTML = `<span class="truncate drop-shadow-sm">${link.title}</span>`;

            if (index % 2 === 0) {
                btn.style.marginRight = 'auto';
                btn.style.marginLeft = '10%';
            } else {
                btn.style.marginLeft = 'auto';
                btn.style.marginRight = '10%';
            }

            btn.addEventListener('mouseenter', () => highlightVein(index, true));
            btn.addEventListener('mouseleave', () => highlightVein(index, false));

            wrapper.appendChild(btn);
        });

        // Draw veins AFTER elements are rendered
        setTimeout(() => drawVeins(userData.links.length), 50);
        window.addEventListener('resize', () => drawVeins(userData.links.length));
    }
}

function drawVeins(count) {
    const svg = document.getElementById('leafSvg');
    const wrapper = document.getElementById('leafWrapper');
    const header = document.getElementById('leafHeader');
    
    if (!svg || !wrapper || !header) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.width / 2;

    // --- SMART TRUNK START ---
    // Measure where the header ends so the line starts BELOW it
    const headerRect = header.getBoundingClientRect();
    
    // Calculate Top: Bottom of header relative to wrapper + 15px padding
    const spineTop = (headerRect.bottom - wrapperRect.top) + 15;

    // Calculate Bottom: Bottom of last node
    const lastNode = document.getElementById(`node-${count - 1}`);
    let spineBottom = spineTop + 100; // Default min height
    if (lastNode) {
        spineBottom = (lastNode.getBoundingClientRect().bottom - wrapperRect.top) + 20;
    }

    // Draw Spine
    const spine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    spine.setAttribute("d", `M ${centerX} ${spineTop} L ${centerX} ${spineBottom}`);
    spine.setAttribute("stroke", "#10b981");
    spine.setAttribute("stroke-width", "2");
    spine.setAttribute("stroke-opacity", "0.3");
    spine.setAttribute("fill", "none");
    svg.appendChild(spine);

    // Draw Branches
    for (let i = 0; i < count; i++) {
        const node = document.getElementById(`node-${i}`);
        const rect = node.getBoundingClientRect();
        
        const nodeY = (rect.top - wrapperRect.top) + (rect.height / 2);
        const isLeft = (rect.left - wrapperRect.left) < centerX;
        
        const startX = centerX;
        // Start branch at node height (creates perpendicular look)
        const startY = nodeY; 
        const endX = isLeft ? (rect.right - wrapperRect.left) : (rect.left - wrapperRect.left);
        const endY = nodeY;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.id = `vein-${i}`;
        
        // Smoother Bezier Curve
        // Start at spine -> Curve Out -> Connect to Node
        // Control Point 1: Keeps line vertical on spine for a bit
        // Control Point 2: Smooths entry into button
        
        // If the node is HIGHER than where spine starts (rare edge case), clamp it
        const safeStartY = Math.max(startY, spineTop);

        const cp1x = centerX;
        const cp2x = (centerX + endX) / 2;
        
        path.setAttribute("d", `M ${startX} ${safeStartY} C ${cp1x} ${nodeY}, ${cp2x} ${nodeY}, ${endX} ${endY}`);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#10b981");
        path.setAttribute("stroke-width", "1.5");
        path.setAttribute("stroke-opacity", "0.4");
        path.setAttribute("class", "transition-all duration-300");

        svg.appendChild(path);
    }
}

function highlightVein(index, active) {
    const vein = document.getElementById(`vein-${index}`);
    if (vein) {
        if (active) {
            vein.setAttribute("stroke-width", "4");
            vein.setAttribute("stroke-opacity", "1");
            vein.setAttribute("stroke", "#34d399"); 
            vein.setAttribute("filter", "drop-shadow(0 0 8px #34d399)"); 
        } else {
            vein.setAttribute("stroke-width", "1.5");
            vein.setAttribute("stroke-opacity", "0.4");
            vein.setAttribute("stroke", "#10b981"); 
            vein.removeAttribute("filter");
        }
    }
}

window.renderLeafLayout = renderLeafLayout;