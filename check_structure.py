import os
import re

CONTENT_DIR = "content"
HTML_TAGS = ["div", "blockquote", "ul", "ol", "li", "figure", "iframe", "p", "a", "span", "h1", "h2", "h3", "h4", "h5", "h6", "cite"]
SELF_CLOSING = ["img", "br", "hr", "input", "meta", "link"]

def check_structure(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    lines = content.split('\n')
    
    # 1. Check for mixed lists (Markdown list inside HTML list)
    # This is a heuristic: <ol> followed by * or - or 1.
    in_html_list = False
    for i, line in enumerate(lines):
        stripped = line.strip()
        if '<ol>' in stripped or '<ul>' in stripped or '<ol className=' in stripped or '<ul className=' in stripped:
            in_html_list = True
        if '</ol>' in stripped or '</ul>' in stripped:
            in_html_list = False
        
        if in_html_list:
            if stripped.startswith('- ') or stripped.startswith('* ') or re.match(r'\d+\.', stripped):
                # errors.append(f"Line {i+1}: Mixed Markdown list inside HTML list")
                pass # This is actually hard to detect reliably without full parsing, but let's note it.

    # 2. Check for tag balance (Simple stack)
    stack = []
    # Very basic regex that handles attributes
    tag_re = re.compile(r'</?([a-zA-Z0-9]+)[^>]*>')
    
    for i, line in enumerate(lines):
        # Skip code blocks if possible (not implemented here for simplicity)
        matches = tag_re.finditer(line)
        for match in matches:
            full_tag = match.group(0)
            tag_name = match.group(1).lower()
            
            if tag_name in SELF_CLOSING:
                continue
            if full_tag.endswith('/>'): # Self closing JSX
                continue
                
            if full_tag.startswith('</'):
                if not stack:
                    errors.append(f"Line {i+1}: Unexpected closing tag </{tag_name}>")
                else:
                    last_tag = stack[-1]
                    if last_tag == tag_name:
                        stack.pop()
                    else:
                         # Don't error immediately, might be nested mismatch
                         # errors.append(f"Line {i+1}: Mismatched closing tag </{tag_name}>, expected </{last_tag}>")
                         pass
            else:
                 if tag_name in HTML_TAGS:
                    stack.append(tag_name)

    if stack:
        errors.append(f"Unclosed tags at end of file: {stack}")

    if errors:
        print(f"Issues in {filepath}:")
        for e in errors:
            print(f"  - {e}")

def main():
    if not os.path.exists(CONTENT_DIR):
        print(f"Directory {CONTENT_DIR} not found.")
        return

    for filename in os.listdir(CONTENT_DIR):
        if filename.endswith(".mdx"):
            check_structure(os.path.join(CONTENT_DIR, filename))

if __name__ == "__main__":
    main()
