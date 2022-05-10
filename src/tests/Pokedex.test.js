import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import pokemons from '../data';

describe('Testa a página Pokedex', () => {
  test('1 - Teste se a página contém um heading h2', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      lavel: 2,
      name: /Encountered pokémons/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('2 - Teste se é exibido o próximo pokémon da lista quando o botão', () => {
    renderWithRouter(<App />);
    const buttonProx = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonProx).toBeInTheDocument();
    pokemons.forEach((pokemon, index) => {
      const numberPosition = 8;
      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName).toHaveTextContent(pokemon.name);

      userEvent.click(buttonProx);

      if (index === numberPosition) {
        expect(pokeName).toHaveTextContent('Pikachu');
      }
    });
  });

  test('3 - Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const myArry = screen.getAllByTestId('pokemon-name');

    expect(myArry).toHaveLength(1);
  });

  test('4 - Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const numberPosition = 7;
    const allButton = screen.getAllByTestId('pokemon-type-button');
    expect(allButton).toHaveLength(numberPosition);

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();

    allButton.push(buttonAll);

    expect(allButton[0]).toHaveTextContent('Electric');
    expect(allButton[7]).toHaveTextContent('All');
    expect(buttonAll).toBeInTheDocument();
  });

  test('5 - Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const isPikachu = screen.getByText('Pikachu');
    expect(isPikachu).toBeInTheDocument();
  });
});
