import { render, screen } from '@testing-library/react';
import { CardsList } from '../../src/components/CardList/CardsList';
import '@testing-library/jest-dom';

describe('card list test', () => {
	it('should display flashcards in the list properly', async () => {
		const cards = [
			{ _id: '1', front: 'Front 1', back: 'Back 1' },
			{ _id: '2', front: 'Front 2', back: 'Back 2' },
		];

		render(
			<CardsList
				card={cards}
				updateCards={() => {}}
				removeCard={() => {}}
			/>,
		);

		cards.forEach(card => {
			const frontText = screen.getByText(card.front);
			const backText = screen.getByText(card.back);

			expect(frontText).toBeInTheDocument();
			expect(backText).toBeInTheDocument();
		});
	});
});
