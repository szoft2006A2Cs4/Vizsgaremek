import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Carousel,
  HStack,
  IconButton,
  Image,
  Span,
  Stack,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "../../index.css";

const SectionAds = ({ ins }) => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches,
  );
  const [isTablet, setIsTablet] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );
  const [slides, setSlides] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      setIsTablet(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mx = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
    };
    mx.addEventListener("change", handler);
    return () => mx.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSlides(1);
    } else if (isTablet) {
      setSlides(2);
    } else {
      setSlides(3);
    }
  }, [isMobile, isTablet]);

  return (
    <Carousel.Root slideCount={ins.length} slidesPerPage={slides} gap="4">
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
          <Carousel.Item
            key={i.id}
            index={index}
            onClick={() => {
              navigate(`/instruments?ins=${i.id}`, {
                replace: true,
              });
            }}
          >
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
      {data.seller.review > 3.8 && (
        <Badge pos="absolute" top="3" insetStart="3" size="md" fontSize="sm">
          Megbízható eladó
        </Badge>
      )}
    </Box>
    <Stack
      onClick={() => {
        navigate(`/instruments?ins=${item.id}`, {
          replace: true,
        });
      }}
      gap="2"
      px="1"
    >
      <Span fontWeight="semibold" fontSize="md">
        {data.name}
      </Span>
      <HStack color="fg.muted" fontSize="sm">
        <Span>${data.cost} HUF</Span>
        <HStack gap="1">
          <Span fontWeight="medium">{data.review}</Span>
        </HStack>
      </HStack>
    </Stack>
  </Stack>
);

export default SectionAds;
