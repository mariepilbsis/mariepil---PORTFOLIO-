"""
Builds public/og-image.jpg — the 1200x630 card social platforms show when the
portfolio is linked.

Social crawlers do not run JavaScript, so this is baked once and referenced
from index.html rather than generated per route.

Re-run:  python scripts/make-og-image.py    (needs Pillow)
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og-image.jpg"
PORTRAIT = ROOT / "src" / "assets" / "portrait.webp"

W, H = 1200, 630
BG = (12, 9, 8)
ACC = (226, 48, 72)
TX = (247, 243, 241)
DIM = (150, 141, 138)

FONTS = Path("C:/Windows/Fonts")
black = ImageFont.truetype(str(FONTS / "ariblk.ttf"), 78)
bold = ImageFont.truetype(str(FONTS / "arialbd.ttf"), 30)
mono = ImageFont.truetype(str(FONTS / "consolab.ttf"), 21)


def main() -> None:
    card = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(card)

    # The 78px crimson grid the site sits on, at the same low alpha.
    grid = Image.new("RGB", (W, H), BG)
    gdraw = ImageDraw.Draw(grid)
    line = tuple(round(BG[i] + (ACC[i] - BG[i]) * 0.14) for i in range(3))
    for x in range(0, W, 78):
        gdraw.line([(x, 0), (x, H)], fill=line)
    for y in range(0, H, 78):
        gdraw.line([(0, y), (W, y)], fill=line)
    card = Image.blend(card, grid, 0.55)
    draw = ImageDraw.Draw(card)

    # Portrait, bled off the right edge behind a gradient scrim.
    if PORTRAIT.exists():
        with Image.open(PORTRAIT) as src:
            src = src.convert("RGB")
            side = min(src.size)
            src = src.crop(((src.width - side) // 2, 0, (src.width + side) // 2, side))
            src = src.resize((H, H), Image.LANCZOS)
        card.paste(src, (W - H + 90, 0))

        # A wide, eased scrim. A short linear one left a visible vertical seam
        # where the portrait's pale studio background met the dark card.
        scrim = Image.new("L", (H, H))
        sdraw = ImageDraw.Draw(scrim)
        span = 380
        for x in range(H):
            t = min(1.0, x / span)
            sdraw.line([(x, 0), (x, H)], fill=round(255 * (1 - t) ** 2.2))
        card.paste(Image.new("RGB", (H, H), BG), (W - H + 90, 0), scrim)
        draw = ImageDraw.Draw(card)

    x = 76
    draw.rectangle([x, 150, x + 54, 154], fill=ACC)
    draw.text((x, 182), "UI/UX  ·  LAYOUT  ·  DESIGN LEAD", font=mono, fill=ACC)

    draw.text((x, 232), "Gay Marie", font=black, fill=TX)
    draw.text((x, 318), "R. Pil", font=black, fill=ACC)

    draw.text((x, 432), "I design user-centered systems and lead", font=bold, fill=DIM)
    draw.text((x, 472), "the creative teams that ship them.", font=bold, fill=DIM)

    draw.text((x, 542), "Bulacan State University  ·  IS³", font=mono, fill=DIM)

    card.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{OUT.relative_to(ROOT)}  {W}x{H}  {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
