import Carousel from "react-bootstrap/Carousel";

function CarouselItem(instrument, user) {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={instrument.image}
        alt={instrument.name}
      />
      <Carousel.Caption>
        <h1>{instrument.name}</h1>
        <h4>{user.name}</h4>
      </Carousel.Caption>
    </Carousel.Item>
  );
}
