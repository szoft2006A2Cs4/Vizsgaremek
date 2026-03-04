import {
  AspectRatio,
  Box,
  Button,
  Card,
  Carousel,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import "../../index.css";

const items = [
  {
    src: "https://images.unsplash.com/photo-1656433031375-5042f5afe894?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2371",
    title: "Rado DiaStar óra",
    price: "$320",
    condition: "Kiváló állapot",
    description: "Klasszikus design, eredeti dobozzal.",
    location: "Budapest",
    phone: "+36 30 123 4567",
  },
  {
    src: "https://images.unsplash.com/photo-1587466412525-87497b34fc88?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2673",
    title: "Vintage karóra",
    price: "$180",
    condition: "Jó állapot",
    description: "Retro stílusú, működő szerkezettel.",
    location: "Debrecen",
    phone: "+36 20 987 6543",
  },
  {
    src: "https://images.unsplash.com/photo-1629581688635-5d88654e5bdd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2831",
    title: "Luxus kronográf",
    price: "$540",
    condition: "Újszerű",
    description: "Precíz mechanikus óra, dobozzal.",
    location: "Győr",
    phone: "+36 70 555 1234",
  },
  {
    src: "https://images.unsplash.com/photo-1661030420948-862787de0056?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2370",
    title: "Sport karóra",
    price: "$210",
    condition: "Használt",
    description: "Vízálló, tartós szíjjal.",
    location: "Pécs",
    phone: "+36 30 444 7890",
  },
  {
    src: "https://images.unsplash.com/photo-1703505841379-2f863b201212?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2371",
    title: "Elegáns dress watch",
    price: "$290",
    condition: "Kiváló állapot",
    description: "Vékony tok, bőr szíj.",
    location: "Miskolc",
    phone: "+36 20 333 2468",
  },
  {
    src: "https://images.unsplash.com/photo-1607776905497-b4f788205f6a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2370",
    title: "Automata óra",
    price: "$410",
    condition: "Újszerű",
    description: "Önfelhúzós mechanizmus, dobozzal.",
    location: "Székesfehérvár",
    phone: "+36 70 111 3579",
  },
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
      zIndex="2"
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
        fontSize={{ base: "5vw", md: "2.916666666666667vw", lg: "3.75vw" }}
        textAlign="center"
        textTransform="uppercase"
        mb="6"
        paddingTop="5"
        paddingBottom="5"
      >
        Kiemelt hirdetéseink
      </Heading>

      {/* Desktop: carousel overlay-jel */}
      <Box display={{ base: "none", lg: "block" }}>
        <Carousel.Root
          id="carousel-root"
          slideCount={items.length}
          width="100%"
          height="auto"
          gap="0"
          position="relative"
          colorPalette="white"
          overflow="hidden"
          borderRadius="md"
          autoplay={{ delay: 6000 }}
        >
          <Carousel.Control width="100%" position="relative">
            <Carousel.PrevTrigger asChild>
              <ActionButton insetStart="4">
                <LuArrowLeft />
              </ActionButton>
            </Carousel.PrevTrigger>

            <Carousel.ItemGroup width="100%" height="100%">
              {items.map((item, index) => (
                <Carousel.Item
                  key={index}
                  index={index}
                  flex="0 0 100%"
                  width="100%"
                >
                  <Box position="relative" width="100%">
                    <AspectRatio ratio={16 / 9} width="100%">
                      <Image
                        src={item.src}
                        alt={item.title}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </AspectRatio>

                    {/* Bal alsó: név + ár */}
                    <Box
                      position="absolute"
                      bottom="6"
                      left="6"
                      zIndex="2"
                      bg="blackAlpha.600"
                      p="3"
                      borderRadius="md"
                      maxW="35%"
                    >
                      <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="3.6vw"
                        lineHeight="1.3"
                      >
                        {item.title}
                      </Text>
                      <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="3vw"
                        mt="1"
                      >
                        {item.price}
                      </Text>
                    </Box>

                    {/* Jobb oldal: condition / description / location */}
                    <Box
                      position="absolute"
                      top="6"
                      right="6"
                      zIndex="2"
                      bg="blackAlpha.600"
                      p="3"
                      borderRadius="md"
                      maxW="30%"
                    >
                      <Text
                        color="gray.300"
                        fontSize="2.2vw"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Állapot
                      </Text>
                      <Text color="white" fontSize="2.6vw" mb="2">
                        {item.condition}
                      </Text>

                      <Text
                        color="gray.300"
                        fontSize="2.2vw"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Leírás
                      </Text>
                      <Text color="white" fontSize="2.6vw" mb="2">
                        {item.description}
                      </Text>

                      <Text
                        color="gray.300"
                        fontSize="2.2vw"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Helyszín
                      </Text>
                      <Text color="white" fontSize="2.6vw">
                        {item.location}
                      </Text>
                    </Box>

                    {/* Jobb alsó: Részletek gomb + GSM */}
                    <Box
                      position="absolute"
                      bottom="6"
                      right="6"
                      zIndex="2"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      gap="2"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        color="white"
                        borderColor="white"
                        bg="transparent"
                        fontSize="2.4vw"
                        height="3.5vw"
                        px="1.5vw"
                        _hover={{
                          bg: "#77625c",
                          borderColor: "#77625c",
                          color: "white",
                          fontSize: "2.4vw",
                        }}
                      >
                        Részletek
                      </Button>
                      <Text
                        color="white"
                        fontSize="2.4vw"
                        bg="blackAlpha.600"
                        px="2"
                        py="1"
                        borderRadius="md"
                      >
                        {item.phone}
                      </Text>
                    </Box>
                  </Box>
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
                _current={{
                  width: "10",
                  bg: "colorPalette.subtle",
                  opacity: 1,
                }}
              />
            </Box>
          </Carousel.Control>
        </Carousel.Root>
      </Box>

      {/* Tablet / Telefon: kártyarács */}
      <Box
        display={{ base: "grid", lg: "none" }}
        gridTemplateColumns="1fr 1fr"
        gap="4"
      >
        {items.map((item, index) => (
          <Card.Root key={index} overflow="hidden">
            <Image
              src={item.src}
              alt={item.title}
              width="100%"
              height="35vw"
              objectFit="cover"
            />
            <Card.Body gap="1" p="3">
              <Card.Title fontSize="3vw">{item.title}</Card.Title>
              <Card.Description fontSize="2.5vw">
                {item.description}
              </Card.Description>
              <Text fontWeight="medium" fontSize="3vw" mt="1">
                {item.price}
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Box>
    </Box>
  );
};

export default ArticleAds;
