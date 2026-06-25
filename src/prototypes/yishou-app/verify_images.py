import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\verify_docx\word\document.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all image references
blips = re.findall(r'r:embed="(rId\d+)"', content)
print(f'Total image references in document.xml: {len(blips)}')

# Read relationships
with open(r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\verify_docx\word\_rels\document.xml.rels', 'r', encoding='utf-8') as f:
    rels = f.read()

img_rels = re.findall(r'Relationship Id="(rId\d+)".*?Target="media/([^"]+)"', rels)
print(f'Image relationships: {len(img_rels)}')
for rid, target in img_rels:
    print(f'  {rid} -> {target}')

# Find what captions are used for images
# Look for text right before images
all_paras = re.findall(r'<w:p[ >].*?</w:p>', content, re.DOTALL)
for i, p in enumerate(all_paras):
    if 'wp:inline' in p:
        # Check previous paragraph for caption
        if i > 0:
            prev_texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', all_paras[i-1])
            prev = [t for t in prev_texts if t.strip()]
            if prev:
                print(f'  Caption before image: {prev[-1][:60]}')
