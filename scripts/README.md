# Dentcraft Scripts

This directory contains utility scripts for the Dentcraft website.

## Google Reviews Sync (`sync-google-reviews.ts`)

A script to fetch and sync Google reviews for the website.

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get a SerpAPI key from [https://serpapi.com](https://serpapi.com) (for API fetch method)

### Usage

#### Option A: Fetch from SerpAPI (Recommended)

```bash
# Set your API key and run the sync
SERPAPI_KEY=your_api_key npm run sync-reviews

# Or dry-run to preview changes
SERPAPI_KEY=your_api_key npm run sync-reviews -- --dry-run
```

#### Option B: Import from JSON file

If you have reviews exported from another tool (e.g., manual export from Google Maps), you can import them:

```bash
# Import and replace existing reviews
npm run sync-reviews -- --import /path/to/reviews.json

# Import and merge with existing reviews
npm run sync-reviews -- --import /path/to/reviews.json --merge

# Dry-run to preview
npm run sync-reviews -- --import /path/to/reviews.json --dry-run
```

### Import JSON Format

The import file can be in various formats:

**Array of reviews:**
```json
[
  {
    "author": "John Doe",
    "rating": 5,
    "date": "2 weeks ago",
    "text": "Great service!",
    "photoUrl": "https://lh3.googleusercontent.com/..."
  }
]
```

**Object with reviews array:**
```json
{
  "reviews": [
    {
      "name": "John Doe",
      "stars": 5,
      "time": "2 weeks ago",
      "review": "Great service!",
      "avatar": "https://..."
    }
  ]
}
```

The script automatically maps common field names:
- `author` / `name`
- `rating` / `stars`
- `date` / `time`
- `text` / `review` / `content` / `snippet`
- `photoUrl` / `photo` / `avatar` / `thumbnail` / `profile_photo_url`

### Command Line Options

| Option | Short | Description |
|--------|-------|-------------|
| `--import <file>` | `-i` | Import reviews from a JSON file |
| `--merge` | `-m` | Merge new reviews with existing ones |
| `--dry-run` | `-d` | Preview changes without saving |
| `--help` | `-h` | Show help message |

### Output

Reviews are saved to:
```
src/data/google-reviews.json
```

### SerpAPI Configuration

The script uses the following configuration for SerpAPI:
- Engine: `google_maps_reviews`
- Language: Romanian (`hl=ro`)
- Sort: Newest first
- Place Data ID: `0x4738059c49336e2f:0xc5f8c1c74c29f519` (Dentcraft Satu Mare)

### Scheduling (Optional)

To automatically sync reviews, you can set up a cron job or GitHub Action:

**GitHub Action Example (.github/workflows/sync-reviews.yml):**
```yaml
name: Sync Google Reviews
on:
  schedule:
    - cron: '0 6 * * 1'  # Every Monday at 6 AM
  workflow_dispatch:  # Allow manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run sync-reviews
        env:
          SERPAPI_KEY: ${{ secrets.SERPAPI_KEY }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore: sync Google reviews'
          file_pattern: 'src/data/google-reviews.json'
```

### Cost Considerations

- SerpAPI offers 100 free searches/month
- Each sync uses 1 search credit
- For weekly syncs, you'll use ~4 credits/month
- Paid plans start at $50/month for 5,000 searches
