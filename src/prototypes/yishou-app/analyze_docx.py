import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\unpacked_docx\word\document.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all image references
blips = re.findall(r'r:embed="(rId\d+)"', content)
print('Image rIds in document:', blips)

# Find drawing extents (image sizes)
drawings = re.findall(r'<wp:extent[^>]*cx="(\d+)"[^>]*cy="(\d+)"', content)
print('Image sizes (cx, cy in EMU):', drawings)

# Count image paragraphs
img_paragraphs = re.findall(r'<w:p[ >].*?</w:p>', content, re.DOTALL)
img_count = 0
for p in img_paragraphs:
    if 'wp:inline' in p or 'wp:anchor' in p:
        img_count += 1
        # Find preceding text (caption or description)
        prev_text = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', p)
        texts = [t for t in prev_text if t.strip()]
        if texts:
            print(f'Image {img_count} caption: {texts}')
        else:
            print(f'Image {img_count}: no caption in paragraph')

print(f'\nTotal images: {img_count}')

# Find what paragraphs surround images (context)
all_paras = re.findall(r'<w:p[ >].*?</w:p>', content, re.DOTALL)
for i, p in enumerate(all_paras):
    if 'wp:inline' in p or 'wp:anchor' in p:
        # Get previous paragraph text
        if i > 0:
            prev_texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', all_paras[i-1])
            prev = [t for t in prev_texts if t.strip()]
            if prev:
                print(f'Image before paragraph: {prev[:3]}')
        # Get next paragraph text
        if i < len(all_paras) - 1:
            next_texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', all_paras[i+1])
            nxt = [t for t in next_texts if t.strip()]
            if nxt:
                print(f'Image after paragraph: {nxt[:3]}')
        print('---')
