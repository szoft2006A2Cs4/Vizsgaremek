import search from "../img/search_icon.png";

export default function Nav() {
  return (
    <nav>
      <button type="button">menu1</button>
      <button type="button">menu2</button>
      <button type="button">menu3</button>
      <button type="button">menu4</button>
      <span id="nav-bar">
        <input type="text" name="search" id="search" />
        <img src={search} alt="search_icon" />
      </span>
      <button id="loginButton" />
    </nav>
  );
}
