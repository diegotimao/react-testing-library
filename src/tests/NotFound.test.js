import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa a página NotFound', () => {
  test('1 - Verifica se contém um H2 contendo um texto de erro', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/ddfdsfsj');
    const { pathname } = history.location;
    expect(pathname).toBe('/ddfdsfsj');

    const messageError = screen.getByRole('heading', {
      lavel: 2,
      name: /Page requested not found/i,
    });

    expect(messageError).toBeInTheDocument();

    const imageGif = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    const sourc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imageGif).toHaveAttribute('src', sourc);
  });
});
