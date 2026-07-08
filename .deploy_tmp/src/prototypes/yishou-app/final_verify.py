import sys, io, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\verify_docx\word\document.xml', 'r', encoding='utf-8') as f:
    content = f.read()

# Check headings
h1 = re.findall(r'HeadingLevel\.HEADING_1|<w:pStyle w:val="[^"]*1[^"]*"', content)
h2 = re.findall(r'HeadingLevel\.HEADING_2|<w:pStyle w:val="[^"]*2[^"]*"', content)

# Extract all text
texts = re.findall(r'<w:t[^>]*>([^<]+)</w:t>', content)
texts = [t for t in texts if t.strip()]

# Check for TOC
has_toc = 'TOC' in content or '目录' in ''.join(texts)

# Check image count
img_count = len(re.findall(r'wp:inline', content))

# Check page breaks
page_breaks = len(re.findall(r'w:br w:type="page"', content))

print(f'Document statistics:')
print(f'  Total text segments: {len(texts)}')
print(f'  Images: {img_count}')
print(f'  Page breaks: {page_breaks}')
print(f'  Has TOC field: {has_toc}')

# Print chapter structure
chapters = []
for t in texts:
    if '第' in t and '章' in t:
        chapters.append(t)
    elif re.match(r'^\d+\.\d+', t):
        chapters.append('  ' + t)
print(f'\nChapter structure:')
for c in chapters:
    print(f'  {c}')
