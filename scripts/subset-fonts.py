"""把 src/assets/fonts/*.ttf 按项目实际用字子集化为 woff2。

大屏文案是硬编码的：改动页面文字后需重跑本脚本
（python3 scripts/subset-fonts.py），否则新字符会回退到系统字体。
"""

import pathlib

from fontTools import subset

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

def collect_chars() -> set[str]:
    chars: set[str] = set()
    for pattern in ("*.tsx", "*.ts", "*.css"):
        for f in SRC.rglob(pattern):
            chars.update(f.read_text(encoding="utf-8"))
    # ASCII 全量兜底（数字/字母/标点，Oswald 走的是数字）
    chars.update(chr(c) for c in range(0x20, 0x7F))
    return chars

def main() -> None:
    text = "".join(sorted(collect_chars()))
    fonts_dir = SRC / "assets" / "fonts"
    for ttf in sorted(fonts_dir.glob("*.ttf")):
        out = ttf.with_suffix(".woff2")
        args = [
            str(ttf),
            f"--output-file={out}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
            f"--text={text}",
        ]
        subset.main(args)
        print(f"{ttf.name}: {ttf.stat().st_size // 1024}KB -> {out.stat().st_size // 1024}KB")

if __name__ == "__main__":
    main()
