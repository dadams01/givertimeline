// Configuration
const DATA_FILE = 'data.json';

// State
let chapters = [];
let observer = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadChapters();
});

// Also scroll to top when page is fully loaded
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
});

// Prevent browser from restoring scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Load chapters from JSON file or inline data
async function loadChapters() {
    try {
        let data;
        
        // First, try to get inline data from script tag (works without server)
        const inlineDataScript = document.getElementById('timeline-data');
        if (inlineDataScript) {
            try {
                data = JSON.parse(inlineDataScript.textContent);
            } catch (e) {
                console.warn('Failed to parse inline data, trying external file...');
            }
        }
        
        // If no inline data, try to fetch from external file (requires server)
        if (!data) {
            try {
                const response = await fetch(DATA_FILE);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                data = await response.json();
            } catch (fetchError) {
                // Fallback to XMLHttpRequest (sometimes works better with file://)
                try {
                    data = await loadJSONWithXHR(DATA_FILE);
                } catch (xhrError) {
                    throw new Error('No data found. Please ensure timeline data is embedded in the HTML or run a local server.');
                }
            }
        }
        
        chapters = data.chapters || [];
        
        if (chapters.length === 0) {
            showError('No chapters found in timeline data');
            return;
        }

        // Sort chapters by order if specified
        chapters.sort((a, b) => (a.order || 0) - (b.order || 0));

        // Update site title and intro if provided
        if (data.title) {
            updateSiteTitle(data.title);
        }
        if (data.intro) {
            updateIntro(data.intro);
        }

        renderNavigation();
        renderChapters();
        initializeScrollAnimations();
    } catch (error) {
        console.error('Error loading chapters:', error);
        showError(`Error loading data: ${error.message}`);
    }
}

// Fallback method using XMLHttpRequest
function loadJSONWithXHR(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 0 || xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject(new Error('Failed to parse JSON'));
                    }
                } else {
                    reject(new Error(`Failed to load ${url} (HTTP ${xhr.status})`));
                }
            }
        };
        xhr.onerror = function() {
            reject(new Error('Network error loading JSON file'));
        };
        xhr.send();
    });
}

// Render navigation menu
function renderNavigation() {
    const nav = document.getElementById('chapterNav');
    if (!nav) return;

    nav.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const link = document.createElement('a');
        link.href = `#chapter-${index + 1}`;
        link.textContent = chapter.title || `Chapter ${index + 1}`;
        nav.appendChild(link);
    });
}

// Render all chapters
function renderChapters() {
    const container = document.getElementById('chaptersContainer');
    if (!container) return;

    container.innerHTML = '';

    chapters.forEach((chapter, index) => {
        const chapterElement = createChapterElement(chapter, index + 1);
        container.appendChild(chapterElement);
    });
}

// Create a chapter element
function createChapterElement(chapter, chapterNumber) {
    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'chapter';
    chapterDiv.id = `chapter-${chapterNumber}`;

    // Chapter header
    const header = document.createElement('div');
    header.className = 'chapter-header';

    const number = document.createElement('div');
    number.className = 'chapter-number';
    number.textContent = chapterNumber.toString().padStart(2, '0');

    const title = document.createElement('h2');
    title.className = 'chapter-title';
    title.textContent = chapter.title || `Chapter ${chapterNumber}`;

    header.appendChild(number);
    header.appendChild(title);

    // Chapter content
    const content = document.createElement('div');
    content.className = 'chapter-content';

    // Image container
    if (chapter.image) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'chapter-image-container';

        const img = document.createElement('img');
        img.className = 'chapter-image';
        img.src = chapter.image;
        img.alt = chapter.imageAlt || chapter.title || `Chapter ${chapterNumber} image`;
        img.loading = 'lazy';

        imageContainer.appendChild(img);
        content.appendChild(imageContainer);
    }

    // Text content
    const textDiv = document.createElement('div');
    textDiv.className = 'chapter-text';

    if (chapter.content) {
        if (typeof chapter.content === 'string') {
            // Single string content
            const p = document.createElement('p');
            p.textContent = chapter.content;
            textDiv.appendChild(p);
        } else if (Array.isArray(chapter.content)) {
            // Array of paragraphs
            chapter.content.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                textDiv.appendChild(p);
            });
        }
    }

    // Metadata if available
    if (chapter.metadata) {
        const metadata = document.createElement('div');
        metadata.className = 'chapter-metadata';
        metadata.textContent = chapter.metadata;
        textDiv.appendChild(metadata);
    }

    content.appendChild(textDiv);

    // Assemble chapter
    chapterDiv.appendChild(header);
    chapterDiv.appendChild(content);

    return chapterDiv;
}

// Initialize scroll animations using Intersection Observer
function initializeScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all chapters immediately
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.classList.add('visible');
        });
        return;
    }

    // Create observer
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all chapters
    document.querySelectorAll('.chapter').forEach(chapter => {
        observer.observe(chapter);
    });
}

// Show error message
function showError(message) {
    const container = document.getElementById('chaptersContainer');
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Show error message with instructions
function showErrorWithInstructions(message) {
    const container = document.getElementById('chaptersContainer');
    if (container) {
        const instructions = `
            <div class="error">
                <h3>${message}</h3>
                <p><strong>This happens because browsers block loading local JSON files for security reasons.</strong></p>
                <h4>Solution: Run a Local Web Server</h4>
                <div class="server-instructions">
                    <p><strong>Option 1: Python (if installed)</strong></p>
                    <p>Open a terminal/command prompt in this folder and run:</p>
                    <code>python -m http.server 8000</code>
                    <p>Then open: <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></p>
                    
                    <p><strong>Option 2: Python 3</strong></p>
                    <p>If Python 3 is installed, use:</p>
                    <code>python3 -m http.server 8000</code>
                    
                    <p><strong>Option 3: Node.js (if installed)</strong></p>
                    <p>Install http-server: <code>npm install -g http-server</code></p>
                    <p>Then run: <code>http-server</code></p>
                    
                    <p><strong>Option 4: PHP (if installed)</strong></p>
                    <p>Run: <code>php -S localhost:8000</code></p>
                </div>
            </div>
        `;
        container.innerHTML = instructions;
    }
}

// Update site title if specified in data
function updateSiteTitle(title) {
    const titleElement = document.querySelector('.site-title');
    if (titleElement && title) {
        titleElement.textContent = title;
    }
}

// Update intro section if specified in data
function updateIntro(introData) {
    if (!introData) return;

    const introTitle = document.querySelector('.intro-title');
    const introText = document.querySelector('.intro-text');

    if (introData.title && introTitle) {
        introTitle.textContent = introData.title;
    }

    if (introData.text && introText) {
        introText.textContent = introData.text;
    }
}

