
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewCard } from '../../src/components/NewCard/NewCard';

describe('NewCard Component Tests', () => {
	it('should not be possible to add a flashcard when front or back card value is empty', () => {
		const onSaveClickMock = jest.fn();
		render(
			<NewCard
				checker={true}
				reset={() => {}}
				onSaveClick={onSaveClickMock}
			/>,
        );
        
		fireEvent.click(screen.getByText('Add Card'));
		expect(onSaveClickMock).not.toHaveBeenCalled();
	});

	it('should be possible to add a flashcard when front and back values are present', () => {
		const onSaveClickMock = jest.fn();
		render(
			<NewCard
				checker={true}
				reset={() => {}}
				onSaveClick={onSaveClickMock}
			/>,
		);

	
		fireEvent.change(screen.getByLabelText('Front'), { target: { value: 'Front Value' } });
		fireEvent.change(screen.getByLabelText('Back'), { target: { value: 'Back Value' } });

		fireEvent.click(screen.getByText('Add Card'));

		expect(onSaveClickMock).toHaveBeenCalledWith('Front Value', 'Back Value');
	});
});
