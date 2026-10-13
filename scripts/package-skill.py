#!/usr/bin/env python3
"""Package skills/rustfs-brand into public/downloads/rustfs-brand.skill (and a .zip copy)."""
import shutil
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parent.parent
skill = root / "skills" / "rustfs-brand"
out = root / "public" / "downloads"
out.mkdir(parents=True, exist_ok=True)
target = out / "rustfs-brand.skill"
with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(skill.rglob("*")):
        if f.is_file() and f.name != ".DS_Store":
            z.write(f, Path("rustfs-brand") / f.relative_to(skill))
shutil.copyfile(target, out / "rustfs-brand-skill.zip")
print(f"packaged {target.relative_to(root)}")
