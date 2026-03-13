import { useState, useRef, useEffect } from "react";

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={`middle${isOpen ? " middle-open" : ""}`}>
      <input
        ref={inputRef}
        className={`input${isOpen ? " inclicked" : ""}`}
        type="text"
        placeholder="Keresés..."
      />
      <button
        type="button"
        className={`btn ${isOpen ? "close" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
}
