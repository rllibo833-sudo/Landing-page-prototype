# Google Search Console verification

Do not commit a placeholder verification token. Google generates a unique HTML verification file for each property/account.

## If you cannot upload the HTML file

1. In Search Console, choose the URL-prefix property `https://rllibo833-sudo.github.io/kawasan-masjid-public/`.
2. Select **HTML tag** as the verification method instead of HTML file.
3. Copy the complete `<meta name="google-site-verification" content="YOUR_UNIQUE_TOKEN" />` tag.
4. Add that exact tag inside the `<head>` section of `index.html` in this repository, preserving the token exactly.
5. Commit the change to the published `main` branch and wait for GitHub Pages to deploy.
6. Open the published homepage, inspect page source, and confirm the meta tag appears in the `<head>`.
7. Return to Search Console and press **Verify**.

The token is unique. Never use a guessed or placeholder token. If HTML tag is unavailable, use the DNS TXT method only if you control a domain you own. For a GitHub Pages URL, HTML-tag verification is usually the simplest alternative.

## Sitemap

After verification, submit:
`https://rllibo833-sudo.github.io/kawasan-masjid-public/sitemap.xml`

Existing `robots.txt` and `sitemap.xml` are already present in the repository. Submitting the sitemap does not guarantee immediate indexing.