import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

import pokemons from '../data';

describe('Testa a página favorites', () => {
  test('1 - Testa se não tiver favorites, exibe "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const messageerror = screen.getByText(/no favorite pokemon found/i);
    expect(messageerror).toBeInTheDocument();
  });

  test('2 - Teste se renderiza o pokemo favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);

    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
  });
});
