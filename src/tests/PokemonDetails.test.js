import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente PokemonDetails', () => {
  test('1 - A página deve conter um texto <name> Details', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const moreDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });

    expect(moreDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();

    const details = screen.getByRole('heading', { lavel: 2, name: /summary/i });
    expect(details).toBeInTheDocument();

    const description = screen.getByText(/this intelligent pokémon roasts hard /i);
    expect(description).toBeInTheDocument();
  });

  test('2 - Teste se existe uma seção com os mapas da localizaçõe do pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const gameOf = screen.getByRole('heading', {
      lavel: 2,
      name: /game locations of pikachu/i,
    });

    expect(gameOf).toBeInTheDocument();

    const location = screen.getAllByRole('img', {
      name: /location/i,
    });

    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    const descriptionLocation = screen.getAllByText(/Kanto/i);

    expect(descriptionLocation[0]).toBeInTheDocument();
    expect(descriptionLocation[1]).toBeInTheDocument();
    expect(location[0]).toBeInTheDocument();
    expect(location[1]).toBeInTheDocument();
    expect(location[0].alt).toBe('Pikachu location');
    expect(location[1].alt).toBe('Pikachu location');
    expect(location[0].src).toBe(url1);
    expect(location[1].src).toBe(url2);
  });

  test('3 - Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const linkFavorites = screen.getByText(/pokémon favoritado\?/i);
    expect(linkFavorites).toBeInTheDocument();

    userEvent.click(linkFavorites);
    const favorites = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorites).toBeInTheDocument();

    userEvent.click(linkFavorites);
    expect(favorites).not.toBeInTheDocument();
  });
});
