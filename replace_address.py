import os

replacements = [
    ("ул. Гоголя 75/1, угол ул. Тулебаева", "Гоголя 75/1 уг. ул.Тулебаева"),
    ("ул. Гоголя, д. 75", "Гоголя 75/1 уг. ул.Тулебаева"),
    ("ул. Гоголя, 75", "Гоголя 75/1 уг. ул.Тулебаева"),
    ("ул. Гоголя 75/1", "Гоголя 75/1 уг. ул.Тулебаева"),
    ("Гоголя, дом 75", "Гоголя 75/1 уг. ул.Тулебаева"),
    ("Гоголя 75 Алматы", "Гоголя 75/1 уг. ул.Тулебаева Алматы"),
    ("Гоголя 75/1.", "Гоголя 75/1 уг. ул.Тулебаева."),
    ("Гоголя 75/1,", "Гоголя 75/1 уг. ул.Тулебаева,"),
    ("Гоголя 75/1 или", "Гоголя 75/1 уг. ул.Тулебаева или"),
    ("Гоголя 75/1\"", "Гоголя 75/1 уг. ул.Тулебаева\""),
]

for root, _, files in os.walk("src"):
    for file in files:
        if file.endswith(".tsx") or file.endswith(".ts") or file.endswith(".json"):
            path = os.path.join(root, file)
            with open(path, "r") as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements:
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(path, "w") as f:
                    f.write(new_content)
                print(f"Updated {path}")
