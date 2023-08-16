import React, { useState } from "react";
import axios from "axios"; // Import the axios library

const AdjectiveAnimalImage = () => {
  const adjectives = ["happy", "cute", "playful", "awesome", "majestic"];
  const [animal, setAnimal] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (animal.length >= 2 && animal.length <= 20) {
      const randomAdjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const searchQuery = `${randomAdjective} ${animal}`;

      try {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const CX_KEY = process.env.REACT_APP_CX_KEY;
        const response = await axios
          .get(
            `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${API_KEY}&cx=${CX_KEY}`
          )
          .then(function (response) {
            // handle success
            const imageLink = response.data.items[0].pagemap.cse_thumbnail[0].src;
            setImageUrl(imageLink);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          }); 
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your favorite animal:
          <input
            type="text"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            required
          />
        </label>
        <button type="submit">Get Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt={`A ${animal}`} />}
    </div>
  );
};

export default AdjectiveAnimalImage;
