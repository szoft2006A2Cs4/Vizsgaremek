import {
  AspectRatio,
  Box,
  Carousel,
  Heading,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import "../../index.css";

const items = [
  "https://images.unsplash.com/photo-1656433031375-5042f5afe894?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371",
  "https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2673",
  "https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2831",
  "https://images.unsplash.com/photo-1661030420948-862787de0056?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370",
  "https://images.unsplash.com/photo-1703505841379-2f863b201212?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2371",
  "https://images.unsplash.com/photo-1607776905497-b4f788205f6a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370",
];

const ActionButton = forwardRef(function ActionButton(props, ref) {
  return (
    <IconButton
      {...props}
      ref={ref}
      size="md"
      variant="outline"
      rounded="full"
      position="absolute"
      zIndex="1"
      bg="white"
      color="black"
      top="50%"
      transform="translateY(-50%)"
    />
  );
});

const ArticleAds = () => {
  return (
    <Box width="100%" mx="auto" px={{ base: 4, md: 8 }} py="0" mt="0">
      <Heading
        as="h1"
        fontSize={{ base: "2rem", md: "3.5rem", lg: "4.5rem" }}
        textAlign="center"
        textTransform="uppercase"
        mb="6"
        mt="0"
        pt="0"
      >
        Kiemelt hirdetéseink
      </Heading>

      <Carousel.Root
        id="carousel-root"
        slideCount={6}
        width="100%"
        height="auto"
        gap="0"
        position="relative"
        colorPalette="white"
        overflow="hidden"
        borderRadius="md"
        autoplay="true"
      >
        <Carousel.Control width="100%" position="relative">
          <Carousel.PrevTrigger asChild>
            <ActionButton insetStart="4">
              <LuArrowLeft />
            </ActionButton>
          </Carousel.PrevTrigger>

          <Carousel.ItemGroup width="100%" height="100%">
            {items.map((src, index) => (
              <Carousel.Item
                key={index}
                index={index}
                flex="0 0 100%"
                width="100%"
              >
                <AspectRatio ratio={16 / 9} width="100%">
                  <Image
                    src={src}
                    alt={`Product ${index + 1}`}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </AspectRatio>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          <Carousel.NextTrigger asChild>
            <ActionButton insetEnd="4">
              <LuArrowRight />
            </ActionButton>
          </Carousel.NextTrigger>

          <Box
            position="absolute"
            bottom="6"
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Carousel.Indicators
              transition="width 0.2s ease-in-out"
              transformOrigin="center"
              opacity="0.5"
              boxSize="2"
              _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
            />
          </Box>
        </Carousel.Control>
      </Carousel.Root>
    </Box>
  );
};

export default ArticleAds;
