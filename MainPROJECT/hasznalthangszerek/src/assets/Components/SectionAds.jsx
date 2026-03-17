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

const SectionAds = ({ ins }) => {
  return (
    <Carousel.Root slideCount={ins.length} slidesPerPage={3} gap="4">
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
        {ins.map((i, index) => (
          <Carousel.Item key={i.id} index={index}>
            <PropertyCard data={i} />
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
        src={data.imageUrls[0]}
        alt={data.name}
        rounded="l2"
        w="full"
        h="340px"
        objectFit="cover"
        objectPosition="center"
        draggable={false}
      />
      {data.seller.review > 3.5 && (
        <Badge pos="absolute" top="3" insetStart="3" size="md" fontSize="sm">
          Megbízható eladó
        </Badge>
      )}
    </Box>
    <Stack gap="2" px="1">
      <Span fontWeight="semibold" fontSize="md">
        {data.name}
      </Span>
      <HStack color="fg.muted" fontSize="sm">
        <Span>${data.cost} HUF</Span>
        <HStack gap="1">
          <Icon color="orange.solid" boxSize="4">
            <FaStar />
          </Icon>
          <Span fontWeight="medium">{data.review}</Span>
        </HStack>
      </HStack>
    </Stack>
  </Stack>
);

export default SectionAds;
