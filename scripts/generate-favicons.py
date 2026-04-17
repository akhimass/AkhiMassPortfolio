#!/usr/bin/env python3
"""Center-crop thumbnail.jpg to a square, then write favicon PNGs, ICO, and apple-touch-icon into public/."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "images" / "thumbnail.jpg"
OUT = ROOT / "public"


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"Missing source image: {SRC}")

    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    square = img.crop((left, top, left + side, top + side))

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
    print("Wrote favicon.ico, favicon-16/32/48.png, apple-touch-icon.png")


if __name__ == "__main__":
    main()
