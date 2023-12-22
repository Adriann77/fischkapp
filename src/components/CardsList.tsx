import { Key } from 'react';
import { Cards } from './Cards';

interface Props {
	cards: any;
}

export const CardsList = ({ cards }: Props) => {
	const cardsElement = cards.map((c: { id: Key | null | undefined; heading: any; answer: any; }) => {
        return (
            <Cards
                key={c.id}
                heading={c.heading}
                answer={c.answer} />
        );
    });

	return <>{cardsElement}</>;
};
