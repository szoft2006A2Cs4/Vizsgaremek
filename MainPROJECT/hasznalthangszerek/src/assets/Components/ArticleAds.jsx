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
import { useNavigate } from "react-router-dom";

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

const ArticleAds = ({ data, isLoading }) => {
  if (isLoading || !data || !Array.isArray(data)) return null;

  const navigate = useNavigate();

  var filteredList = [];

  for (var i of data) {
    if (i.isPremium) {
      filteredList.push(i);
    }
  }

  for (var i of filteredList) {
    if (i.description.length > 55) {
      i.description = i.description.substring(0, 56) + " . . .";
    }
  }

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

      <Box display={{ base: "none", lg: "block" }}>
        <Carousel.Root
          id="carousel-root"
          slideCount={filteredList.length}
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
              {filteredList.map((item, index) => (
                <Carousel.Item
                  key={index}
                  index={index}
                  flex="0 0 100%"
                  width="100%"
                >
                  <Box position="relative" width="100%">
                    <AspectRatio ratio={16 / 9} width="100%">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </AspectRatio>

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
                        {item.name}
                      </Text>
                      <Text
                        color="white"
                        fontWeight="bold"
                        fontSize="3vw"
                        mt="1"
                      >
                        {item.cost} HUF
                      </Text>
                    </Box>

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
                        {item.seller.city}
                      </Text>
                    </Box>

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
                        onClick={() => {
                          navigate(`/instruments?ins=${item.id}`, {
                            replace: true,
                          });
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
                        {item.seller.phoneNumber}
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

      <Box
        display={{ base: "grid", lg: "none" }}
        gridTemplateColumns="1fr 1fr"
        gap="4"
      >
        {filteredList.map((item, index) => (
          <Card.Root
            key={index}
            overflow="hidden"
            onClick={() => {
              navigate(`/instruments?ins=${item.id}`, {
                replace: true,
              });
            }}
          >
            <Image
              src={item.imageUrls[0]}
              alt={item.name}
              width="100%"
              height="35vw"
              objectFit="cover"
            />
            <Card.Body gap="1" p="3">
              <Card.Title fontSize="3vw">{item.name}</Card.Title>
              <Card.Description fontSize="2.5vw">
                {item.description}
              </Card.Description>
              <Text fontWeight="medium" fontSize="3vw" mt="1">
                {item.cost} HUF
              </Text>
            </Card.Body>
          </Card.Root>
        ))}
      </Box>
    </Box>
  );
};

export default ArticleAds;
