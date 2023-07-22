import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD, REMOVE_CARD } from '../utils/mutations'; 
import './../css/MyCard.css'; // Import the custom CSS file for styling

const MyCard = () => {
    const [userCards, setUserCards] = useState([]);
    const [singleCard, setSingleCard] = useState(null);
    const [updateCard] = useMutation(UPDATE_CARD);
    const [removeCard] = useMutation(REMOVE_CARD);

    const fetchUserCards = async () => {
        try {
            // Replace this with  actual API endpoint for QUERY_CARD_BY_USER
            const response = await fetch('https://api.example.com/cards');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserCards(data);
        } catch (error) {
            console.error('Error fetching user cards:', error);
        }
    };

    const fetchSingleCard = async (cardId) => {
        try {
            // Replace this with  actual API endpoint for QUERY_SINGLE_CARD
            const response = await fetch(`https://api.example.com/cards/${cardId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSingleCard(data);
        } catch (error) {
            console.error('Error fetching single card:', error);
        }
    };

    useEffect(() => {
        fetchUserCards();
    }, []);

    const renderUserCards = () => {
        if (userCards.length === 0) {
            return <p className="empty-message">No cards found for this user.</p>;
        }
        return (
            <ul className="card-list">
                {userCards.map((card) => (
                    <li key={card.id} className="card-item">
                        <span>{card.title}</span>
                        <button className="view-details-btn" onClick={() => fetchSingleCard(card.id)}>
                            View Details
                        </button>
                        <button
                            className="update-card-btn"
                            onClick={() => handleUpdateCard(card.id, card.title, card.date, card.picture)}
                        >
                            Update Card
                        </button>
                        <button className="remove-card-btn" onClick={() => handleRemoveCard(card.id)}>
                            Remove Card
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    const renderSingleCard = () => {
        if (!singleCard) {
            return null;
        }
        return (
            <div className="single-card-details">
                <h2>{singleCard.title}</h2>
                <p>{singleCard.description}</p>
            </div>
        );
    };

    const handleUpdateCard = async (cardId, title, date, picture) => {
        try {
            const { data } = await updateCard({
                variables: { cardId, title, date, picture },
            });
            // Handle any UI updates or state changes after the mutation is successful
            console.log('Card updated:', data.updateCard);
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const handleRemoveCard = async (cardId) => {
        try {
            const { data } = await removeCard({
                variables: { cardId },
            });
            // Handle any UI updates or state changes after the mutation is successful
            console.log('Card removed:', data.removeCard);
            // Optional: You can refetch the user cards after removing a card
            fetchUserCards();
        } catch (error) {
            console.error('Error removing card:', error);
        }
    };

    return (
        <div className="my-card-container">
            <h1 className="app-title">My Cards</h1>
            <div className="user-cards">
                <h2 className="section-title">Your Cards</h2>
                {renderUserCards()}
            </div>
            <div className="single-card">
                <h2 className="section-title"> </h2>
                {renderSingleCard()}
            </div>
        </div>
    );
};

export default MyCard;
