#!/usr/bin/env python3
"""Build a reproducible, public brand-assets download from the current sources."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent.parent
target = root / "public/downloads/rustfs-brand-assets.zip"
target.parent.mkdir(parents=True, exist_ok=True)
sources = [(path, str(path.relative_to(root / "public")))
           for path in sorted((root / "public/brand").rglob("*")) if path.is_file() and path.name != ".DS_Store"]
sources += [(root / "tokens" / name, f"tokens/{name}") for name in ("tokens.json", "tokens.css", "tailwind.css")]
sources += [(root / "public" / name, name) for name in ("favicon.ico", "apple-touch-icon.png")]
sources.append((root / "DESIGN.md", "DESIGN.md"))

with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
    for source, name in sources:
        entry = zipfile.ZipInfo(f"rustfs-brand/{name}")
        entry.compress_type = zipfile.ZIP_DEFLATED
        entry.external_attr = 0o644 << 16
        archive.writestr(entry, source.read_bytes())

print(f"Packaged {len(sources)} files: {target.relative_to(root)}")
