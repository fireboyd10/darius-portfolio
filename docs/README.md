# Downloadable CVs

- `public/CV.pdf`: English, preserving the existing download URL.
- `public/CV-RO.pdf`: Romanian, with Romanian diacritics.

Both CVs use the original green borders, gray typography, outlined project arrows, bullet lists and section structure. The English CV retains the original PDF drawing commands and untouched education page; its existing work content moves down to make room for SAP.

## Source and regeneration

`cv-content.json` contains the new English SAP entry and the complete Romanian translation. `original-template.pdf` is the original English CV from commit `190c100`; its existing English material is retained directly. `generate-cvs.cjs` composes both final PDFs without changing the website's dependencies.

On Windows, install the two PDF generation libraries in a temporary directory outside the repository, then run the composer from the repository root:

```powershell
$cvTools = Join-Path $env:TEMP 'portfolio-cv-tools'
npm.cmd install --prefix $cvTools --no-save --package-lock=false pdf-lib@1.17.1 @pdf-lib/fontkit@1.1.1
node docs/generate-cvs.cjs --tools-dir $cvTools
```

The composer uses Arial, Arial Bold, Trebuchet MS Bold Italic, Verdana and Times New Roman from `C:/Windows/Fonts`. On another system, supply a directory containing the corresponding font files with `--fonts-dir <directory>`.

To change the new English entry or Romanian text, edit `cv-content.json` and regenerate. Changes to older English material require editing `original-template.pdf`; changes to its layout may also require adjusting the insertion coordinates in the composer.

Inspect every generated page before deployment. Check that SAP appears first, original content is retained, text does not overlap the footer, and all links remain clickable. The composer rejects text outside the printable margins. The React build copies both public PDFs into the deployment.
