import Carousel from "react-bootstrap/Carousel";

export default function CarouselFrame() {
  return (
    <Carousel data-bs-theme="dark">
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
    </Carousel>
  );
}
