import React, { useState } from "react";
import axios from "axios"; // Import the axios library
import "./ImageSearch.css";

const AdjectiveAnimalImage = () => {
  const adjectives = ["happy", "cute", "playful", "awesome", "majestic"];
  const [animal, setAnimal] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWord, setShowWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (animal.length >= 2 && animal.length <= 20) {
      const randomAdjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const searchQuery = `${randomAdjective} ${animal}`;
      setShowWord(searchQuery);

      try {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const CX_KEY = process.env.REACT_APP_CX_KEY;
        const response = await axios
          .get(
            `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${API_KEY}&cx=${CX_KEY}`
          )
          .then(function (response) {
            // handle success
            const imageLink =
              response.data.items[0].pagemap.cse_thumbnail[0].src;
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
    if (animal.length < 2) {
      alert("Your animal name must be at least 2 characters long");
    }
    if (animal.length > 20) {
      // alert("Your animal name must be less than 20 characters long");
      setError("Your animal name must be less than 20 characters long");
    }
  };

  return (
    <div>
      <div className="formBody">
        <h2>Adjective Animal Image Search</h2>
        <p>
          This page will search for an image of an animal based on an adjective
          and animal name that you enter.
        </p>
        <p>
          For example, if you enter "happy" and "dog", it will search for an
          image of a happy dog.
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Enter your favorite animal:
              <div>
                <input
                  type="text"
                  value={animal}
                  className="form-control form-control-lg"
                  onChange={(e) => setAnimal(e.target.value)}
                  required
                />
              </div>
            </label>
            <br />
            {showWord && ( // If showWord is true, display the word
              <div>
                <p>
                  You searched for: <strong>{showWord}</strong>
                </p>
              </div>
            )}
            <div className="buttonDiv">
              <button className="btn btn-info" type="submit">
                Get Image
              </button>
              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
      </div>
      {imageUrl && (
        <div className="wrapper">
          <ul className="items">
            <li className="item">
              <div className="inner">
                {" "}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`A ${animal}`}
                    style={{ height: "100%" }}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdjectiveAnimalImage;
