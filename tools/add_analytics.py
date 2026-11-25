"""Insert (or update) the Cloudflare Web Analytics beacon in the public pages.

Usage:  python -I tools/add_analytics.py <site token>

The token is the public value shown in the Cloudflare snippet (it is visible in page source by design).
Pages left out on purpose:
  cs/       - the address carries the customer's order id and access token; it must not be sent to an analytics service
  preview/  - client previews, not our traffic
Run from the site root. Safe to run again: an existing beacon line is replaced, never duplicated.
"""
import io
import re
import sys

PAGES = ["index.html", "pricing/index.html", "request/index.html", "start/index.html", "desk/index.html", "terms/index.html"]
MARK = "static.cloudflareinsights.com/beacon.min.js"


def main():
    if len(sys.argv) != 2 or not re.fullmatch(r"[0-9a-f]{32}", sys.argv[1]):
        sys.exit("usage: add_analytics.py <32 hex character site token>")
    token = sys.argv[1]
    line = ("<script defer src=\"https://static.cloudflareinsights.com/beacon.min.js\" "
            "data-cf-beacon='{\"token\": \"" + token + "\"}'></script>")
    for page in PAGES:
        s = io.open(page, encoding="utf-8", newline="").read()
        nl = "\r\n" if "\r\n" in s else "\n"
        kept = [ln for ln in s.split(nl) if MARK not in ln]
        idx = [i for i, ln in enumerate(kept) if ln.strip().lower() == "</head>"]
        if len(idx) != 1:
            sys.exit(page + ": expected exactly one </head> line")
        kept.insert(idx[0], line)
        io.open(page, "w", encoding="utf-8", newline="").write(nl.join(kept))
        print("beacon set:", page)


if __name__ == "__main__":
    main()
