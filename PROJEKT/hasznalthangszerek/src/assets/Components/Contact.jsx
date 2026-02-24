import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Field,
  Fieldset,
  Input,
  Textarea,
  Stack,
  Button,
} from "@chakra-ui/react";
import { send } from "vite";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("hasznalthangszerek", "messagetemplate", form.current, {
        publicKey: "u8I9aEohwoXlxEDHy",
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log("Üzenet elküldve");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        },
      );
  };

  return (
    <Fieldset.Root
      width="100%"
      size="xl"
      bg="white"
      display="flex"
      alignSelf="center"
      onSubmit={sendEmail}
    >
      <Stack>
        <Fieldset.Legend>Üzenjen nekünk!</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content width="xl" padding="0">
        <Field.Root>
          <Field.Label>Név</Field.Label>
          <Input name="user_name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email cím</Field.Label>
          <Input name="email" type="user_email" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Üzenet</Field.Label>
          <Textarea name="message" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="center" variant="surface">
        Submit
      </Button>
    </Fieldset.Root>
  );
};

export default Contact;
