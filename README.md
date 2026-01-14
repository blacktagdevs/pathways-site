# Westover University Pathways Scholarship Website

A static, accessible scholarship website for "The Pathways Scholarship" - supporting Westover High School seniors pursuing STEM or Creative Arts.

## File Structure

```
pathways-site/
├── index.html              # Home page
├── about.html              # About Us + Leadership bios
├── scholarship.html        # Scholarship Details + FAQ
├── contact.html            # Contact form
├── README.md               # This file
└── assets/
    ├── css/
    │   └── styles.css      # Shared stylesheet
    ├── js/
    │   └── main.js         # Shared JavaScript (nav, FAQ accordion)
    └── images/
        ├── hero-graduates.jpg      # Hero section background
        ├── call-to-action.jpg      # CTA section background
        ├── logo-mark.png           # Optional logo
        ├── lead-1.jpg              # Leadership headshot 1
        ├── lead-2.jpg              # Leadership headshot 2
        └── lead-3.jpg              # Leadership headshot 3
```

## Running Locally

### Option 1: Open directly
Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- Right-click → "Open with" → your browser

### Option 2: Local server (recommended for development)
Using Python:
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

Using Node.js (if you have `npx`):
```bash
npx serve .

# Then visit the URL shown in terminal
```

Using PHP:
```bash
php -S localhost:8000
```

## Deploying to GitHub Pages

1. **Create a GitHub repository** for this project (or use an existing one).

2. **Push the code** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pathways Scholarship website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pathways-site.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

4. **Access your site** at: `https://YOUR_USERNAME.github.io/pathways-site/`

## Adding Images

Replace placeholder images by adding your own files to `assets/images/`:

| Filename | Recommended Size | Purpose |
|----------|-----------------|---------|
| `hero-graduates.jpg` | 1920×1080px | Hero section background |
| `call-to-action.jpg` | 1920×800px | CTA section background |
| `logo-mark.png` | 200×200px | Site logo (optional) |
| `lead-1.jpg` | 400×400px | Leadership headshot |
| `lead-2.jpg` | 400×400px | Leadership headshot |
| `lead-3.jpg` | 400×400px | Leadership headshot |

**Image tips:**
- Use compressed JPEGs for photos (aim for <200KB each)
- Use PNG for logos with transparency
- Ensure images have good contrast for text overlays

## Customization

### Colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --color-primary: #1e3a5f;      /* Navy blue */
  --color-secondary: #c9a227;    /* Gold */
  --color-accent: #2d5a87;       /* Lighter blue */
  /* ... */
}
```

### Content
- Update scholarship details in `scholarship.html`
- Edit leadership bios in `about.html`
- Modify timeline dates as needed
- Update contact email in `contact.html`

## Accessibility Features

- Semantic HTML5 structure
- Skip-to-content link
- Keyboard navigation support
- Focus indicators
- ARIA labels where needed
- Sufficient color contrast (WCAG AA)
- Responsive design for all screen sizes

## Browser Support

Tested and works in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is for The Pathways Scholarship. All rights reserved.

---

*"Each Journey Starts with a Step"*
