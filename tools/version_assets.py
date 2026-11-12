"""Stamp content-hash versions (?v=<md5[:8]>) on every local CSS / JS / data reference in the site's pages.

GitHub Pages lets browsers cache assets for 10 minutes, so each reference carries a hash of the file it points to;
the URL changes only when the file really changed. Covers attributes like href / src / data-pricing / data-industries
whose value is assets/css|js|data/... (with or without a leading ../).

Run after editing any CSS, JS or JSON file:   python tools/version_assets.py
(tools/build_work.py also calls this at the end.)
"""
import hashlib
import os
import re

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ['index.html', 'request/index.html', 'pricing/index.html', 'start/index.html', 'cs/index.html', 'desk/index.html']
REF = re.compile(r'="((?:\.\./)?)(assets/(?:css|js|data)/[A-Za-z0-9_./-]+?)(\?v=[0-9a-f]+)?"')


def file_hash(rel):
    path = os.path.join(SITE, *rel.split('/'))
    if not os.path.exists(path):
        return None
    return hashlib.md5(open(path, 'rb').read()).hexdigest()[:8]


def stamp_all(verbose=True):
    for page in PAGES:
        path = os.path.join(SITE, *page.split('/'))
        if not os.path.exists(path):
            continue
        html = open(path, encoding='utf-8').read()
        seen = []

        def sub(m):
            h = file_hash(m.group(2))
            if not h:
                return m.group(0)
            seen.append(m.group(2))
            return '="' + m.group(1) + m.group(2) + '?v=' + h + '"'

        new = REF.sub(sub, html)
        if new != html:
            open(path, 'w', encoding='utf-8', newline='').write(new)
        if verbose:
            print('%-20s %d refs%s' % (page, len(seen), '' if new != html else ' (unchanged)'))


if __name__ == '__main__':
    stamp_all()
