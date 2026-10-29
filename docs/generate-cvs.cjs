const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const toolArgument = process.argv.indexOf('--tools-dir');
const fontArgument = process.argv.indexOf('--fonts-dir');
if (toolArgument < 0 || !process.argv[toolArgument + 1]) {
  throw new Error('Usage: node docs/generate-cvs.cjs --tools-dir <directory containing node_modules> [--fonts-dir <Arial/Trebuchet/Verdana font directory>]');
}
const toolDirectory = path.resolve(process.argv[toolArgument + 1]);
const fontDirectory = fontArgument >= 0 ? path.resolve(process.argv[fontArgument + 1]) : 'C:/Windows/Fonts';
const { PDFDocument, PDFName, PDFArray, PDFString, rgb } = require(path.join(toolDirectory, 'node_modules/pdf-lib'));
const fontkit = require(path.join(toolDirectory, 'node_modules/@pdf-lib/fontkit'));
const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'cv-content.json'), 'utf8'));
const templateBytes = fs.readFileSync(path.join(__dirname, 'original-template.pdf'));
const outputDirectory = path.resolve(__dirname, '../public');
const gray = rgb(.337, .337, .337);
const darkGray = rgb(.247, .247, .247);
const lightGray = rgb(.65, .65, .65);
const green = rgb(.231, .62, .502);
const blue = rgb(.275, .471, .525);
const black = rgb(0, 0, 0);
const bodySize = 9.96;
const lineHeight = 12.84;
const measurements = [];

function text(page, value, x, y, font, size = bodySize, color = gray) {
  if (value.includes('\u2014') || value.includes('--')) throw new Error(`Unsupported prose separator: ${value}`);
  if (y < 33 && value.trim()) throw new Error(`Text is too close to the footer: ${value}`);
  const width = font.widthOfTextAtSize(value, size);
  if (x + width > 570.5) throw new Error(`Text exceeds the right margin: ${value}`);
  page.drawText(value, { x, y, font, size, color });
  return width;
}

function link(document, page, value, x, y, font, size = bodySize) {
  const width = text(page, value, x, y, font, size, blue);
  page.drawLine({ start: { x, y: y - 1.1 }, end: { x: x + width, y: y - 1.1 }, thickness: .45, color: blue });
  const annotation = document.context.obj({
    Type: 'Annot', Subtype: 'Link', Rect: [x - 1, y - 2, x + width + 1, y + size], Border: [0, 0, 0],
    A: { Type: 'Action', S: 'URI', URI: PDFString.of(value.includes('@') && !value.startsWith('http') ? `mailto:${value}` : value) }
  });
  page.node.addAnnot(document.context.register(annotation));
  return width;
}

function wrap(value, font, size, width) {
  const lines = [];
  let current = '';
  for (const word of value.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > width && current) { lines.push(current); current = word; }
    else current = candidate;
  }
  if (current) lines.push(current);
  return lines;
}

function paragraph(page, value, x, y, width, font, size = bodySize, color = gray) {
  const lines = wrap(value, font, size, width);
  lines.forEach((line, index) => text(page, line, x, y - index * lineHeight, font, size, color));
  return y - lines.length * lineHeight;
}

function labeled(page, label, value, x, y, fonts, size = bodySize, color = gray) {
  const width = text(page, label, x, y, fonts.bold, size, color);
  return x + width + text(page, value, x + width, y, fonts.regular, size, color);
}

function location(page, value, x, y, fonts) {
  for (const part of value.split(/(Oraș:|Țară:|Website:|Profil:)/)) {
    const isLabel = /^(Oraș:|Țară:|Website:|Profil:)$/.test(part);
    x += text(page, part, x, y, isLabel ? fonts.bold : fonts.regular);
  }
  return x;
}

function richParagraph(page, label, value, x, y, width, fonts, color = gray) {
  const labelWidth = fonts.bold.widthOfTextAtSize(`${label} `, bodySize);
  text(page, `${label} `, x, y, fonts.bold, bodySize, color);
  const words = value.split(/\s+/);
  let current = '';
  let lineX = x + labelWidth;
  let remaining = width - labelWidth;
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (fonts.regular.widthOfTextAtSize(candidate, bodySize) > remaining && current) {
      text(page, current, lineX, y, fonts.regular, bodySize, color);
      y -= lineHeight; lineX = x; remaining = width; current = word;
    } else current = candidate;
  }
  if (current) text(page, current, lineX, y, fonts.regular, bodySize, color);
  return y - lineHeight;
}

async function fontsFor(document) {
  document.registerFontkit(fontkit);
  const result = {};
  for (const [name, file] of Object.entries({ regular: 'arial.ttf', bold: 'arialbd.ttf', role: 'trebucbi.ttf', footer: 'verdana.ttf', link: 'times.ttf' })) {
    result[name] = await document.embedFont(fs.readFileSync(path.join(fontDirectory, file)), { subset: true });
  }
  return result;
}

function newStream(document, source) {
  return document.context.register(document.context.flateStream(Buffer.from(source, 'latin1')));
}

function clearContents(document, page) {
  page.node.set(PDFName.of('Contents'), document.context.obj([]));
  page.node.set(PDFName.of('Annots'), document.context.obj([]));
}

function readStream(document, page) {
  const stream = document.context.lookup(page.node.Contents());
  return zlib.inflateSync(stream.getContents()).toString('latin1');
}

function roleHeading(page, role, dates, y, fonts) {
  const width = text(page, role, 25.32, y, fonts.role, 11.04, gray);
  text(page, ` ${dates}`, 25.32 + width, y, fonts.regular, bodySize, lightGray);
}

function sapEntry(page, entry, fonts) {
  roleHeading(page, entry.title, entry.dates, 589.42, fonts);
  text(page, entry.location, 25.32, 573.07, fonts.regular, bodySize, gray);
  let y = 556.5;
  for (const bullet of entry.bullets) {
    text(page, '•', 25.32, y, fonts.regular);
    y = paragraph(page, bullet, 35.28, y, 533.88, fonts.regular);
  }
  const end = y + lineHeight;
  const shift = Math.max(115, Math.ceil(589.42 - (end - 17)));
  if (shift > 145) throw new Error('SAP entry is too tall to preserve the original work layout. Shorten it or explicitly add a page.');
  measurements.push({ language: entry === content.en.sap ? 'en' : 'ro', sapLastBaseline: end, existingBodyShift: shift });
  return shift;
}

async function english() {
  const original = await PDFDocument.load(templateBytes);
  const document = await PDFDocument.create();
  const pages = await document.copyPages(original, [0, 1]);
  pages.forEach(page => document.addPage(page));
  const fonts = await fontsFor(document);
  const first = pages[0];
  const source = readStream(document, first);
  const firstBodyPosition = source.indexOf('1 0 0 1 25.32 589.42 Tm');
  const bodyStart = source.lastIndexOf('\nq\r\n', firstBodyPosition);
  const ruleStart = source.lastIndexOf('0.231 0.62 0.502 rg');
  if (firstBodyPosition < 0 || bodyStart < 0 || ruleStart <= bodyStart) throw new Error('Original PDF structure changed; inspect the template before composing it.');
  const headingAndFrame = source.slice(0, bodyStart);
  const existingWork = source.slice(bodyStart, ruleStart);
  const sectionRule = source.slice(ruleStart);
  first.node.set(PDFName.of('Contents'), document.context.obj([newStream(document, headingAndFrame + sectionRule)]));
  const shift = sapEntry(first, content.en.sap, fonts);
  first.node.addContentStream(newStream(document, `q\n1 0 0 1 0 ${-shift} cm\n${existingWork}\nQ\n`));
  const annotations = first.node.Annots();
  for (let index = 0; index < annotations.size(); index++) {
    const annotation = document.context.lookup(annotations.get(index));
    const rectangle = annotation.lookup(PDFName.of('Rect'), PDFArray).asArray().map(number => number.asNumber());
    if (rectangle[1] > 170 && rectangle[3] < 610) {
      rectangle[1] -= shift; rectangle[3] -= shift;
      annotation.set(PDFName.of('Rect'), document.context.obj(rectangle));
    }
  }
  document.setTitle('Darius-Stefan Aniculaesei - CV');
  document.setAuthor('Darius Stefan Aniculaesei');
  document.setLanguage('en');
  await fs.promises.writeFile(path.join(outputDirectory, 'CV.pdf'), await document.save());
}

function frame(page, number, fonts) {
  page.drawRectangle({ x: 0, y: 823.96, width: 594.95, height: 17, color: green });
  page.drawRectangle({ x: 0, y: 772.96, width: 17.008, height: 68, color: green });
  page.drawRectangle({ x: 578.26, y: 772.96, width: 16.69, height: 68, color: green });
  page.drawRectangle({ x: 0, y: 0, width: 17.04, height: 85.584, color: green });
  page.drawText(`${number} /`, { x: 548.04, y: 10.08, font: fonts.footer, size: bodySize, color: rgb(.51, .675, .847) });
}

function sectionHeading(page, heading, y, fonts) {
  text(page, heading, 25.32, y, fonts.bold, 11.04, darkGray);
  page.drawLine({ start: { x: 26.05, y: y - 16.24 }, end: { x: 569.15, y: y - 16.24 }, thickness: .7, color: green });
}

function arrowBlock(originalSource) {
  const position = originalSource.indexOf('1 0 0 1 78.864 547.39 Tm');
  const start = originalSource.lastIndexOf('\nq\r\n', position);
  const end = originalSource.indexOf('\nQ', position) + 2;
  if (position < 0 || start < 0 || end < start) throw new Error('Original project marker could not be located.');
  return originalSource.slice(start, end);
}

function project(document, page, item, y, fonts, originalArrow) {
  page.node.addContentStream(newStream(document, `q\n1 0 0 1 0 ${y - 547.39} cm\n${originalArrow}\nQ\n`));
  let titleEnd = 108.02 + text(page, item.title, 108.02, y, fonts.bold);
  if (item.suffix) {
    const suffixWidth = fonts.regular.widthOfTextAtSize(item.suffix, bodySize);
    if (titleEnd + suffixWidth > 569.16) { y -= lineHeight; titleEnd = 108.02; }
    titleEnd += text(page, item.suffix, titleEnd, y, fonts.regular);
  }
  if (item.inlineWebsite) {
    const linkWidth = fonts.link.widthOfTextAtSize(item.inlineWebsite, bodySize);
    if (titleEnd + 4 + linkWidth <= 569.16) link(document, page, item.inlineWebsite, titleEnd + 4, y, fonts.link);
    else { y -= lineHeight; link(document, page, item.inlineWebsite, 85.704, y, fonts.link); }
  }
  y -= 13.08;
  for (const bullet of item.bullets || []) {
    text(page, '•', 78.864, y, fonts.regular);
    y = paragraph(page, bullet, 85.704, y, 483.456, fonts.regular);
  }
  if (item.website) {
    text(page, '•', 78.864, y, fonts.regular);
    const labelWidth = text(page, 'Website: ', 85.704, y, fonts.regular);
    link(document, page, item.website, 85.704 + labelWidth, y, fonts.regular);
    y -= lineHeight;
  }
  return y + lineHeight - 26.0;
}

async function romanian() {
  const original = await PDFDocument.load(templateBytes);
  const document = await PDFDocument.create();
  const pages = await document.copyPages(original, [0, 1]);
  pages.forEach(page => document.addPage(page));
  const originalSource = readStream(document, pages[0]);
  const originalArrow = arrowBlock(originalSource);
  pages.forEach(page => clearContents(document, page));
  const fonts = await fontsFor(document);
  const ro = content.ro;
  const first = pages[0];
  frame(first, 1, fonts);
  text(first, 'DARIUS-STEFAN ANICULAESEI', 25.68, 749.26, fonts.bold, 12);
  labeled(first, `${ro.contact.phone}:`, ' +353 877771583', 25.68, 718.42, fonts);
  labeled(first, `${ro.contact.birth}:`, ' 04/01/2005', 432.1, 718.42, fonts);
  const emailX = labeled(first, `${ro.contact.email}:`, ' ', 25.68, 703.18, fonts);
  link(document, first, 'anc.darius@gmail.com', emailX, 703.18, fonts.regular);
  labeled(first, `${ro.contact.gender}:`, ` ${ro.contact.male}`, 432.1, 703.18, fonts);
  labeled(first, `${ro.contact.address}:`, ` ${ro.contact.addressValue}`, 25.68, 688.06, fonts);
  const githubX = text(first, 'GITHUB: ', 24.84, 658.3, fonts.bold, 11.04, black) + 24.84;
  link(document, first, 'https://github.com/fireboyd10', githubX, 658.3, fonts.link, 11.04);
  sectionHeading(first, ro.workHeading, 632.02, fonts);
  const shift = sapEntry(first, ro.sap, fonts);
  let y = 589.42 - shift;
  text(first, ro.freelanceHeading, 25.32, y, fonts.bold, 12, darkGray);
  y -= 16.35;
  location(first, ro.freelanceLocation, 25.32, y, fonts);
  y -= 25.68;
  for (const item of ro.projects) y = project(document, first, item, y, fonts, originalArrow);
  text(first, ro.internshipsHeading, 25.32, y, fonts.bold, 11.04, darkGray);
  y -= 17.04;
  for (const item of ro.internships) {
    roleHeading(first, item.title, item.dates, y, fonts);
    y -= 18.96;
    location(first, item.location, 25.32, y, fonts);
    y -= 25.68;
    y = paragraph(first, item.description, 25.32, y, 543.84, fonts.regular);
    y -= 12.87;
  }
  measurements.push({ language: 'ro', workLastBaseline: y + lineHeight + 12.87 });

  const second = pages[1];
  frame(second, 2, fonts);
  sectionHeading(second, ro.educationHeading, 721.9, fonts);
  const university = ro.university;
  text(second, university.degree, 25.32, 673.3, fonts.bold, 12);
  roleHeading(second, university.name, university.dates, 656.14, fonts);
  const universityLinkX = location(second, `${university.location} `, 26.04, 637.18, fonts);
  link(document, second, university.website, universityLinkX, 637.18, fonts.regular);
  const programmingX = 26.04 + text(second, `${university.programmingLabel} `, 26.04, 611.02, fonts.bold, 11.04);
  text(second, university.programming, programmingX, 611.02, fonts.regular);
  text(second, university.subjectsHeading, 26.04, 584.95, fonts.bold, 11.04);
  y = 559.87;
  for (const item of university.subjects) {
    text(second, '-', 26.04, y, fonts.regular);
    y = richParagraph(second, item.title, item.text, 44.04, y, 525.12, fonts);
  }
  y -= 13.0;
  text(second, ro.school.degree, 25.32, y, fonts.bold, 11.04);
  y -= 17.16;
  roleHeading(second, ro.school.name, ro.school.dates, y, fonts);
  y -= 18.96;
  location(second, ro.school.location, 25.32, y, fonts);
  y -= lineHeight;
  y -= 11.12;
  y = paragraph(second, ro.school.subjects, 25.32, y, 543.84, fonts.regular);
  y -= 13.32;
  const languagesX = 26.04 + text(second, `${ro.languagesLabel} `, 26.04, y, fonts.bold, 12, black);
  text(second, ro.languages, languagesX, y, fonts.regular, bodySize, black);
  y -= 38.76;
  text(second, ro.activitiesHeading, 26.04, y, fonts.bold, 12, black);
  y -= 25.68;
  for (const item of ro.activities) {
    text(second, '•', 44.04, y, fonts.regular, bodySize, black);
    y = paragraph(second, item, 62.064, y, 507.096, fonts.regular, bodySize, black);
    y -= 11.52;
  }
  measurements.push({ language: 'ro', educationLastBaseline: y + lineHeight + 11.52 });
  document.setTitle('Darius-Stefan Aniculaesei - CV in romana');
  document.setAuthor('Darius Stefan Aniculaesei');
  document.setLanguage('ro');
  await fs.promises.writeFile(path.join(outputDirectory, 'CV-RO.pdf'), await document.save());
}

(async () => {
  await english();
  await romanian();
  console.log(JSON.stringify({ output: ['public/CV.pdf', 'public/CV-RO.pdf'], measurements }, null, 2));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
