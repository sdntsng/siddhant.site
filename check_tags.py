import os
import re

CONTENT_DIR = "content"
HTML_TAGS = ["div", "blockquote", "ul", "ol", "li", "figure", "iframe", "p", "a", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
SELF_CLOSING = ["img", "br", "hr", "input", "meta", "link"]

def check_balanced_tags(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple stack-based checker
    stack = []
    lines = content.split('\n')
    
    # regex to find tags: <tag ...> or </tag>
    # We need to handle attributes which might contain >
    # This is a naive parser but good for catching obvious issues
    tag_re = re.compile(r'</?([a-zA-Z0-9]+)[^>]*>')
    
    errors = []
    
    for i, line in enumerate(lines):
        # Remove code blocks or comments if possible, but basic line scan is okay for now
        matches = tag_re.finditer(line)
        for match in matches:
            full_tag = match.group(0)
            tag_name = match.group(1).lower()
            
            if tag_name in SELF_CLOSING:
                continue
                
            # Check if it's a self-closing JSX tag like <img />
            if full_tag.endswith('/>'):
                continue
            
            if full_tag.startswith('</'):
                # Closing tag
                if not stack:
                    errors.append(f"Line {i+1}: Unexpected closing tag </{tag_name}>")
                else:
                    last_tag = stack[-1]
                    if last_tag == tag_name:
                        stack.pop()
                    else:
                        # Mismatch
                        # However, sometimes we have unclosed tags that are valid in HTML5 but strict in MDX?
                        # No, MDX requires strict closing.
                        # Sometimes we might have a nesting structure we missed.
                        pass # Let's just track open ones at the end
            else:
                # Opening tag
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
            check_balanced_tags(os.path.join(CONTENT_DIR, filename))

if __name__ == "__main__":
    main()
