import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function DebounceSearchDemo() {
    const [inputValue, setInputValue] = useState("");

    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedValue.trim() !== "") {
            console.log("Searching for:", debouncedValue);
        }
    }, [debouncedValue]);

    return (
        <div style={{ marginTop: "20px" }}>
          <label>
            <strong>Type to search</strong>
          </label>
          <br />

          <input
            type="text"
            placeholder="Start typing ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginTop: "10px", padding: "8px", width: "300px" }}
            />

            <div style={{ marginTop: "20px" }}>
                <p>
                  <strong>Current Input:</strong> {inputValue}
                </p>
                <p>
                  <strong>Debounced Value:</strong> {debouncedValue}
                </p>
            </div>

            <div style={{ marginTop: "20px" }}>
                {debouncedValue.trim() === "" ? (
                    <p>Type to see results.</p>
                ) : (
                    <p>Simulated search results for: <strong>{debouncedValue}</strong></p>
                )}
            </div>
        </div>
    );
}