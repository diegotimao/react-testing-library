import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página About', () => {
  test('1 - Testa se a página About é renderizada', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const textInfo = screen.getByRole('heading', {
      lavel: 2,
      name: 'About Pokédex',
    });
    expect(textInfo).toBeInTheDocument();

    const text1 = /This application simulates a Pokédex/i;
    const tagP = screen.getByText(text1);
    expect(tagP).toBeInTheDocument();
    const text2 = /One can filter Pokémons by type/i;
    const tap2 = screen.getByText(text2);
    expect(tap2).toBeInTheDocument();
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(image);
  });
});
