# Artifact-first publishing standard

Every weekly thesis should be backed by one primary artifact before channel copy is written.

## What counts as a primary artifact

Use the strongest available form of evidence for the claim:

1. **Original data** — job-posting trend, pricing history, benchmark, model comparison, survey, scrape, experiment.
2. **Primary-source event** — product launch, earnings call, policy change, research paper, repo release, major company announcement.
3. **System teardown** — architecture, workflow, before/after, unit economics, process map.
4. **Corpus analysis** — job descriptions, product pages, prompts, ads, filings, research papers, social posts.
5. **Original experiment** — run the agent, measure the output, compare cost/latency/quality.

A screenshot or quote can support a thesis, but should not be the primary artifact if stronger evidence is reasonably obtainable.

## Artifact gate

No thesis moves to Draft until it has:

- a falsifiable hypothesis;
- a primary artifact or dataset;
- methodology and source notes;
- at least one piece of counter-evidence;
- a confidence rating;
- a chart/table/visual that can stand on its own;
- a statement of what would make us change our mind.

## Standard folder

`content-os/artifacts/YYYY-MM-slug/`

Each artifact folder should contain:

- `brief.md` — hypothesis, result, interpretation, limitations;
- `data.csv` or equivalent raw data where possible;
- `sources.md` — source URLs and retrieval dates;
- `chart.svg` / image / table / snippet;
- optional scripts used to reproduce the analysis.

## Content relationship

The artifact is the source of truth. The blog is the canonical argument. LinkedIn, X and Instagram are native adaptations of the same evidence, not independent claims.
