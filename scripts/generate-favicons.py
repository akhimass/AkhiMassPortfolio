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


def center_on_square(im: Image.Image, pad_ratio: float = 0.1) -> Image.Image:
    """Equal padding on a square canvas so the mark sits centered (navbar / avatar crop)."""
    im = im.convert("RGBA")
    w, h = im.size
    pad = int(max(w, h) * pad_ratio)
    side = max(w, h) + 2 * pad
    out = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - w) // 2
    oy = (side - h) // 2
    out.paste(im, (ox, oy), im)
    return out


def main() -> None:
    if not RAW.is_file():
        raise SystemExit(f"Missing source image: {RAW}")

    trimmed = trim_alpha_bbox(white_to_transparent(Image.open(RAW)))
    squared = center_on_square(trimmed, pad_ratio=0.1)
    max_side = 320
    w, h = squared.size
    if max(w, h) > max_side:
        scale = max_side / max(w, h)
        squared = squared.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    LOGO_NAV.parent.mkdir(parents=True, exist_ok=True)
    squared.save(LOGO_NAV, "PNG", optimize=True)
    print("Wrote images/logo-ac.png (navbar). Favicon = /images/acfav.png in index.html)")


if __name__ == "__main__":
    main()
