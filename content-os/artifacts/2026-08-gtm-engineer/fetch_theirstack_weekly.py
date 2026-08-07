#!/usr/bin/env python3
"""Build a 52-week GTM Engineer posting series from TheirStack.

Requires THEIRSTACK_API_KEY in the environment.
The API supports historical posted_at_gte / posted_at_lte filters and total counts.
"""

import csv
import os
from datetime import date, timedelta
import requests

API_URL = "https://api.theirstack.com/v1/jobs/search"
TITLES = ["GTM Engineer", "Go-To-Market Engineer", "GTM Engineering"]


def count_jobs(start: date, end: date) -> int:
    token = os.environ["THEIRSTACK_API_KEY"]
    payload = {
        "job_title_or": TITLES,
        "posted_at_gte": start.isoformat(),
        "posted_at_lte": end.isoformat(),
        "include_total_results": True,
        "limit": 1,
        "page": 0,
    }
    r = requests.post(
        API_URL,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=payload,
        timeout=60,
    )
    r.raise_for_status()
    body = r.json()
    # TheirStack responses expose a total count when include_total_results=true.
    # Keep this defensive because response wrappers can evolve.
    for key in ("total_results", "total", "count"):
        if key in body and isinstance(body[key], int):
            return body[key]
    if isinstance(body.get("metadata"), dict):
        for key in ("total_results", "total", "count"):
            if isinstance(body["metadata"].get(key), int):
                return body["metadata"][key]
    raise KeyError(f"Could not locate total count in response keys: {list(body.keys())}")


def main() -> None:
    # Last 52 completed Monday-Sunday weeks.
    today = date.today()
    this_monday = today - timedelta(days=today.weekday())
    first_monday = this_monday - timedelta(weeks=52)

    rows = []
    for i in range(52):
        start = first_monday + timedelta(weeks=i)
        end = start + timedelta(days=6)
        rows.append({
            "week_start": start.isoformat(),
            "week_end": end.isoformat(),
            "new_gtm_engineer_postings": count_jobs(start, end),
        })

    out = "gtm_engineer_weekly_52w.csv"
    with open(out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(out)


if __name__ == "__main__":
    main()
