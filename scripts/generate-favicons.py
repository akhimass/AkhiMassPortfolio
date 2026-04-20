#!/usr/bin/env python3
"""
- Navbar: public/images/ac-logo-raw.png → trim white → public/images/logo-ac.png
- Tab favicons: public/images/ac-favicon-source.png → trim black padding → square cover → ICO/PNGs
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "images" / "ac-logo-raw.png"
FAVICON_SRC = ROOT / "public" / "images" / "ac-favicon-source.png"
OUT = ROOT / "public"
LOGO_NAV = OUT / "images" / "logo-ac.png"

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


def trim_near_black_border(im: Image.Image, thr: int = 22) -> Image.Image:
    """Tight crop for dark background plate (remove empty black margins)."""
    im = im.convert("RGB")
    px = im.load()
    w, h = im.size
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if r > thr or g > thr or b > thr:
                found = True
                if x < min_x:
                    min_x = x
                if y < min_y:
                    min_y = y
                if x > max_x:
                    max_x = x
                if y > max_y:
                    max_y = y
    if not found:
        return im
    pad = 2
    return im.crop(
        (
            max(0, min_x - pad),
            max(0, min_y - pad),
            min(w, max_x + 1 + pad),
            min(h, max_y + 1 + pad),
        )
    )


def cover_square(im: Image.Image, side: int) -> Image.Image:
    w, h = im.size
    if w <= 0 or h <= 0:
        return Image.new("RGBA", (side, side), (0, 0, 0, 0))
    im_rgba = im.convert("RGBA")
    scale = max(side / w, side / h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    scaled = im_rgba.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - side) // 2
    top = (nh - side) // 2
    return scaled.crop((left, top, left + side, top + side))


def write_favicon_set(square: Image.Image) -> None:
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


def main() -> None:
    if not RAW.is_file():
        raise SystemExit(f"Missing source image: {RAW}")

    trimmed = trim_alpha_bbox(white_to_transparent(Image.open(RAW)))
    LOGO_NAV.parent.mkdir(parents=True, exist_ok=True)
    trimmed.save(LOGO_NAV, "PNG", optimize=True)

    if FAVICON_SRC.is_file():
        fav_base = trim_near_black_border(Image.open(FAVICON_SRC))
        fav_square = cover_square(fav_base, COVER_SIDE)
        write_favicon_set(fav_square)
        print("Favicons from ac-favicon-source.png; navbar logo from ac-logo-raw.png")
    else:
        fav_square = cover_square(trimmed, COVER_SIDE)
        write_favicon_set(fav_square)
        print("Favicons from navbar trim (ac-favicon-source.png missing)")


if __name__ == "__main__":
    main()
