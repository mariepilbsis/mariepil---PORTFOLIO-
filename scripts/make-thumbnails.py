"""
Generates the gallery thumbnails in src/assets/pubmats/thumbs/.

The gallery cards show each piece inside a 268px square (`object-fit: contain`),
but the files in src/assets/pubmats/ are 1600-2400px originals sized for the
lightbox. Serving those to the cards meant 5.1 MB of covers on /work.

This writes a WebP capped at EDGE px on its longest side — 2x the card slot, so
it still looks sharp on a retina screen — next to a matching JPEG fallback for
browsers without WebP. Both are committed; there is no build-time image step.

Re-run after adding artwork:  python scripts/make-thumbnails.py
Needs Pillow:                 python -m pip install Pillow
"""

from pathlib import Path
from PIL import Image

EDGE = 560
WEBP_QUALITY = 72
JPEG_QUALITY = 78

SRC = Path(__file__).resolve().parent.parent / "src" / "assets" / "pubmats"
OUT = SRC / "thumbs"


def main() -> None:
    OUT.mkdir(exist_ok=True)
    originals = sorted(SRC.glob("*.jpg"))
    if not originals:
        raise SystemExit(f"no source artwork found in {SRC}")

    before = after = 0
    for path in originals:
        with Image.open(path) as im:
            im = im.convert("RGB")
            im.thumbnail((EDGE, EDGE), Image.LANCZOS)
            webp = OUT / f"{path.stem}.webp"
            jpeg = OUT / f"{path.stem}.jpg"
            im.save(webp, "WEBP", quality=WEBP_QUALITY, method=6)
            im.save(jpeg, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

        before += path.stat().st_size
        after += webp.stat().st_size
        print(f"{path.name:46s} {path.stat().st_size // 1024:5d} KB -> {webp.stat().st_size // 1024:4d} KB")

    print(f"\n{len(originals)} thumbnails · {before / 1024 / 1024:.2f} MB -> {after / 1024 / 1024:.2f} MB (webp)")


if __name__ == "__main__":
    main()
