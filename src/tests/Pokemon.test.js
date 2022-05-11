import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

import pokemons from '../data';

describe('Teste se é renderizado um card com as informações do pokémon', () => {
  test('1 - O nome correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const name = screen.getByText(/pikachu/i);
    const type = screen.getByText('Electric');
    const peso = screen.getByText('Average weight: 6.0 kg');
    const imagem = screen.getByRole('img', { name: /pikachu sprite/i });
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(peso).toBeInTheDocument();
    expect(imagem).toBeInTheDocument();
    expect(imagem.src).toBe(imgUrl);
  });

  test('2 - Teste o card do pokémon contém um link de navegação', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('3 - Teste se ao clicar no link do pokemon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const details = screen.getByRole('heading', { name: /pikachu details/i });
    expect(details).toBeInTheDocument();
  });

  test('4 - Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star.alt).toBe('Pikachu is marked as favorite');
  });
});
