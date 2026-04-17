#!/usr/bin/env python3
"""Center-crop thumbnail.jpg to a square, mask to a circle, then write favicon PNGs, ICO, and apple-touch-icon into public/."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "thumbnail.jpg"
OUT = ROOT / "public"


def center_square_crop(im: Image.Image) -> Image.Image:
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    return im.crop((left, top, left + side, top + side))


def apply_circular_mask(im: Image.Image) -> Image.Image:
    """Square RGB/RGBA image → RGBA with transparent pixels outside an inscribed circle."""
    im = im.convert("RGBA")
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, w - 1, h - 1), fill=255)
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)
    return out


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source image: {SRC}")

    img = Image.open(SRC).convert("RGB")
    square = center_square_crop(img)
    circle = apply_circular_mask(square)

    for px, name in [(16, "favicon-16.png"), (32, "favicon-32.png"), (48, "favicon-48.png")]:
        circle.resize((px, px), Image.Resampling.LANCZOS).save(OUT / name, "PNG", optimize=True)

    circle.resize((180, 180), Image.Resampling.LANCZOS).save(OUT / "apple-touch-icon.png", "PNG", optimize=True)

    ico_sizes = [16, 32, 48]
    ico_imgs = [circle.resize((s, s), Image.Resampling.LANCZOS) for s in ico_sizes]
    ico_imgs[0].save(
        OUT / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_imgs[1:],
    )
    print("Wrote circular favicon.ico, favicon-16/32/48.png, apple-touch-icon.png")


if __name__ == "__main__":
    main()
