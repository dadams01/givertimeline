# Timeline Template

A simple, chapter-organized timeline website template inspired by the BBC "Fantastic Feats" page. Perfect for creating visual timelines for books, stories, or any chronological content.

## Features

- **Easy to Update**: All content is stored in a simple JSON file (or embedded in HTML)
- **Scroll Animations**: Smooth fade-in animations as you scroll through chapters
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no frameworks required
- **No Server Required**: Data is embedded in HTML, so it works by simply opening the file!

## Quick Start

**NEW: The timeline now works without a server!** The data is embedded directly in the HTML file.

Simply open `index.html` in your web browser - it should work immediately!

If you prefer to edit `data.json` separately and use a server, that still works too (see below).

### Updating Content

**Method 1: Edit the HTML directly (Recommended for sharing)**

1. Open `index.html` in a text editor
2. Find the `<script id="timeline-data">` section (near the bottom)
3. Replace the JSON content between the `<script>` tags with your own data
4. Save and open `index.html` in a browser - it works immediately!

**Method 2: Edit data.json and copy to HTML**

1. Edit `data.json` with your content
2. Copy the entire contents of `data.json`
3. Open `index.html` and find the `<script id="timeline-data">` section
4. Replace the JSON content between the `<script>` tags with your copied data
5. Save and open `index.html` in a browser

**Method 3: Use a local server (if you prefer editing JSON separately)**

If you want to keep editing `data.json` separately without copying, you can run a local server:

- Open a terminal/command prompt in this folder
- Run: `python -m http.server 8000` (or `python3` on some systems)
- Open http://localhost:8000 in your browser
- Then edit `data.json` and refresh the browser

## Customizing Content

### Editing Chapters

Open `data.json` and modify the `chapters` array. Each chapter has the following structure:

```json
{
  "order": 1,
  "title": "Chapter Title",
  "image": "images/chapter1.jpg",
  "imageAlt": "Description of image for accessibility",
  "content": [
    "First paragraph of text.",
    "Second paragraph of text.",
    "You can add as many paragraphs as you want."
  ],
  "metadata": "Optional: Additional info like dates or locations"
}
```

### Chapter Properties

- **order** (required): Number that determines the order chapters appear (1, 2, 3, etc.)
- **title** (required): The chapter title displayed in the navigation and header
- **image** (optional): Path to the image file (e.g., "images/chapter1.jpg")
- **imageAlt** (optional): Text description of the image for accessibility
- **content** (required): Array of paragraph strings, or a single string
- **metadata** (optional): Additional information displayed below the content

### Adding Images

1. Create an `images` folder in the same directory as `index.html`
2. Add your image files (JPG, PNG, etc.)
3. Reference them in `data.json` using the path: `"images/your-image.jpg"`

### Customizing the Site Title and Intro

Edit the top of `data.json`:

```json
{
  "title": "Your Custom Title",
  "intro": {
    "title": "Your Intro Title",
    "text": "Your intro description"
  },
  "chapters": [...]
}
```

## File Structure

```
timeline-template/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript logic
├── data.json           # Your content (edit this!)
├── README.md           # This file
└── images/             # Your images folder
    ├── chapter1.jpg
    ├── chapter2.jpg
    └── ...
```

## Customizing Colors and Styles

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #1a1a1a;      /* Main text color */
    --secondary-color: #4a4a4a;    /* Secondary text */
    --accent-color: #0066cc;       /* Highlights and chapter numbers */
    --text-color: #333333;         /* Body text */
    --light-bg: #f8f8f8;          /* Light backgrounds */
    --white: #ffffff;              /* White */
}
```

## Tips

- **Reordering chapters**: Change the `order` number in each chapter object
- **Removing chapters**: Delete the chapter object from the `chapters` array
- **Adding chapters**: Copy an existing chapter object and modify it
- **Single paragraph**: You can use a string instead of an array: `"content": "Single paragraph text"`
- **No image**: Simply omit the `image` property from a chapter

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Sharing Your Timeline

### Easy Sharing (No Server Required!)

1. **Update the HTML**: Make sure your content is embedded in `index.html` (in the `<script id="timeline-data">` section)

2. **Include images**: 
   - Keep images in the `images` folder relative to the HTML file
   - OR embed images as base64 data URLs (see advanced tips below)

3. **Share the files**:
   - **Option A**: Share `index.html`, `styles.css`, `script.js`, and the `images` folder
   - **Option B**: For a single file, embed CSS and JS inline in the HTML (see "Creating a Standalone File" below)

4. Recipients can simply open `index.html` in their browser - no server needed!

### Creating a Standalone Single File

If you want to share just ONE HTML file:

1. Copy the contents of `styles.css` into a `<style>` tag in the `<head>` of `index.html`
2. Copy the contents of `script.js` into a `<script>` tag before `</body>` in `index.html`
3. Make sure your timeline data is in the `<script id="timeline-data">` section
4. For images, use base64 data URLs or host them online and use absolute URLs
5. Share just the single `index.html` file!

## Troubleshooting

**"Failed to fetch" or "Error loading data" error?**
- This shouldn't happen anymore! The data is now embedded in the HTML
- If you see this, make sure the `<script id="timeline-data">` section exists in `index.html`
- Check that the JSON in that section is valid (no trailing commas, proper quotes, etc.)

**Images not showing?**
- Make sure image paths in `data.json` are correct
- Check that images are in the `images` folder
- Verify image file names match exactly (case-sensitive)

**Content not updating?**
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check `data.json` for syntax errors (missing commas, quotes, etc.)
- Open browser console (F12) to see error messages

**Animations not working?**
- Animations require a modern browser
- If unsupported, chapters will still display but without fade-in effects

**Need to use a server?**
- Only needed if you're editing `data.json` separately (Method 3)
- Make sure Python is installed (check with `python --version`)
- Try `python3` instead of `python` on some systems
- Try a different port if 8000 is in use: `python -m http.server 8080`

## Need Help?

- Check that the JSON in `<script id="timeline-data">` is valid (use an online JSON validator if needed)
- Ensure all chapter objects have at least `order`, `title`, and `content`
- Make sure file names match exactly (case-sensitive)
- If images don't show, check that the `images` folder is in the same directory as `index.html`

## Hosting Online (Free Options)

See `SHARING.md` for detailed instructions on:
- Creating a standalone single-file version
- Hosting on GitHub Pages
- Hosting on Netlify
- Converting images to base64 for embedding

Enjoy creating your timeline!

