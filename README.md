# TravelBloom — Travel Recommendation Website

A responsive travel recommendation project built with only HTML, CSS, and vanilla JavaScript.

## Features

- Home, About Us, and Contact Us pages
- Destination/keyword search
- Data loaded with the Fetch API from `travel_recommendation_api.json`
- Recommendations for countries, beaches, and temples
- Dynamic recommendation cards
- Clear search functionality
- Responsive layout
- Contact form interaction

## Run locally

Because the app uses `fetch()`, serve the folder over HTTP instead of opening `index.html` directly.

### VS Code
Install **Live Server**, right-click `index.html`, then choose **Open with Live Server**.

### Python
```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Search examples

Try:
- `Japan`
- `Australia`
- `Brazil`
- `beach`
- `temple`

## GitHub

```bash
git init
git add .
git commit -m "feat: build travel recommendation website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Notes

The demo uses externally hosted Unsplash images, so an internet connection is required to display them.
