import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewCard } from '../../src/components/NewCard/NewCard';

describe('NewCard Component Tests', () => {
	it('should not be possible to add a flashcard when front or back card value is empty', async () => {
		const onSaveClickMock = jest.fn();
		render(
			<NewCard
				checker={true}
				reset={() => {}}
				onSaveClick={onSaveClickMock}
			/>,
		);

		fireEvent.click(screen.getByTestId('SaveBtn'));
		expect(onSaveClickMock).not.toHaveBeenCalled();
	});

	it('should be possible to add a flashcard when front and back values are present', async () => {
		const onSaveClickMock = jest.fn();
		render(
			<NewCard
				checker={true}
				reset={() => {}}
				onSaveClick={onSaveClickMock}
			/>,
		);

		fireEvent.change(screen.getByTestId('front-textarea-first-step'), {
			target: { value: 'Front Value' },
		});
		fireEvent.click(screen.getByText('Next'));

		fireEvent.change(screen.getByTestId('back-textarea-second-step'), {
			target: { value: 'Back Value' },
		});
		fireEvent.click(screen.getByTestId('SaveBtn'));


		await waitFor(() => {
			expect(onSaveClickMock).toHaveBeenCalledWith('Front Value', 'Back Value');
		});
	});
});
