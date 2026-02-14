
import os
import re
import json

def is_japanese(text):
    return re.search(r'[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]', text)

root_dir = "c:/Users/Desktop-Dev/Desktop/voich2014 creative coding"
stats = {
    "total_files": 0,
    "files_with_japanese": 0,
    "total_japanese_lines": 0,
    "unique_japanese_lines": set()
}

details = {}

for dirpath, dirnames, filenames in os.walk(root_dir):
    if ".git" in dirpath:
        continue
    
    for filename in filenames:
        if filename.endswith(('.html', '.js', '.md', '.css')):
            filepath = os.path.join(dirpath, filename)
            stats["total_files"] += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    
                file_japanese_lines = []
                for i, line in enumerate(lines):
                    if is_japanese(line):
                        file_japanese_lines.append((i + 1, line.strip()))
                        stats["unique_japanese_lines"].add(line.strip())
                
                if file_japanese_lines:
                    stats["files_with_japanese"] += 1
                    stats["total_japanese_lines"] += len(file_japanese_lines)
                    details[filepath] = file_japanese_lines
                    
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

print(f"Total Files Scanned: {stats['total_files']}")
print(f"Files with Japanese: {stats['files_with_japanese']}")
print(f"Total Japanese Lines: {stats['total_japanese_lines']}")
print(f"Unique Japanese Lines: {len(stats['unique_japanese_lines'])}")


# Save all unique lines to unique_japanese.txt for translation
sorted_lines = sorted(list(stats["unique_japanese_lines"]))
with open("unique_japanese.txt", "w", encoding="utf-8") as f:
    for line in sorted_lines:
        f.write(line + "\n")

# Save detailed map to json to know where each line comes from
# details matches exact lines, but we have whitespace stripped in unique set.
# checking strip() match
line_map = {}
for filepath, lines in details.items():
    for line_num, text in lines:
        stripped = text.strip()
        if stripped not in line_map:
            line_map[stripped] = []
        line_map[stripped].append({"file": filepath, "line": line_num})

with open("japanese_occurrences.json", "w", encoding="utf-8") as f:
    json.dump(line_map, f, ensure_ascii=False, indent=2)

