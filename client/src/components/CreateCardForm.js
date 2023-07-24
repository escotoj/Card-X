import React, { useState } from 'react';
const CreateCardForm = ({ handleCardSubmit }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create a new event with the form values
    const newEvent = {
      target: {
        elements: {
          title: { value: title },
          message: { value: message },
          image: { value: image },
        },
      },
    };
    // Call the submit handler from the parent component
    handleCardSubmit(newEvent);
    setTitle('');
    setMessage('');
    setImage('');
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
      ></textarea>
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};
export default CreateCardForm;