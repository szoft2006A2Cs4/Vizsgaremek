import { Box, Group, Input, InputGroup, Show } from "@chakra-ui/react";
import { useRef } from "react";
import { LuCreditCard } from "react-icons/lu";
import { usePaymentInputs } from "react-payment-inputs";
import cardImages from "react-payment-inputs/images";

const images = cardImages;

const CardImage = (props) => {
  const { meta, getCardImageProps } = props;
  return (
    <Show
      when={meta.cardType}
      fallback={<LuCreditCard size={16} aria-hidden="true" />}
    >
      <svg {...getCardImageProps({ images })} />
    </Show>
  );
};

const PaymentInputs = ({ onChange }) => {
  const payment = usePaymentInputs();

  const valuesRef = useRef({ number: "", expiry: "", cvc: "" });

  const updateParent = (field) => (e) => {
    setTimeout(() => {
      valuesRef.current[field] = e.target.value;
      onChange({
        ...valuesRef.current,
        error: payment.meta.error,
      });
    }, 0);
  };

  return (
    <Box spaceY="-1px">
      <InputGroup
        zIndex={{ _focusWithin: "1" }}
        endElement={<CardImage {...payment} />}
      >
        <Input
          roundedBottom="0"
          {...payment.getCardNumberProps({ onChange: updateParent("number") })}
        />
      </InputGroup>
      <Group w="full" attached>
        <Input
          roundedTopLeft="0"
          {...payment.getExpiryDateProps({ onChange: updateParent("expiry") })}
        />
        <Input
          roundedTopRight="0"
          {...payment.getCVCProps({ onChange: updateParent("cvc") })}
        />
      </Group>
    </Box>
  );
};

export default PaymentInputs;
