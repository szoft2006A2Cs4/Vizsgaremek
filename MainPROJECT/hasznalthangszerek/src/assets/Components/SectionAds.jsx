import {
  Badge,
  Box,
  Carousel,
  HStack,
  Icon,
  IconButton,
  Image,
  Span,
  Stack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "../../index.css";

const SectionAds = () => {
  return (
    <Carousel.Root slideCount={properties.length} slidesPerPage={3} gap="4">
      <HStack justify="space-between" mb="3">
        <Span fontWeight="medium" fontSize="xl">
          További ajánlataink
        </Span>
        <HStack>
          <Carousel.PrevTrigger asChild>
            <IconButton size="sm" variant="subtle">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>
          <Carousel.NextTrigger asChild>
            <IconButton size="sm" variant="subtle">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </HStack>
      </HStack>
      <Carousel.ItemGroup>
        {properties.map((property, index) => (
          <Carousel.Item key={property.id} index={index}>
            <PropertyCard data={property} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  );
};

const PropertyCard = ({ data }) => (
  <Stack gap="3">
    <Box position="relative">
      <Image
        src={data.image}
        alt={data.title}
        rounded="l2"
        w="full"
        h="340px"
        objectFit="cover"
        objectPosition="center"
        draggable={false}
      />
      {data.favorite && (
        <Badge pos="absolute" top="3" insetStart="3" size="md" fontSize="sm">
          Megbízható eladó
        </Badge>
      )}
    </Box>
    <Stack gap="2" px="1">
      <Span fontWeight="semibold" fontSize="md">
        {data.title}
      </Span>
      <HStack color="fg.muted" fontSize="sm">
        <Span>
          ${data.price} for {data.nights} nights
        </Span>
        <HStack gap="1">
          <Icon color="orange.solid" boxSize="4">
            <FaStar />
          </Icon>
          <Span fontWeight="medium">{data.rating}</Span>
        </HStack>
      </HStack>
    </Stack>
  </Stack>
);

const properties = [
  {
    id: 1,
    title: "Loft Apartment in City Bowl",
    price: 152,
    nights: 2,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    favorite: true,
  },
  {
    id: 2,
    title: "Modern Studio, Camps Bay Beachfront",
    price: 296,
    nights: 2,
    rating: 4.99,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    favorite: true,
  },
  {
    id: 3,
    title: "Retreat in Hout Bay with Views",
    price: 257,
    nights: 2,
    rating: 4.94,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  },
  {
    id: 4,
    title: "Sunny Flat in Sea Point",
    price: 132,
    nights: 2,
    rating: 4.87,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: 5,
    title: "V&A Waterfront City Studio",
    price: 200,
    nights: 2,
    rating: 4.83,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    favorite: true,
  },
  {
    id: 6,
    title: "Luxury Pad, Bantry Bay",
    price: 247,
    nights: 2,
    rating: 4.96,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: 7,
    title: "Cozy Nest in Green Point",
    price: 135,
    nights: 2,
    rating: 4.81,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    favorite: true,
  },
  {
    id: 8,
    title: "Elegant Villa in Constantia",
    price: 450,
    nights: 2,
    rating: 4.98,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
];

export default SectionAds;
