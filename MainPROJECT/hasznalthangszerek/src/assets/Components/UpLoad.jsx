import {
  Button,
  Card,
  Field,
  Input,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default function UpLoad() {
  return (
    <div id="UpLoad-page">
      <Card.Root size="lg" width="70vw" height="68vh" bg="#ead7ce">
        <Card.Header>
          <Card.Title>Új hangszer feltöltése</Card.Title>
          <Card.Description>
            Adatok minél pontosabb megadására szíveskedjenek ügyelni!
          </Card.Description>
        </Card.Header>
        <Card.Body id="UpLoad-field">
          <div>
            <Field.Root>
              <Field.Label>Hangszer neve</Field.Label>
              <Input />
            </Field.Root>

            <Field.Root>
              <Field.Label>Kategóriája és alkategóriája</Field.Label>
              <div id="UpLoad-comboField">
                <Select.Root collection={frameworks} size="sm" width="320px">
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {frameworks.items.map((framework) => (
                          <Select.Item item={framework} key={framework.value}>
                            {framework.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </div>
            </Field.Root>
          </div>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button rounded="3xl" size="2xl" className="UpLoad-btn">
            Mégse
          </Button>
          <Button rounded="3xl" size="2xl" className="UpLoad-btn">
            Következő
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
