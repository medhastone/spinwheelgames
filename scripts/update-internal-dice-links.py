import re

files_and_replacements = [
    (
        'components/dice/DiceNavigation.tsx',
        [("href: '/roll-1d4'", "href: '/dice/d4'"), ("label: 'Roll 1d4'", "label: 'Roll d4'")]
    ),
    (
        'components/navigation/DiceNavHeader.tsx',
        [("href: '/roll-1d4'", "href: '/dice/d4'")]
    ),
    (
        'components/navigation/DiceFooter.tsx',
        [
            ('href="/roll-1d4"', 'href="/dice/d4"'),
            ("href: '/roll-1d4'", "href: '/dice/d4'")
        ]
    ),
    (
        'components/HomeDicePromo.tsx',
        [("href: '/roll-1d4'", "href: '/dice/d4'")]
    ),
    (
        'components/SitemapDirectoryView.tsx',
        [("href: '/roll-1d4'", "href: '/dice/d4'")]
    ),
    (
        'app/dice-roller/page.tsx',
        [('href="/roll-1d4"', 'href="/dice/d4"')]
    ),
    (
        'app/dice-average-calculator/page.tsx',
        [("link: '/roll-1d4'", "link: '/dice/d4'")]
    ),
    (
        'app/llms.txt/route.ts',
        [('https://spinwheelgames.org/roll-1d4', 'https://spinwheelgames.org/dice/d4')]
    ),
    (
        'lib/searchIndex.ts',
        [("fullPath: '/roll-1d4'", "fullPath: '/dice/d4'")]
    ),
    (
        'app/sitemaps/tools.xml/route.ts',
        [("path: '/roll-1d4'", "path: '/dice/d4'")]
    ),
    (
        'scripts/generate-sitemap.ts',
        [("path: '/roll-1d4'", "path: '/dice/d4'")]
    )
]

for filepath, replacements in files_and_replacements:
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        modified = content
        for old, new in replacements:
            if old in modified:
                modified = modified.replace(old, new)
                print(f"Replaced '{old}' with '{new}' in {filepath}")
            else:
                print(f"WARNING: '{old}' not found in {filepath}")
        if modified != content:
            with open(filepath, 'w') as f:
                f.write(modified)
    except Exception as e:
        print(f"Error updating {filepath}: {e}")

print("Internal links update complete!")
