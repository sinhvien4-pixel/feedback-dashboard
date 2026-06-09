# Customer Feedback Dashboard — Spec

## Features

1. **Submit form** — name (optional), location (dropdown), star rating (1–5), comment (required)
2. **Admin table** — sortable by newest first, all entries from localStorage
3. **Filters** — by location, minimum rating, date range (from / to)
4. **Sentiment color coding** — row background by rating: green (4–5), yellow (3), red (1–2)
5. **CSV export** — filtered rows, UTF-8 BOM, filename includes date

## Data Model (localStorage)

```json
{
  "id":        1749430000000,
  "name":      "Nguyễn Văn A",
  "location":  "Hà Nội",
  "rating":    5,
  "comment":   "Dịch vụ rất tốt!",
  "date":      "09/06/2026",
  "timestamp": "2026-06-09T08:00:00.000Z"
}
```

Stored as a JSON array under the key `feedbackEntries` in `localStorage`.

## Locations

- Hà Nội
- Đà Nẵng
- TP.HCM

## Sentiment Rules

| Rating | Sentiment | Row color |
|--------|-----------|-----------|
| 4 – 5  | Positive  | Green     |
| 3      | Neutral   | Yellow    |
| 1 – 2  | Negative  | Red       |

## Non-goals (v1)

- Authentication
- Real database or backend
- Email notifications
- Multi-language UI
