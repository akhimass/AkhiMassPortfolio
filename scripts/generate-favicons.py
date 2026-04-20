#!/usr/bin/env python3
"""Sync navbar logo: copies `logo-ac.jpeg` from repo root into `public/images/`.

Tab icon: use `public/images/acfav.png` directly (see `index.html`) — not handled here."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_JPEG = ROOT / "logo-ac.jpeg"
OUT_JPEG = ROOT / "public" / "images" / "logo-ac.jpeg"


def main() -> None:
    if not SRC_JPEG.is_file():
        raise SystemExit(f"Missing {SRC_JPEG.name} at repo root (navbar asset).")
    OUT_JPEG.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SRC_JPEG, OUT_JPEG)
    print(f"Copied {SRC_JPEG.name} → {OUT_JPEG.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
