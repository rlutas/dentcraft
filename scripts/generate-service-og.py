#!/usr/bin/env python3
"""Generate per-service Open Graph share images (1200x630 JPG).

Output: public/images/og/services/<slug>.jpg — used by
src/app/[locale]/servicii/[slug]/page.tsx (generateMetadata) when the CMS
service has no seo.ogImage of its own.

Usage:
    python3 scripts/generate-service-og.py --inter-medium Inter-Medium.ttf --inter-bold Inter-Bold.ttf

Fonts: same as scripts/generate-team-og.py (Inter static TTFs from Google Fonts,
macOS Georgia Italic for the serif italic line).

Source art: public/images/services/<slug>-v2.webp (the service illustrations).
When a service is added: add an entry to SERVICES and to SERVICE_OG_SLUGS in
src/lib/fallback-services.ts, rerun, commit the JPG.
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "public/images/services"
OUT_DIR = ROOT / "public/images/og/services"
LOGO = ROOT / "public/branding/LOGO_BLACK_FINAL.png"
GEORGIA_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

W, H = 1200, 630
BG = (250, 246, 241)  # #FAF6F1
INK = (42, 33, 24)  # #2a2118
ACCENT = (139, 115, 85)  # #8b7355
MUTED = (90, 80, 72)
BORDER = (232, 224, 213)  # #e8e0d5

# slug, title (bold, may wrap to two lines), short descriptor
SERVICES = [
    ("implanturi-dentare", "Implanturi dentare", "Implant, bont și coroană — plan complet"),
    ("estetica-dentara", "Estetică dentară", "Fațete, albire și remodelarea zâmbetului"),
    ("protetica", "Protetică dentară", "Coroane, punți și lucrări pe implanturi"),
    ("ortodontie", "Ortodonție", "Aparate dentare și alignere transparente"),
    ("endodontie", "Endodonție", "Tratament de canal, dintele salvat"),
    ("chirurgie-oro-maxilo-faciala", "Chirurgie oro-maxilo-facială", "Extracții, molari de minte, chirurgie pre-protetică"),
    ("pedodontie", "Stomatologie pediatrică", "Tratamente blânde pentru copii"),
    ("urgente-dentare", "Urgențe dentare", "Durere, abces, dinte fracturat"),
    ("consultatie-stomatologica", "Consultație stomatologică", "Diagnostic complet și plan de tratament"),
    ("stomatologie-generala", "Stomatologie generală", "Carii, obturații și prevenție"),
    ("coroane-dentare", "Coroane dentare", "Zirconiu și ceramică integrală"),
    ("fatete-dentare", "Fațete dentare", "Fațete ceramice, minim invazive"),
    ("albire-dentara", "Albire dentară", "Albire profesională, în cabinet"),
    ("detartraj", "Detartraj profesional", "Igienizare și prevenția bolii parodontale"),
]


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(text, f, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if f.getlength(trial) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def title_lines(text, path, max_w, start=72, min_size=50):
    """Largest size where the title fits in at most two lines."""
    size = start
    while size >= min_size:
        f = font(path, size)
        lines = wrap(text, f, max_w)
        if len(lines) <= 2 and all(f.getlength(l) <= max_w for l in lines):
            return f, lines
        size -= 2
    f = font(path, min_size)
    return f, wrap(text, f, max_w)[:2]


def rounded_mask(size, radius):
    # Supersampled for smooth corners
    s = 4
    m = Image.new("L", (size[0] * s, size[1] * s), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0] * s - 1, size[1] * s - 1), radius=radius * s, fill=255)
    return m.resize(size, Image.LANCZOS)


def load_art(path, size):
    """Fit the whole 3:2 illustration into the tall card without cropping the
    subject: slightly over-scale (crops only empty margin at the sides), then
    extend top/bottom with the illustration's own background, feathered so the
    join is invisible."""
    pw, ph = size
    art = Image.open(path).convert("RGB")
    scale = pw * 1.12 / art.width
    art = art.resize((round(art.width * scale), round(art.height * scale)), Image.LANCZOS)
    art = art.crop(((art.width - pw) // 2, 0, (art.width - pw) // 2 + pw, art.height))

    # Background: stretch the art's top and bottom rows (soft gradient of the studio backdrop)
    top = art.crop((0, 0, pw, 8)).resize((pw, ph // 2), Image.BILINEAR)
    bottom = art.crop((0, art.height - 8, pw, art.height)).resize((pw, ph - ph // 2), Image.BILINEAR)
    panel = Image.new("RGB", (pw, ph))
    panel.paste(top.filter(ImageFilter.GaussianBlur(12)), (0, 0))
    panel.paste(bottom.filter(ImageFilter.GaussianBlur(12)), (0, ph // 2))

    # Feathered vertical mask for the art itself
    oy = (ph - art.height) // 2
    feather = 48
    m = Image.new("L", art.size, 255)
    dm = ImageDraw.Draw(m)
    for i in range(feather):
        v = round(255 * i / feather)
        dm.line((0, i, pw, i), fill=v)
        dm.line((0, art.height - 1 - i, pw, art.height - 1 - i), fill=v)
    panel.paste(art, (0, oy), m)
    return panel


def render(svc, fonts):
    slug, title, descriptor = svc
    canvas = Image.new("RGB", (W, H), BG)

    # Illustration panel on the right: cover-crop the 3:2 art into a tall card.
    px0, py0, pw, ph = 610, 44, 546, 542
    art = load_art(ART_DIR / f"{slug}-v2.webp", (pw, ph))

    # Soft warm shadow under the card
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle((px0 + 10, py0 + 28, px0 + pw - 10, py0 + ph + 14), radius=32, fill=90)
    shadow = shadow.filter(ImageFilter.GaussianBlur(26))
    canvas.paste(Image.new("RGB", (W, H), (214, 200, 180)), (0, 0), shadow)

    mask = rounded_mask((pw, ph), 28)
    canvas.paste(art, (px0, py0), mask)
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((px0, py0, px0 + pw - 1, py0 + ph - 1), radius=28, outline=BORDER, width=2)

    # Logo
    x = 72
    logo = Image.open(LOGO).convert("RGBA")
    lh = 30
    logo = logo.convert("RGBa").resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS).convert("RGBA")
    base = canvas.convert("RGBA")
    base.alpha_composite(logo, (x, 64))
    canvas = base.convert("RGB")
    d = ImageDraw.Draw(canvas)

    # Title (bold) + "Satu Mare" (serif italic), vertically centred in the text column
    text_w = 480
    f_bold, lines = title_lines(title, fonts["bold"], text_w)
    f_ital = font(GEORGIA_ITALIC, int(f_bold.size * 0.92))
    f_desc = font(fonts["medium"], 24)
    line_h = int(f_bold.size * 1.08)
    block_h = line_h * len(lines) + f_ital.size + 10 + 30 + f_desc.size
    y = max(150, (H - block_h) // 2 - 4)
    for l in lines:
        d.text((x, y), l, font=f_bold, fill=INK)
        y += line_h
    d.text((x, y + 4), "Satu Mare", font=f_ital, fill=ACCENT)
    y += f_ital.size + 10 + 30
    for dl in wrap(descriptor, f_desc, text_w):
        d.text((x, y), dl, font=f_desc, fill=MUTED)
        y += int(f_desc.size * 1.35)

    # Footer
    f_foot = font(fonts["medium"], 22)
    d.line((x, 548, x + 56, 548), fill=ACCENT, width=2)
    d.text((x, 566), "Clinică stomatologică · dentcraft.ro", font=f_foot, fill=MUTED)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{slug}.jpg"
    canvas.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inter-medium", required=True)
    ap.add_argument("--inter-bold", required=True)
    ap.add_argument("--only", help="generate a single slug")
    a = ap.parse_args()
    fonts = {"medium": a.inter_medium, "bold": a.inter_bold}
    for svc in SERVICES:
        if a.only and svc[0] != a.only:
            continue
        print(render(svc, fonts))


if __name__ == "__main__":
    main()
