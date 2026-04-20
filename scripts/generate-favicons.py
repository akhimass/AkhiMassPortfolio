#!/usr/bin/env python3
"""
- Navbar: public/images/ac-logo-raw.png → trim white → public/images/logo-ac.png
- Tab favicons: public/images/ac-favicon-source.png → scale to fit inside a square (no crop;
  letterbox on transparent). Wide mark fallback still uses cover when source favicon missing.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "images" / "ac-logo-raw.png"
FAVICON_SRC = ROOT / "public" / "images" / "ac-favicon-source.png"
OUT = ROOT / "public"
LOGO_NAV = OUT / "images" / "logo-ac.png"

MASTER_SIDE = 512


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


def contain_square(im: Image.Image, side: int) -> Image.Image:
    """Uniform scale so the whole image fits in side×side; center on transparent (no cropping)."""
    im = im.convert("RGBA")
    w, h = im.size
    if w <= 0 or h <= 0:
        return Image.new("RGBA", (side, side), (0, 0, 0, 0))
    scale = min(side / w, side / h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(resized, ((side - nw) // 2, (side - nh) // 2), resized)
    return canvas


def cover_square(im: Image.Image, side: int) -> Image.Image:
    """Scale + center-crop to square (only for wide navbar mark fallback)."""
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
        fav_square = contain_square(Image.open(FAVICON_SRC), MASTER_SIDE)
        write_favicon_set(fav_square)
        print("Favicons from ac-favicon-source.png (contain, no crop); navbar logo from ac-logo-raw.png")
    else:
        fav_square = cover_square(trimmed, MASTER_SIDE)
        write_favicon_set(fav_square)
        print("Favicons from navbar trim (ac-favicon-source.png missing)")


if __name__ == "__main__":
    main()
