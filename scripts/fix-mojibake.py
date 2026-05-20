#!/usr/bin/env python3
"""Repair UTF-8 mojibake in benjisaiempire-app source files."""
import io
import os
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

REPLACEMENTS = [
    # Section-divider mojibake (â"€â"€) — cosmetic in CSS comments
    (b"\xc3\xa2\xe2\x80\x9d\xe2\x82\xac", "──".encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\x9e\xe2\x80\x93", "№".encode("utf-8")),
    (b"N\xc3\x82\xc2\xba", "Nº".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9d", "—".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9c", "–".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xe2\x84\xa2", "'".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xcb\x9c", "'".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xc5\x93", '"'.encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xc2\x9d", '"'.encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xc2\x9c", '"'.encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\xa0\xe2\x80\x99", "→".encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\xa0\xe2\x80\x90", "←".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac\xe2\x80\xa2", "•".encode("utf-8")),
    (b"\xc3\x82\xc2\xb7", "·".encode("utf-8")),
    (b"\xc3\x82\xc2\xa0", b" "),
    (b"\xc3\xa2\xe2\x80\x9e\xe2\x80\xa2", "™".encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\x9e\xe2\x80\xa6", "…".encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\x9e\xc2\xa2", "№".encode("utf-8")),
    (b"\xc3\xa2\xe2\x80\xb0\xcb\x86", "≈".encode("utf-8")),
    (b"\xc3\xa2\xe2\x82\xac", "—".encode("utf-8")),
]

ROOT = os.path.join(os.path.dirname(__file__), "..", "src")
EXTENSIONS = {".tsx", ".ts", ".css", ".html"}

total_subs = 0
files_changed = []

for dirpath, _, filenames in os.walk(ROOT):
    for fn in filenames:
        ext = os.path.splitext(fn)[1].lower()
        if ext not in EXTENSIONS:
            continue
        full = os.path.join(dirpath, fn)
        with open(full, "rb") as fh:
            data = fh.read()
        orig = data
        n = 0
        for src, dst in REPLACEMENTS:
            count = data.count(src)
            if count:
                data = data.replace(src, dst)
                n += count
        if data != orig:
            with open(full, "wb") as fh:
                fh.write(data)
            rel = os.path.relpath(full, ROOT)
            files_changed.append((rel, n))
            total_subs += n

print(f"Files changed: {len(files_changed)}")
print(f"Total substitutions: {total_subs}")
for rel, n in files_changed:
    print(f"  {n:5d}  {rel}")
