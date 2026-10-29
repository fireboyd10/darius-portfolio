import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  process.env.PUBLIC_URL = '/darius-portfolio';
  window.history.replaceState({}, '', '/darius-portfolio/');
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

test('leads with SAP experience while retaining the existing portfolio content', () => {
  render(<App />);

  const sap = screen.getByRole('heading', { name: /Intern.*SAP/ });
  const firstProject = screen.getByText(/^Irisphera/);
  expect(sap.compareDocumentPosition(firstProject) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByText(/Feb 2026.*Aug 2026/)).toBeInTheDocument();
  expect(screen.getByText(/Developed Hermes/)).toBeInTheDocument();

  [
    /Meat Ordering Platform/,
    /SynergeticMind.*Membership Platform/,
    /Intern.*iSTYLE/,
    /Intern.*Trady 2000/,
    /^Education$/,
    /^Languages$/,
  ].forEach(title => expect(screen.getByText(title)).toBeInTheDocument());
});

test('offers both CV languages from the nested MORE route', () => {
  window.history.replaceState({}, '', '/darius-portfolio/contact/');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Honors & Activities' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Music Production' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Download CV' }));
  expect(screen.getByRole('link', { name: 'CV English (PDF)' }).href)
    .toBe(`${window.location.origin}/darius-portfolio/CV.pdf`);
  expect(screen.getByRole('link', { name: 'CV Română (PDF)' }).href)
    .toBe(`${window.location.origin}/darius-portfolio/CV-RO.pdf`);
});

test('switches language without changing the route or clearing a contact draft', () => {
  window.history.replaceState({}, '', '/darius-portfolio/contact');
  const { container, unmount } = render(<App />);
  const name = container.querySelector('[name="user_name"]');
  fireEvent.change(name, { target: { value: 'Darius' } });
  fireEvent.change(screen.getByRole('combobox', { name: 'Website language' }), {
    target: { value: 'ro' },
  });

  expect(document.documentElement.lang).toBe('ro');
  expect(localStorage.getItem('portfolio-language')).toBe('ro');
  expect(window.location.pathname).toBe('/darius-portfolio/contact');
  expect(name).toHaveValue('Darius');
  expect(screen.getByRole('button', { name: 'Trimite' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ACASĂ' })).toBeInTheDocument();
  expect(screen.getByText(/2026 Darius Stefan Aniculaesei/)).toBeInTheDocument();

  unmount();
  render(<App />);
  expect(screen.getByRole('combobox', { name: 'Limba site-ului' })).toHaveValue('ro');
  expect(document.documentElement.lang).toBe('ro');
});

test('retains SAP and both CV downloads when opened in Romanian', () => {
  localStorage.setItem('portfolio-language', 'ro');
  render(<App />);

  expect(screen.getByRole('heading', { name: /Stagiar.*SAP/ })).toBeInTheDocument();
  expect(screen.getByText(/Hermes/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Descarcă CV' }));
  expect(screen.getByRole('link', { name: 'CV English (PDF)' })).toHaveAttribute('href', '/darius-portfolio/CV.pdf');
  expect(screen.getByRole('link', { name: 'CV Română (PDF)' })).toHaveAttribute('href', '/darius-portfolio/CV-RO.pdf');

  fireEvent.change(screen.getByRole('combobox', { name: 'Limba site-ului' }), {
    target: { value: 'en' },
  });
  expect(document.documentElement.lang).toBe('en');
  expect(screen.getByRole('heading', { name: /Intern.*SAP/ })).toBeInTheDocument();
});

test('defaults to English when the stored language is unsupported', () => {
  localStorage.setItem('portfolio-language', 'fr');
  render(<App />);
  expect(screen.getByRole('combobox', { name: 'Website language' })).toHaveValue('en');
  expect(document.documentElement.lang).toBe('en');
});

test('allows language changes when browser storage is unavailable', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  render(<App />);

  fireEvent.change(screen.getByRole('combobox', { name: 'Website language' }), {
    target: { value: 'ro' },
  });
  expect(document.documentElement.lang).toBe('ro');
  expect(screen.getByRole('heading', { name: /Stagiar.*SAP/ })).toBeInTheDocument();
});

test('keeps the navigation toggle state and label accessible in both languages', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');

  fireEvent.change(screen.getByRole('combobox', { name: 'Website language' }), {
    target: { value: 'ro' },
  });
  expect(screen.getByRole('button', { name: 'Deschide sau închide meniul' }))
    .toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Deschide sau închide meniul' }));
  expect(screen.getByRole('button', { name: 'Deschide sau închide meniul' }))
    .toHaveAttribute('aria-expanded', 'false');
});
