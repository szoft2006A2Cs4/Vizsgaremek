import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../scripts/AuthProvider";

export default function SearchBox({ ins, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navigated, setNavigated] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const selectedRef = useRef("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const filterList = (value) => {
    setFiltered(
      ins.filter((i) => {
        return value && i && i.name && i.name.toLowerCase().includes(value);
      }),
    );
  };

  const handleChange = (value) => {
    setInput(value);
    filterList(value);
  };

  const handleClose = () => {
    setInput("");
    setFiltered([]);
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (name) => {
    setInput(name);
    setFiltered([]);
    selectedRef.current = name;
    inputRef.current?.focus();
  };

  const _handleKeyDown = function (e) {
    if (e.key === "Enter" && input.trim()) {
      setFiltered([]);
      setIsOpen(true);
      setNavigated(true);
      navigate(
        `/instruments?name=${encodeURIComponent((selectedRef.current || input).trim())}`,
      );
    }
  };

  const _handleTouch = () => {
    if (input.trim()) {
      setNavigated(true);
      navigate(
        `/instruments?name=${encodeURIComponent((selectedRef.current || input).trim())}`,
      );
    }
  };

  return (
    <>
      {isMobile ? (
        <div id="search-mobile-container">
          <input
            id="search-input-mobile"
            type="text"
            placeholder="Keresés..."
            value={input}
            onChange={(e) => {
              setNavigated(false);
              handleChange(e.target.value);
            }}
          />
          <button id="search-mobile-btn" onTouchEnd={() => _handleTouch()}>
            <svg
              fill="#000000"
              height="50px"
              width="50px"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  class="cls-1"
                  d="M13.07336,12.29053,10.14679,9.364a3.9711,3.9711,0,1,0-.78284.78284l2.92658,2.92657Zm-6.064-2.4516A2.82914,2.82914,0,1,1,9.8385,7.00934,2.83286,2.83286,0,0,1,7.00934,9.83893Z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      ) : (
        <div className={`middle${isOpen ? " middle-open" : ""}`}>
          <input
            ref={inputRef}
            className={`input${isOpen ? " inclicked" : ""}`}
            type="text"
            placeholder="Keresés..."
            value={input}
            onChange={(e) => {
              setNavigated(false);
              handleChange(e.target.value);
            }}
            onKeyDown={_handleKeyDown}
          />
          <button
            type="button"
            className={`btn ${isOpen ? "close" : ""}`}
            onClick={handleClose}
          />
          <div
            className={`${!auth.user ? "results-list" : "resultList-loggedIn"}`}
          >
            {filtered.map((ins, id) => (
              <div
                key={id}
                className="search-result"
                onClick={() => handleSelect(ins.name)}
              >
                {ins.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
