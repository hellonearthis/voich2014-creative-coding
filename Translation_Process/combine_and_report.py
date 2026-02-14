
import json
import os

parts = ["translations_part_1.json", "translations_part_2.json"]
all_translations = []

for p in parts:
    try:
        with open(p, "r", encoding="utf-8") as f:
            all_translations.extend(json.load(f))
    except Exception as e:
        print(f"Error reading {p}: {e}")

# Save combined
with open("translations.json", "w", encoding="utf-8") as f:
    json.dump(all_translations, f, ensure_ascii=False, indent=2)

# Generate Markdown
md_content = "# Translation Review (Batch 1: 200 items)\n\n"
md_content += "> [!IMPORTANT]\n"
md_content += "> This is the first batch of translations (200 out of ~2880 unique lines).\n"
md_content += "> Please review the style, especially recurring terms like 'Papa' (パパ).\n\n"
md_content += "| ID | Original Japanese | Proposed English |\n"
md_content += "| :--- | :--- | :--- |\n"

for i, item in enumerate(all_translations):
    orig = item["original"].replace("|", "\\|").replace("\n", "<br>")
    trans = item["translated"].replace("|", "\\|").replace("\n", "<br>")
    md_content += f"| {i+1} | `{orig}` | **{trans}** |\n"

with open("TRANSLATION_REVIEW.md", "w", encoding="utf-8") as f:
    f.write(md_content)
