#!/usr/bin/env bash
# M9.1 — reproducible asset download from kontora.futuguru.com reference.
# Generated from /tmp/ref-audit/asset-urls.json. Re-run is idempotent (skips existing files).
set -euo pipefail

REF="http://kontora.futuguru.com"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/brand"

mkdir -p "$DEST" "$DEST/stickers" "$DEST/types" "$DEST/gallery" "$DEST/headings"

count_fetched=0
count_skipped=0
count_failed=0

fetch() {
  local path="$1" out="$2"
  if [[ -f "$out" ]]; then
    count_skipped=$((count_skipped+1))
    return 0
  fi
  if curl -fsSL --retry 2 --max-time 60 -o "$out" "$REF$path"; then
    count_fetched=$((count_fetched+1))
    printf "  fetched: %s\n" "$(basename "$out")"
  else
    count_failed=$((count_failed+1))
    printf "  FAILED:  %s  <- %s\n" "$(basename "$out")" "$REF$path" >&2
    rm -f "$out"
    return 1
  fi
}

# --- flat ---
fetch "/wp-content/uploads/2025/12/Stickers_Flying0106-300x300.png" "$DEST/Stickers_Flying0106.png" || true
fetch "/wp-content/uploads/2026/04/a5-1.png" "$DEST/a5-1.png" || true
fetch "/wp-content/uploads/2025/12/arrow.svg" "$DEST/arrow.svg" || true
fetch "/wp-content/uploads/2025/12/button-icon.png" "$DEST/button-icon.png" || true
fetch "/wp-content/uploads/2026/04/chatgpt-image-27-yanv.-2026-g.-11_27_08-photoroom-1.png" "$DEST/chatgpt-image-27-yanv.-2026-g.-11_27_08-photoroom-1.png" || true
fetch "/wp-content/uploads/2026/03/chatgpt-image-27-yanv.-2026-g.-11_40_32-1-1.png" "$DEST/chatgpt-image-27-yanv.-2026-g.-11_40_32-1-1.png" || true
fetch "/wp-content/uploads/2026/03/chatgpt-image-27-yanv.-2026-g.-11_40_32-1-2.png" "$DEST/chatgpt-image-27-yanv.-2026-g.-11_40_32-1-2.png" || true
fetch "/wp-content/uploads/2026/03/chatgpt-image-27-yanv.-2026-g.-11_40_32-1.png" "$DEST/chatgpt-image-27-yanv.-2026-g.-11_40_32-1.png" || true
fetch "/wp-content/uploads/2026/03/chatgpt-image-27-yanv.-2026-g.-11_40_32-2.png" "$DEST/chatgpt-image-27-yanv.-2026-g.-11_40_32-2.png" || true
fetch "/wp-content/uploads/2025/12/flying_stickers-1.png" "$DEST/flying_stickers-1.png" || true
fetch "/wp-content/uploads/2025/12/frame-260.svg" "$DEST/frame-260.svg" || true
fetch "/wp-content/uploads/2026/01/frame-309.svg" "$DEST/frame-309.svg" || true
fetch "/wp-content/uploads/2026/01/frame-310.svg" "$DEST/frame-310.svg" || true
fetch "/wp-content/uploads/2026/03/frame-343-4.png" "$DEST/frame-343-4.png" || true
fetch "/wp-content/uploads/2026/04/frame-343-6-1.svg" "$DEST/frame-343-6-1.svg" || true
fetch "/wp-content/uploads/2026/04/frame-346.png" "$DEST/frame-346.png" || true
fetch "/wp-content/uploads/2026/03/frame-347-3.png" "$DEST/frame-347-3.png" || true
fetch "/wp-content/uploads/2026/03/frame-348-4.png" "$DEST/frame-348-4.png" || true
fetch "/wp-content/uploads/2026/04/frame-348.svg" "$DEST/frame-348.svg" || true
fetch "/wp-content/uploads/2026/04/frame-349-1.svg" "$DEST/frame-349-1.svg" || true
fetch "/wp-content/uploads/2026/03/frame-349.svg" "$DEST/frame-349.svg" || true
fetch "/wp-content/uploads/2026/04/frame-350-1.svg" "$DEST/frame-350-1.svg" || true
fetch "/wp-content/uploads/2026/03/frame-350.svg" "$DEST/frame-350.svg" || true
fetch "/wp-content/uploads/2026/04/frame-351.svg" "$DEST/frame-351.svg" || true
fetch "/wp-content/uploads/2026/04/frame-352-1.png" "$DEST/frame-352-1.png" || true
fetch "/wp-content/uploads/2026/04/frame-352.svg" "$DEST/frame-352.svg" || true
fetch "/wp-content/uploads/2026/04/frame-354.svg" "$DEST/frame-354.svg" || true
fetch "/wp-content/uploads/2026/04/frame-355.svg" "$DEST/frame-355.svg" || true
fetch "/wp-content/uploads/2026/04/group-39516.png" "$DEST/group-39516.png" || true
fetch "/wp-content/uploads/2026/02/group-39530-1.svg" "$DEST/group-39530-1.svg" || true
fetch "/wp-content/uploads/2026/04/group-39531.png" "$DEST/group-39531.png" || true
fetch "/wp-content/uploads/2026/02/group-39533.svg" "$DEST/group-39533.svg" || true
fetch "/wp-content/uploads/2026/03/group-39548.png" "$DEST/group-39548.png" || true
fetch "/wp-content/uploads/2026/02/group-39552-1.svg" "$DEST/group-39552-1.svg" || true
fetch "/wp-content/uploads/2026/03/group-39553.svg" "$DEST/group-39553.svg" || true
fetch "/wp-content/uploads/2026/04/group-39563.svg" "$DEST/group-39563.svg" || true
fetch "/wp-content/uploads/2026/04/group-39564.png" "$DEST/group-39564.png" || true
fetch "/wp-content/uploads/2026/04/image-1-2.png" "$DEST/image-1-2.png" || true
fetch "/wp-content/uploads/2026/02/image-4-1-artguru-1-photoroom.png" "$DEST/image-4-1-artguru-1-photoroom.png" || true
fetch "/wp-content/uploads/2026/04/image-4-1.png" "$DEST/image-4-1.png" || true
fetch "/wp-content/uploads/2026/04/image-6.svg" "$DEST/image-6.svg" || true
fetch "/wp-content/uploads/2026/04/image-7-1.svg" "$DEST/image-7-1.svg" || true
fetch "/wp-content/uploads/2025/12/kontora_logo.svg" "$DEST/kontora_logo.svg" || true
fetch "/wp-content/uploads/2026/02/stickersimg.png" "$DEST/stickersimg.png" || true
fetch "/wp-content/uploads/2026/03/studio-product-mockup-of-a-premium-skincare-and-ha-kopiya-1-2.png" "$DEST/studio-product-mockup-of-a-premium-skincare-and-ha-kopiya-1-2.png" || true
fetch "/wp-content/uploads/2025/12/transportation_img.png" "$DEST/transportation_img.png" || true
fetch "/wp-content/uploads/2026/04/vector-22.svg" "$DEST/vector-22.svg" || true
fetch "/wp-content/uploads/2026/03/vectorflamesvg.svg" "$DEST/vectorflamesvg.svg" || true

# --- stickers ---
fetch "/wp-content/uploads/2025/12/sticker_1-2.png" "$DEST/stickers/sticker_1-2.png" || true
fetch "/wp-content/uploads/2025/12/sticker_2-1.png" "$DEST/stickers/sticker_2-1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_2_mob-1.png" "$DEST/stickers/sticker_2_mob-1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_3-2.png" "$DEST/stickers/sticker_3-2.png" || true
fetch "/wp-content/uploads/2025/12/sticker_4-1.png" "$DEST/stickers/sticker_4-1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_5-3.png" "$DEST/stickers/sticker_5-3.png" || true
fetch "/wp-content/uploads/2025/12/sticker_6.png" "$DEST/stickers/sticker_6.png" || true
fetch "/wp-content/uploads/2025/12/sticker_7-1.png" "$DEST/stickers/sticker_7-1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_7_custom.png" "$DEST/stickers/sticker_7_custom.png" || true
fetch "/wp-content/uploads/2025/12/sticker_8-1.png" "$DEST/stickers/sticker_8-1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_9.png" "$DEST/stickers/sticker_9.png" || true
fetch "/wp-content/uploads/2025/12/sticker_png_1.png" "$DEST/stickers/sticker_png_1.png" || true
fetch "/wp-content/uploads/2025/12/sticker_png_2.png" "$DEST/stickers/sticker_png_2.png" || true
fetch "/wp-content/uploads/2025/12/sticker_png_3.png" "$DEST/stickers/sticker_png_3.png" || true
fetch "/wp-content/uploads/2025/12/sticker_png_4.png" "$DEST/stickers/sticker_png_4.png" || true
fetch "/wp-content/uploads/2025/12/sticker_png_5.png" "$DEST/stickers/sticker_png_5.png" || true

# --- types ---
fetch "/wp-content/uploads/2026/02/fifthtype.png" "$DEST/types/fifthtype.png" || true
fetch "/wp-content/uploads/2026/02/firsttype.png" "$DEST/types/firsttype.png" || true
fetch "/wp-content/uploads/2026/02/fourthtype.png" "$DEST/types/fourthtype.png" || true
fetch "/wp-content/uploads/2026/02/secondtype.png" "$DEST/types/secondtype.png" || true
fetch "/wp-content/uploads/2026/02/thirdtype.png" "$DEST/types/thirdtype.png" || true

# --- gallery ---
fetch "/wp-content/uploads/2026/03/rectangle-44-2.png" "$DEST/gallery/rectangle-44-2.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-44-4.png" "$DEST/gallery/rectangle-44-4.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-44-5.png" "$DEST/gallery/rectangle-44-5.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-45-1.png" "$DEST/gallery/rectangle-45-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-45.png" "$DEST/gallery/rectangle-45.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-47-1.png" "$DEST/gallery/rectangle-47-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-47.png" "$DEST/gallery/rectangle-47.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-48-1.png" "$DEST/gallery/rectangle-48-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-48.png" "$DEST/gallery/rectangle-48.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-49-1.png" "$DEST/gallery/rectangle-49-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-49.png" "$DEST/gallery/rectangle-49.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-50-1.png" "$DEST/gallery/rectangle-50-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-50.png" "$DEST/gallery/rectangle-50.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-51-1.png" "$DEST/gallery/rectangle-51-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-51-3.png" "$DEST/gallery/rectangle-51-3.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-63-1.png" "$DEST/gallery/rectangle-63-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-64.png" "$DEST/gallery/rectangle-64.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-66-1.png" "$DEST/gallery/rectangle-66-1.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-67.png" "$DEST/gallery/rectangle-67.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-68.png" "$DEST/gallery/rectangle-68.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-69.png" "$DEST/gallery/rectangle-69.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-70.png" "$DEST/gallery/rectangle-70.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-71.png" "$DEST/gallery/rectangle-71.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-72.png" "$DEST/gallery/rectangle-72.png" || true
fetch "/wp-content/uploads/2026/03/rectangle-73.png" "$DEST/gallery/rectangle-73.png" || true

# --- headings ---
fetch "/wp-content/uploads/2025/12/Heading_S1_Catalog.svg" "$DEST/headings/Heading_S1_Catalog.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S1_Catalog_mob-1.svg" "$DEST/headings/Heading_S1_Catalog_mob-1.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S2_Catalog.svg" "$DEST/headings/Heading_S2_Catalog.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S2_Catalog_mob.svg" "$DEST/headings/Heading_S2_Catalog_mob.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S2_custom.svg" "$DEST/headings/Heading_S2_custom.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S2_custom_mob.svg" "$DEST/headings/Heading_S2_custom_mob.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S3.svg" "$DEST/headings/Heading_S3.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S4_custom.svg" "$DEST/headings/Heading_S4_custom.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S8.svg" "$DEST/headings/Heading_S8.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S9.svg" "$DEST/headings/Heading_S9.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_S9_Mobile.svg" "$DEST/headings/Heading_S9_Mobile.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_s4_custom_mob.svg" "$DEST/headings/Heading_s4_custom_mob.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_transportation.svg" "$DEST/headings/Heading_transportation.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_why.svg" "$DEST/headings/Heading_why.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_why_mob.svg" "$DEST/headings/Heading_why_mob.svg" || true
fetch "/wp-content/uploads/2025/12/Heading_zakaz.svg" "$DEST/headings/Heading_zakaz.svg" || true
fetch "/wp-content/uploads/2026/03/heading.svg" "$DEST/headings/heading.svg" || true
fetch "/wp-content/uploads/2025/12/heading_contacts.svg" "$DEST/headings/heading_contacts.svg" || true
fetch "/wp-content/uploads/2025/12/heading_h1_tovar.svg" "$DEST/headings/heading_h1_tovar.svg" || true
fetch "/wp-content/uploads/2025/12/heading_h1_tovar_mob.svg" "$DEST/headings/heading_h1_tovar_mob.svg" || true
fetch "/wp-content/uploads/2026/03/heading_kontur.svg" "$DEST/headings/heading_kontur.svg" || true

echo ""
echo "=== M9.1 asset download summary ==="
echo "  fetched: $count_fetched"
echo "  skipped: $count_skipped"
echo "  failed:  $count_failed"

if [[ "$count_failed" -gt 0 ]]; then
  echo ""
  echo "Some downloads failed. Inspect errors above and re-run." >&2
  exit 1
fi
