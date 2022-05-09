import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js', () => {
  test('1 - Verifica se existe os links para as páginas das páginas', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorits = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorits).toBeInTheDocument();
  });

  test('2 - Verifica se ao clicar no link Home é feita o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  test('3 - Verifica se ao clicar no link About é feita o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('4 - Verifica se ao clicar no link Favorites é feita o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorits = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorits).toBeInTheDocument();
    userEvent.click(linkFavorits);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('5 - Verifica se ao uma rota que não existe a página notFound é chamada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/sdfhdjs');
    const { pathname } = history.location;
    expect(pathname).toBe('/sdfhdjs');
  });
});
