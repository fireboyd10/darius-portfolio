import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  process.env.PUBLIC_URL = '/darius-portfolio';
  window.history.replaceState({}, '', '/darius-portfolio/');
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

test('leads with SAP experience while retaining the existing portfolio content', () => {
  render(<App />);

  const sap = screen.getByRole('heading', { name: 'Intern — SAP' });
  const firstProject = screen.getByText('Irisphera — Virtual Stylist');
  expect(sap.compareDocumentPosition(firstProject) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByText(/Feb 2026 – Aug 2026/)).toBeInTheDocument();
  expect(screen.getByText(/Developed Hermes/)).toBeInTheDocument();

  [
    'Meat Ordering Platform — Marketplace UI',
    'SynergeticMind — Membership Platform',
    'Intern — iSTYLE (Apple Premium Reseller)',
    'Intern — Trady 2000',
    'Education',
    'Languages',
  ].forEach(title => expect(screen.getByText(title)).toBeInTheDocument());
});

test('keeps the CV download at the site root on the nested MORE route', () => {
  window.history.replaceState({}, '', '/darius-portfolio/contact/');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Honors & Activities' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Music Production' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Download CV' }).href)
    .toBe(`${window.location.origin}/darius-portfolio/CV.pdf`);
});
