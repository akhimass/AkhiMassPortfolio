#!/usr/bin/env python3
"""
From public/images/ac-logo-raw.png (AC mark on white):
- Trim near-white margins to transparent
- Write public/images/logo-ac.png for the navbar
- Build favicons: uniform scale + center-crop to a square so the mark fills the icon (not tiny letterboxing)
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "images" / "ac-logo-raw.png"
OUT = ROOT / "public"
LOGO_NAV = OUT / "images" / "logo-ac.png"

# High-res square before downscaling favicons — larger = sharper; cover zoom uses this side
COVER_SIDE = 512


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


def cover_square(im: Image.Image, side: int) -> Image.Image:
    """Scale uniformly so the image covers `side`×`side`, then center-crop (bigger mark in tab icons)."""
    w, h = im.size
    if w <= 0 or h <= 0:
        return Image.new("RGBA", (side, side), (0, 0, 0, 0))
    scale = max(side / w, side / h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    scaled = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - side) // 2
    top = (nh - side) // 2
    return scaled.crop((left, top, left + side, top + side))


def main() -> None:
    if not RAW.is_file():
        raise SystemExit(f"Missing source image: {RAW}")

    trimmed = trim_alpha_bbox(white_to_transparent(Image.open(RAW)))
    LOGO_NAV.parent.mkdir(parents=True, exist_ok=True)
    trimmed.save(LOGO_NAV, "PNG", optimize=True)

    square = cover_square(trimmed, COVER_SIDE)

    for px, name in [(16, "favicon-16.png"), (32, "favicon-32.png"), (48, "favicon-48.png")]:
        square.resize((px, px), Image.Resampling.LANCZOS).save(OUT / name, "PNG", optimize=True)

    square.resize((180, 180), Image.Resampling.LANCZOS).save(OUT / "apple-touch-icon.png", "PNG", optimize=True)

    ico_sizes = [16, 32, 48]
    ico_imgs = [square.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes]
    ico_imgs[0].save(
        OUT / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_imgs[1:],
    )
    print("Wrote images/logo-ac.png, favicon.ico, favicon-16/32/48.png, apple-touch-icon.png")


if __name__ == "__main__":
    main()
