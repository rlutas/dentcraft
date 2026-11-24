#!/usr/bin/env python3
"""Generate per-doctor Open Graph share images (1200x630 JPG).

Output: public/images/og/team/<slug>.jpg — referenced from
src/app/[locale]/echipa/[slug]/page.tsx (generateMetadata).

Usage:
    python3 scripts/generate-team-og.py --inter-medium Inter-Medium.ttf --inter-bold Inter-Bold.ttf

Inter static TTFs can be fetched from Google Fonts:
    curl -s "https://fonts.googleapis.com/css2?family=Inter:wght@500;700"
(the CSS lists one .ttf URL per weight). The italic serif uses macOS Georgia Italic,
matching Tailwind's `font-serif` on the site.

When a team member is added: add an entry to DOCTORS, rerun, commit the JPG.
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
TEAM_DIR = ROOT / "public/images/team"
OUT_DIR = ROOT / "public/images/og/team"
LOGO = ROOT / "public/branding/LOGO_BLACK_FINAL.png"
GEORGIA_ITALIC = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

W, H = 1200, 630
BG = (250, 246, 241)
INK = (42, 33, 24)
ACCENT = (139, 115, 85)
MUTED = (90, 80, 72)
BORDER = (232, 224, 213)

# slug, bold part, italic part, role, specializations, photo path
DOCTORS = [
    ("razvan-petric", "Dr. Petric", "Răzvan-Tudor", "Medic Stomatolog Coordonator",
     "Implantologie · Estetică · Protetică", "/images/stomatolog-satu-mare.png"),
    ("codrut-buterchi", "Dr. Buterchi", "Codruț-Ciprian", "Medic Specialist Chirurgie Dento-Alveolară",
     "Chirurgie · Implantologie", "/images/team/dr-buterchi-codrut-ciprian.webp"),
    ("giovana-tincu", "Dr. Tincu", "Giovana-Nicoleta", "Medic Specialist Parodontolog",
     "Parodontologie · Estetică dentară", "/images/team/dr-tincu-giovana.webp"),
    ("denisa-ghirasim", "Dr. Ghirasim", "Denisa-Ștefania", "Medic Stomatolog",
     "Stomatologie pediatrică · Endodonție", "/images/team/dr-ghirasim-denisa-stefania.webp"),
    ("stefana-cozma", "Dr. Cozma", "Ștefana", "Medic Stomatolog – Ortodonție",
     "Ortodonție · Aparate dentare", "/images/team/dr-cozma-stefana.webp"),
    ("remus-fernea", "Dr. Fernea", "Remus", "Medic Stomatolog",
     "Profilaxie GBT · Odontoterapie · Protetică", "/images/team/dr-fernea-remus.webp"),
]


def fit_font(path, text, max_w, start, min_size=28):
    size = start
    while size > min_size:
        f = ImageFont.truetype(path, size)
        if f.getlength(text) <= max_w:
            return f
        size -= 2
    return ImageFont.truetype(path, min_size)


def cutout(photo_path: Path) -> Image.Image:
    im = Image.open(photo_path).convert("RGBA")
    bbox = im.split()[3].getbbox()
    return im.crop(bbox) if bbox else im


def render(doc, fonts):
    slug, bold, italic, role, specs, photo = doc
    canvas = Image.new("RGB", (W, H), BG)

    # Soft warm glow behind the portrait
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse((700, 60, 1180, 620), fill=150)
    glow = glow.filter(ImageFilter.GaussianBlur(90))
    canvas.paste(Image.new("RGB", (W, H), (232, 222, 207)), (0, 0), glow)

    # Portrait: fill a fixed box on the right, bottom-anchored. Tall photos are
    # cropped from the top (head + torso) so every doctor gets the same scale.
    box_x, box_w, box_h = 660, 500, H - 36
    person = cutout(ROOT / "public" / photo.lstrip("/"))
    crop_h = min(person.height, int(person.width * box_h / box_w))
    person = person.crop((0, 0, person.width, crop_h))
    scale = min(box_w / person.width, box_h / person.height)
    person = person.resize((int(person.width * scale), int(person.height * scale)), Image.LANCZOS)
    px = box_x + (box_w - person.width) // 2
    canvas.paste(person, (px, H - person.height), person)

    d = ImageDraw.Draw(canvas)
    x = 72

    # Logo
    logo = Image.open(LOGO).convert("RGBA")
    lh = 30
    logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    canvas.paste(logo, (x, 64), logo)

    text_w = 600
    f_bold = fit_font(fonts["bold"], bold, text_w, 76)
    f_ital = fit_font(GEORGIA_ITALIC, italic, text_w, 72)
    d.text((x, 190), bold, font=f_bold, fill=INK)
    d.text((x, 190 + f_bold.size + 6), italic, font=f_ital, fill=ACCENT)

    y = 190 + f_bold.size + f_ital.size + 44
    f_role = fit_font(fonts["medium"], role, 560, 30, 22)
    d.text((x, y), role, font=f_role, fill=MUTED)

    # Specializations pill
    f_spec = fit_font(fonts["medium"], specs.upper(), text_w - 40, 17, 13)
    tw = f_spec.getlength(specs.upper())
    py = y + f_role.size + 26
    d.rounded_rectangle((x, py, x + tw + 36, py + 38), radius=19, fill=(255, 255, 255), outline=BORDER, width=2)
    d.text((x + 18, py + 19), specs.upper(), font=f_spec, fill=ACCENT, anchor="lm")

    # Footer
    f_foot = ImageFont.truetype(fonts["medium"], 22)
    d.line((x, 548, x + 56, 548), fill=ACCENT, width=2)
    d.text((x, 566), "Clinică stomatologică · Satu Mare · dentcraft.ro", font=f_foot, fill=MUTED)

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
    for doc in DOCTORS:
        if a.only and doc[0] != a.only:
            continue
        print(render(doc, fonts))


if __name__ == "__main__":
    main()
