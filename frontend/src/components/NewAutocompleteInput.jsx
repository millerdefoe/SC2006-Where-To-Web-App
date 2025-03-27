import React, { useEffect, useRef, useState } from "react";

function NewAutocompleteInput({ onPlaceSelect }) {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const tokenRef = useRef(null);

  useEffect(() => {
    const initPlacesAutocomplete = async () => {
      const { AutocompleteSessionToken, AutocompleteSuggestion } =
        await google.maps.importLibrary("places");

      tokenRef.current = new AutocompleteSessionToken();

      inputRef.current.addEventListener("input", async () => {
        const input = inputRef.current.value;
        if (!input) return setSuggestions([]);

        const request = {
          input,
          sessionToken: tokenRef.current,
          language: "en",
          region: "SG",
        };

        const { suggestions } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        setSuggestions(suggestions.map((s) => s.placePrediction));
      });
    };

    initPlacesAutocomplete();
  }, []);

  const handleSelect = async (placePrediction) => {
    const place = placePrediction.toPlace();

    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "location"],
    });

    setSuggestions([]);
    inputRef.current.value = place.formattedAddress;

    if (onPlaceSelect) onPlaceSelect(place);
  };

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="search-bar"
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelect(suggestion)}>
            {suggestion.text.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewAutocompleteInput;
