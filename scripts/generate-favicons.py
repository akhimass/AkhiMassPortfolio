#!/usr/bin/env python3
"""Build public/images/logo-ac.png for the navbar from ac-logo-raw.png.

Tab icon: use public/images/acfav.png directly (see index.html) — no processing."""

from __future__ import annotations

from pathlib import Path

import numpy as np
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


def mute_sparse_noise_columns(
    im: Image.Image,
    mass_max: float = 24,
    min_strong_pixels: int = 4,
    strong_alpha: int = 40,
) -> Image.Image:
    """Zero columns that are almost empty (single-pixel / dust) anywhere in the frame."""
    arr = np.asarray(im.convert("RGBA")).copy()
    a = arr[:, :, 3]
    h, w = a.shape
    for x in range(w):
        mass = float(a[:, x].sum())
        if mass <= 0:
            continue
        n_strong = int(np.sum(a[:, x] > strong_alpha))
        if mass < mass_max and n_strong < min_strong_pixels:
            arr[:, x, 3] = 0
    return Image.fromarray(arr)


def mute_trailing_faint_columns(im: Image.Image, mass_max: float = 55) -> Image.Image:
    """Zero out faint trailing columns from the right (keeps canvas size; removes stray dots)."""
    arr = np.asarray(im.convert("RGBA")).copy()
    alpha = arr[:, :, 3].astype(np.float64)
    h, w = alpha.shape
    x = w - 1
    while x >= 0:
        m = float(alpha[:, x].sum())
        if m < mass_max:
            arr[:, x, 3] = 0
            x -= 1
        else:
            break
    return Image.fromarray(arr)


def trim_trailing_faint_columns(im: Image.Image, max_mass: float = 140) -> Image.Image:
    """Remove trailing columns with very low total alpha (isolated dots / dust)."""
    arr = np.asarray(im.convert("RGBA"))
    alpha = arr[:, :, 3].astype(np.float64)
    h, w = alpha.shape
    if w == 0:
        return im
    mass = alpha.sum(axis=0)
    right = w - 1
    while right >= 0 and mass[right] < max_mass:
        right -= 1
    if right >= w - 1:
        return im
    return Image.fromarray(arr[:, : right + 1, :].copy())


def trim_weak_trailing_columns(im: Image.Image, ratio: float = 0.032) -> Image.Image:
    """Remove nearly-empty columns from the right edge (e.g. single-pixel glow / stray dots)."""
    arr = np.asarray(im.convert("RGBA"))
    alpha = arr[:, :, 3].astype(np.float64)
    h, w = alpha.shape
    if w == 0:
        return im
    col_strength = alpha.sum(axis=0)
    mx = float(np.max(col_strength)) + 1e-6
    thr = mx * ratio
    right = w - 1
    while right >= 0 and col_strength[right] < thr:
        right -= 1
    if right >= w - 1:
        return im
    return Image.fromarray(arr[:, : right + 1, :].copy())


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

    squared = trim_weak_trailing_columns(squared, ratio=0.032)
    squared = trim_trailing_faint_columns(squared, max_mass=140)
    squared = center_on_square(squared, pad_ratio=0.1)

    w, h = squared.size
    if max(w, h) > max_side:
        scale = max_side / max(w, h)
        squared = squared.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    # Final: remove trailing faint columns, then scrub isolated near-empty columns (dots).
    squared = mute_trailing_faint_columns(squared, mass_max=55)
    squared = mute_sparse_noise_columns(squared, mass_max=24, min_strong_pixels=4, strong_alpha=40)

    LOGO_NAV.parent.mkdir(parents=True, exist_ok=True)
    squared.save(LOGO_NAV, "PNG", optimize=True)
    print("Wrote images/logo-ac.png (navbar). Favicon = /images/acfav.png in index.html)")


if __name__ == "__main__":
    main()
