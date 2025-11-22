# Timeline Template - Sharing Guide

## Easy Sharing Options

### Option 1: Share HTML + CSS + JS + Images (Recommended)

This is the simplest approach:

1. Make sure `index.html` has your content embedded (in the `<script id="timeline-data">` section)
2. Zip these files together:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `images/` folder (with all your images)
3. Share the zip file
4. Recipients unzip and open `index.html` - works immediately!

### Option 2: Single Standalone HTML File

Create one file that contains everything:

1. Open `index.html` in a text editor
2. In the `<head>` section, replace:
   ```html
   <link rel="stylesheet" href="styles.css">
   ```
   with:
   ```html
   <style>
   /* Paste entire contents of styles.css here */
   </style>
   ```

3. Before `</body>`, replace:
   ```html
   <script src="script.js"></script>
   ```
   with:
   ```html
   <script>
   /* Paste entire contents of script.js here */
   </script>
   ```

4. Make sure your timeline data is in the `<script id="timeline-data">` section
5. For images: Either include the `images/` folder, or convert images to base64 data URLs
6. Share just the single `index.html` file!

### Option 3: Host Online (Free Options)

**GitHub Pages** (Free):
1. Create a GitHub account
2. Create a new repository
3. Upload your files
4. Go to Settings → Pages
5. Enable GitHub Pages
6. Share the URL (e.g., `yourusername.github.io/repo-name`)

**Netlify Drop** (Free):
1. Go to https://app.netlify.com/drop
2. Drag and drop your folder
3. Get an instant URL to share!

**Google Drive** (Works but limited):
- Upload the HTML file to Google Drive
- Right-click → "Share" → "Get link"
- Change sharing to "Anyone with the link"
- Note: Images won't work unless you convert them to base64 or host them elsewhere

## Converting Images to Base64 (For Standalone Files)

If you want images embedded in the HTML:

1. Use an online converter: https://www.base64-image.de/
2. Upload your image
3. Copy the base64 data URL
4. Replace the image path in your JSON:
   ```json
   "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
   ```

## Tips for Sharing

- **File size**: Keep images under 1MB each for fast loading
- **Image formats**: Use JPG for photos, PNG for graphics with transparency
- **Testing**: Always test the HTML file by opening it directly before sharing
- **Instructions**: Include a brief note that recipients should open `index.html` in a browser

