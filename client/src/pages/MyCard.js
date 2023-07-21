import React, { useState, useEffect } from 'react';
import './../css/MyCard.css'; // Import the custom CSS file for styling

const MyCard = () => {
    const [userCards, setUserCards] = useState([]);
    const [singleCard, setSingleCard] = useState(null);

    const fetchUserCards = async () => {
        try {
            // Replace this with your actual API endpoint for QUERY_CARD_BY_USER
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
            // Replace this with your actual API endpoint for QUERY_SINGLE_CARD
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

    return (
        <div className="my-card-container">
            <h1 className="app-title">My Cards</h1>
            <div className="user-cards">
                <h2 className="section-title">Your Cards</h2>
                {renderUserCards()}
            </div>
            <div className="single-card">
                <h2 className="section-title">Single Card Details</h2>
                {renderSingleCard()}
            </div>
        </div>
    );
};

export default MyCard;