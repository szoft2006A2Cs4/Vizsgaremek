import React from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef, useState } from "react";

const SearchInput = () => {
  return (
    <div id="search-input-outer-cont">
      <InputGroup endElement={<LuSearch />} id="search-input-cont">
        <Input placeholder="Kereső . . ." id="search-input" />
      </InputGroup>
    </div>
  );
};

{
  /* <svg viewBox="0 0 24 24" className="search__icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg> */
}
// const StyledWrapper = styled.div`
//   .container {
//     position: relative;
//     background: linear-gradient(135deg, #ead7ce 0%, #d4c4bc 100%);
//     border-radius: 1000px;
//     padding: 4px;
//     display: grid;
//     place-content: center;
//     z-index: 0;
//     max-width: 250px;
//     margin: 0 10px;
//   }

//   .search-container {
//     position: relative;
//     width: 100%;
//     border-radius: 50px;
//     background: linear-gradient(135deg, #fbf6ef 0%, #f0e6dd 100%);
//     padding: 5px;
//     display: flex;
//     align-items: center;
//   }

//   .search-container::after,
//   .search-container::before {
//     content: "";
//     width: 100%;
//     height: 100%;
//     border-radius: inherit;
//     position: absolute;
//   }

//   .search-container::before {
//     top: -1px;
//     left: -1px;
//     background: linear-gradient(0deg, #d4c4bc 0%, #fbf6ef 100%);
//     z-index: -1;
//   }

//   .search-container::after {
//     bottom: -1px;
//     right: -1px;
//     background: linear-gradient(0deg, #d4c4bc 0%, #ead7ce 100%);
//     box-shadow:
//       rgba(119, 98, 92, 0.3) 2px 2px 5px 0px,
//       rgba(119, 98, 92, 0.1) 4px 4px 10px 0px;
//     z-index: -2;
//   }

//   .input {
//     padding: 8px 10px;
//     width: 100%;
//     background: linear-gradient(135deg, #fbf6ef 0%, #f0e6dd 100%);
//     border: none;
//     color: #5a5958;
//     font-family: "Celinda";
//     font-size: 16px;
//     border-radius: 50px;
//   }

//   .input:focus {
//     outline: none;
//     background: linear-gradient(135deg, #ffffff 0%, #fbf6ef 100%);
//   }

//   .input::placeholder {
//     color: #a09088;
//   }

//   .search__icon {
//     width: 40px;
//     aspect-ratio: 1;
//     border-left: 2px solid #77625c;
//     border-top: 3px solid transparent;
//     border-bottom: 3px solid transparent;
//     border-radius: 50%;
//     padding-left: 8px;
//     margin-right: 5px;
//   }

//   .search__icon:hover {
//     border-left: 3px solid wheat;
//   }

//   .search__icon path {
//     fill: #77625c;
//     transition: fill 150ms ease;
//   }

//   .search__icon:hover path {
//     fill: wheat;
//   }
// `;

export default SearchInput;
