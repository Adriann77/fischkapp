import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Card } from '../../src/components/Card/Card';
import { jest } from '@jest/globals';

describe('edit card test', () => {
	it('It should not be possible to edit a flashcard by clicking Save button when edited value is empty', async () => {
		render(
			<Card
				front={''}
				back={''}
				update={() => {}}
				removeCard={() => {}}
				cardId={''}
			/>,
		);

		const dateSpy = jest.spyOn(global, 'Date');

		fireEvent.click(screen.getByTestId('Edit'));

		fireEvent.change(screen.getByTestId('Front'), { target: { value: '' } });

		fireEvent.click(screen.getByText('Save'));

		expect(dateSpy).not.toHaveBeenCalled();

		dateSpy.mockRestore();
	});

	it('It should be possible to edit a flashcard by clicking Save button when edited value is not empty', async () => {
		const updateSpy = jest.fn();
		render(
			<Card
				front={''}
				back={''}
				update={updateSpy}
				removeCard={() => {}}
				cardId={''}
			/>,
		);

		const originalDate = global.Date;
		global.Date = jest.fn(() => ({
			toISOString: () => 'mocked-date',
		})) as unknown as typeof Date;

		fireEvent.click(screen.getByTestId('Edit'));

		fireEvent.change(screen.getByTestId('Front'), {
			target: { value: 'Edit Value' },
		});

		await waitFor(() => fireEvent.click(screen.getByText('Save')));

		expect(updateSpy).toHaveBeenCalledWith('Edit Value', '', '');
		global.Date = originalDate;
	});

	it('It should be possible to exit editing mode by clicking cancel button', async () => {
		const removeCardMock = jest.fn();
		render(
			<Card
				front={''}
				back={''}
				update={() => {}}
				removeCard={removeCardMock}
				cardId={''}
			/>,
		);

		fireEvent.click(screen.getByTestId('Edit'));
		fireEvent.click(screen.getByText('Cancel'));

		expect(removeCardMock).not.toHaveBeenCalled();
	});

	it('It should delete flashcard from the list when clicking on Trash icon', async () => {
		const removeCardMock = jest.fn();
		render(
			<Card
				front={''}
				back={''}
				update={() => {}}
				removeCard={removeCardMock}
				cardId={''}
			/>,
		);


			fireEvent.click(screen.getByTestId('Edit'));
			fireEvent.click(screen.getByTestId('Delete'));

			expect(removeCardMock).toHaveBeenCalled();
	})
});
