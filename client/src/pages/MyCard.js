import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, QUERY_SINGLE_CARD, UPDATE_CARD, REMOVE_CARD } from '../utils/queries';
import './../css/MyCard.css';

const MyCard = () => {
    const [singleCard, setSingleCard] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [cardToUpdate, setCardToUpdate] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [updateCard] = useMutation(UPDATE_CARD);
    const [removeCard] = useMutation(REMOVE_CARD);

    const { loading, error, data } = useQuery(GET_ME);

    useEffect(() => {
        console.log('Data from GET_ME:', data);
    }, [data]);

    const {
        loading: singleCardLoading,
        error: singleCardError,
        data: singleCardData,
    } = useQuery(QUERY_SINGLE_CARD, {
        variables: { cardId: selectedCardId },
        skip: !selectedCardId,
    });

    const cards = data?.me.cards || [];

    useEffect(() => {
        if (singleCardData && singleCardData.singleCard) {
            setSingleCard(singleCardData.singleCard);
        }
    }, [singleCardData]);

    const handleUpdateCard = (cardId, title, date, picture) => {
        setCardToUpdate({ id: cardId, title, date, picture });
        setModalVisible(true);
    };

    const handleCardUpdateSubmit = async (updatedCard) => {
        if (!updatedCard.title || !updatedCard.date || !updatedCard.picture) {
            setErrorMessage('All fields are required');
            return;
        }

        try {
            const { data } = await updateCard({
                variables: {
                    cardId: cardToUpdate.id,
                    title: updatedCard.title,
                    date: updatedCard.date,
                    picture: updatedCard.picture
                },
            });
            console.log('Card updated:', data.updateCard);
            setErrorMessage('');
            setModalVisible(false);
        } catch (error) {
            setErrorMessage('Error updating card');
            console.error('Error updating card:', error);
        }
    };

    const handleRemoveCard = async (cardId) => {
        try {
            const { data } = await removeCard({
                variables: { cardId },
            });
            console.log('Card removed:', data.removeCard);
        } catch (error) {
            console.error('Error removing card:', error);
        }
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className="my-card-container">
            <h1 className="app-title">My Cards</h1>
            <div className="user-cards">
                <h2 className="section-title">Your Cards</h2>
                {cards.length === 0 ? (
                    <p className="empty-message">No cards found for this user.</p>
                ) : (
                    <ul className="card-list">
                        {cards.map((card) => (
                            <li key={card._id} className="card-item">
                                <span>{card.title}</span>
                                <button className="view-details-btn" onClick={() => setSelectedCardId(card._id)}>
                                    View Details
                                </button>
                                <button
                                    className="update-card-btn"
                                    onClick={() => handleUpdateCard(card._id, card.title, card.date, card.picture)}
                                >
                                    Update Card
                                </button>
                                <button className="remove-card-btn" onClick={() => handleRemoveCard(card._id)}>
                                    Remove Card
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="single-card">
                <h2 className="section-title">Selected Card Details</h2>
                {singleCardLoading ? 'Loading...' :
                    singleCardError ? `Error! ${singleCardError.message}` :
                        (
                            singleCard && (
                                <div className="single-card-details">
                                    <h2>{singleCard.title}</h2>
                                    <p>{singleCard.description}</p>
                                </div>
                            )
                        )
                }
            </div>
            {modalVisible && (
                <div className="modal">
                    <form onSubmit={event => {
                        event.preventDefault();
                        const updatedCard = {
                            title: event.target.title.value,
                            date: event.target.date.value,
                            picture: event.target.picture.value
                        };
                        handleCardUpdateSubmit(updatedCard);
                    }}>
                        <label>
                            Title:
                            <input type="text" name="title" defaultValue={cardToUpdate.title} required />
                        </label>
                        <label>
                            Date:
                            <input type="date" name="date" defaultValue={cardToUpdate.date} required />
                        </label>
                        <label>
                            Picture URL:
                            <input type="url" name="picture" defaultValue={cardToUpdate.picture} required />
                        </label>
                        <button type="submit">Update Card</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyCard;
