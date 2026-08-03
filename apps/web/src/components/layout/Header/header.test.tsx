import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';

describe('Header', () => {
  it('renders the announcement and header', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /PGCB/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('opens and closes the mobile menu', async () => {
    global.innerWidth = 500;
    const user = userEvent.setup();

    render(<Header />);

    const toggle = screen.getByRole('button');
    expect(toggle).toBeInTheDocument();

    await user.click(toggle);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
