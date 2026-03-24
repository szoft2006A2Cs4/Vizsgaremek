import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../scripts/AuthProvider";

export default function SearchBox({ ins }) {
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

  return (
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
      <div className={`${!auth.user ? "results-list" : "resultList-loggedIn"}`}>
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
  );
}
