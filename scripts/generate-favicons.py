#!/usr/bin/env python3
"""Build public/images/logo-ac.png for the navbar from ac-logo-raw.png.

Tab icon: use public/images/acfav.png directly (see index.html) — no processing."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "images" / "ac-logo-raw.png"
OUT = ROOT / "public"
LOGO_NAV = OUT / "images" / "logo-ac.png"
# Extra pixels removed from the right after tight alpha trim (navbar spacing).
SHAVE_RIGHT_PX = 10


def white_to_transparent(im: Image.Image, thr: int = 250) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > thr and g > thr and b > thr:
                px[x, y] = (255, 255, 255, 0)
    return im


def trim_alpha_bbox(im: Image.Image) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    return im.crop(bbox)


def shave_right(im: Image.Image, px: int) -> Image.Image:
    if px <= 0:
        return im
    w, h = im.size
    if px >= w:
        return im
    return im.crop((0, 0, w - px, h))


def main() -> None:
    if not RAW.is_file():
        raise SystemExit(f"Missing source image: {RAW}")

    trimmed = trim_alpha_bbox(white_to_transparent(Image.open(RAW)))
    trimmed = shave_right(trimmed, SHAVE_RIGHT_PX)
    LOGO_NAV.parent.mkdir(parents=True, exist_ok=True)
    trimmed.save(LOGO_NAV, "PNG", optimize=True)
    print("Wrote images/logo-ac.png (navbar). Favicon = /images/acfav.png in index.html)")


if __name__ == "__main__":
    main()
