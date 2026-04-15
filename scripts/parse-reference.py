#!/usr/bin/env python3
"""Extract structured content from reference pages."""
import re
import html
import json
import os
from pathlib import Path

AUDIT_DIR = Path('/tmp/ref-audit')

PAGES = {
    'home': '/',
    'blog': '/tut-sharyat-za-stikeri-i-nakleiki/',
    'howto': '/kak-podgotovit-maket-k-pechati/',
    'contacts': '/kontakty/',
    'catalog': '/catalog/',
    'product-tmpl': '/stranica-tovara/',
    'p-kontur': '/stikeri-s-konturnoi-rezkoi/',
    'p-3d-pack': '/3d-stickerpaki/',
    'p-3d-stickers': '/3d-stikeri/',
    'p-rect': '/pryamougolnie-i-kvadratnie-nakleiki/',
    'p-nadsechka': '/stikeri-s-nadsechkoy/',
    'p-big': '/bolshie-stickeri/',
    'p-stickerpak': '/stikerpaki/',
}


def clean_html(s):
    """Remove style + script blocks, decode entities."""
    s = html.unescape(s)
    s = re.sub(r'<style[^>]*>.*?</style>', '', s, flags=re.DOTALL)
    s = re.sub(r'<script[^>]*>.*?</script>', '', s, flags=re.DOTALL)
    return s


def strip_tags(s):
    return re.sub(r'<[^>]*>', ' ', s)


def normalize_ws(s):
    return re.sub(r'\s+', ' ', s).strip()


def extract_page(name, path):
    fp = AUDIT_DIR / f'{name}.html'
    if not fp.exists():
        return None
    raw = fp.read_text(encoding='utf-8')
    c = clean_html(raw)

    result = {
        'name': name,
        'path': path,
        'title': '',
        'headings': [],
        'text_blocks': [],
        'buttons': [],
        'images': [],
        'form_fields': [],
    }

    # Page title
    m = re.search(r'<title[^>]*>([^<]+)</title>', c)
    if m:
        result['title'] = normalize_ws(m.group(1)).replace(' — Kontora', '').replace('Kontora', '').strip(' -')

    # All headings h1-h6 (in order)
    for m in re.finditer(r'<h([1-6])[^>]*>(.*?)</h\1>', c, re.DOTALL):
        level = int(m.group(1))
        text = normalize_ws(strip_tags(m.group(2)))
        if text:
            result['headings'].append({'level': level, 'text': text})

    # All text-editor widget paragraphs
    seen = set()
    for m in re.finditer(r'elementor-widget-text-editor[^"]*"[^>]*>(.*?)(?=elementor-widget-(?!text-editor)|</section>)', c, re.DOTALL):
        block = m.group(1)
        for pm in re.finditer(r'<p[^>]*>(.*?)</p>', block, re.DOTALL):
            text = normalize_ws(strip_tags(pm.group(1)))
            if text and text not in seen and len(text) > 4:
                seen.add(text)
                result['text_blocks'].append(text)

    # Buttons
    for m in re.finditer(r'elementor-button-text[^>]*>([^<]+)<', c):
        text = normalize_ws(m.group(1))
        if text and text not in result['buttons']:
            result['buttons'].append(text)

    # Images (just filenames)
    seen_img = set()
    for m in re.finditer(r'src="([^"]*/uploads/[^"]+\.(?:png|svg|jpg|jpeg|webp))"', raw):
        src = m.group(1)
        name_only = src.split('/')[-1]
        # Skip responsive variants (numbered)
        if re.search(r'-\d+x\d+\.', name_only):
            continue
        if name_only not in seen_img:
            seen_img.add(name_only)
            result['images'].append(name_only)

    # Form field labels/placeholders
    for m in re.finditer(r'<(input|textarea|select)[^>]*(?:placeholder|aria-label)="([^"]+)"', raw):
        label = m.group(2)
        if label and label not in result['form_fields']:
            result['form_fields'].append(label)

    return result


def main():
    out = {}
    for name, path in PAGES.items():
        data = extract_page(name, path)
        if data:
            out[name] = data

    # Print human summary
    for name, data in out.items():
        print('=' * 70)
        print(f"[{name}] {data['path']}")
        print(f"  title: {data['title']}")
        print(f"  headings ({len(data['headings'])}):")
        for h in data['headings'][:20]:
            print(f"    H{h['level']}: {h['text'][:90]}")
        print(f"  text blocks ({len(data['text_blocks'])}):")
        for t in data['text_blocks'][:8]:
            print(f"    · {t[:100]}")
        print(f"  buttons: {data['buttons'][:8]}")
        print(f"  form fields: {data['form_fields'][:8]}")
        print(f"  images ({len(data['images'])}): {data['images'][:10]}")
        print()

    # Write JSON dump
    with open(AUDIT_DIR / 'audit.json', 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f'\nWritten: {AUDIT_DIR / "audit.json"}')


if __name__ == '__main__':
    main()
