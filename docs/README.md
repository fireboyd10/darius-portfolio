# Downloadable CV

`CV.html` is the editable source for `public/CV.pdf`. It retains the original CV's contact details, freelance work, earlier internships, education, languages, activities, and green/gray styling, with SAP first in work experience.

To update the PDF without adding website dependencies:

1. Edit `docs/CV.html` and open it in Chrome or Edge.
2. Print to PDF using A4 paper, no margins, background graphics enabled, and browser headers/footers disabled. Use 100% scale and check that the preview has two pages without clipped text.
3. Save as `public/CV.pdf`, replacing the existing file. The website's Download CV button uses this file, and the React build copies it into the deployment.

Always inspect both PDF pages after exporting, including the bottom of page 1, and confirm that links remain clickable.
