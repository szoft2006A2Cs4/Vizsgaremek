import {
  Button,
  Card,
  Field,
  Input,
  Select,
  Portal,
  createListCollection,
  NumberInput,
  RadioGroup,
  Stack,
  HStack,
  Textarea,
  SegmentGroup,
  Dialog,
  Box,
  FileUpload,
  Icon,
} from "@chakra-ui/react";
import { InfoTip } from "@/components/ui/toggle-tip";
import { LuUpload } from "react-icons/lu";

import { useMemo, useState, useEffect, use } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "../scripts/axios";

const allCategories = {
  Billentyűs: [
    "Csembaló",
    "Digitális Zongora",
    "MIDI billentyűzet",
    "Orgona",
    "Zongora",
  ],
  Elektronikus: [
    "Drum machine",
    "Groovebox",
    "Loop station",
    "Sampler",
    "Szintetizátor",
    "Theremin",
  ],
  Fúvós: [
    "Duda",
    "Fagott",
    "Furulya",
    "Fuvola",
    "Harsona",
    "Klarinét",
    "Kürt",
    "Oboa",
    "Pánsíp",
    "Pikoló",
    "Szaxofon",
    "Tilinkó",
    "Trombita",
    "Tuba",
  ],
  Húros: [
    "Akusztikus gitár",
    "Banjo",
    "Basszusgitár",
    "Brácsa",
    "Citera",
    "Cselló",
    "Hárfa",
    "Hegedű",
    "Lant",
    "Mandolin",
    "Nagybőgő",
    "Ukulele",
  ],
  Ütős: [
    "Cintányér",
    "Csörgődob",
    "Dobkészlet",
    "Elektromos dob",
    "Guiro",
    "Harangjáték",
    "Kalimba",
    "Kézi dob",
    "Maracas",
    "Shaker",
    "Tamburin",
    "Vibrafon",
  ],
};

const categoryKeys = Object.keys(allCategories).map((cat) => ({
  label: cat,
  value: cat,
}));

const radioOptions = [
  {
    label: "Újszerű",
    value: "Újszerű",
    desc: "Alig használt, karcmentes, vagy alig látható, minimális használati nyomokkal rendelkezik.",
  },
  {
    label: "Kiváló",
    value: "Kiváló",
    desc: "Kisebb kozmetikai hibák, mint például enyhe pengetési karcok (pick marks), finom felületi sérülések vagy apró benyomódások.",
  },
  {
    label: "Jó",
    value: "Jó",
    desc: "Több látható használati nyom, kisebb karcok, övcsat-karcok (buckle rash) a gitárok hátulján, vagy kisebb kopások a fémrészeken.",
  },
  {
    label: "Átlagos",
    value: "Átlagos",
    desc: "Jelentősebb esztétikai hibák, mint például mélyebb karcok, benyomódások, repedések a lakkban, de a fa szerkezete ép.",
  },
  {
    label: "Használt",
    value: "Használt",
    desc: "Jelentős kopás, nagyobb benyomódások, a funkcionalitást kismértékben befolyásoló hibák (pl. kopott bundok).",
  },
  {
    label: "Hibás-rossz",
    value: "Hibás-rossz",
    desc: "Komoly sérülések (törés, repedés), hiányzó alkatrészek, súlyos korrózió.",
  },
];

export default function UpLoad() {
  const cloadName = "dknhbvrq9";
  const cloadPreset = "HasznaltHangszerek_UploadProducts";

  const url = `https://api.cloudinary.com/v1_1/${cloadName}/image/upload`;

  const [userData, setUserData] = useState(null);

  const [isNextAct, SetIsNextAct] = useState(false);

  const [upLoadedFiles, setUpLoadedFiles] = useState([]);

  const [insName, setInsName] = useState("");
  const [selectedCat, SetSelectedCat] = useState(null);
  const [ins_Scat, setIns_Scat] = useState("");
  const [ins_Price, setIns_Price] = useState(0);
  const [ins_Condition, setIns_Condition] = useState("");
  const [ins_Desc, setIns_Desc] = useState("");
  const [ins_IsPrem, setIns_IsPrem] = useState("Nem");

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(
      insName != "" &&
        selectedCat != null &&
        ins_Scat != "" &&
        ins_Price != 0 &&
        !isNaN(ins_Price) &&
        ins_Condition != "",
    );
  }, [insName, selectedCat, ins_Scat, ins_Price, ins_Condition]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const resp = await axios.get("api/login/me");
        const email = resp.data.email;

        const user = await axios.get(`api/user/${email}`);
        setUserData(user.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    getCurrentUser();
  }, []);

  const upLoadFiles = async (files, preset, insname, imageId) => {
    if (!imageId) return;

    const cleanName = insname.split(" ").join("");

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      let file = files[i];

      const fileName = `${cleanName}_${imageId}_${i}`;

      formData.append("file", file);
      formData.append("upload_preset", preset);
      formData.append("public_id", fileName);

      try {
        const resp = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await resp.json();
      } catch (error) {
        console.log("Hiba a feltöltés során: ", error);
      }
    }
  };

  const categories = useMemo(
    () => createListCollection({ items: categoryKeys }),
    [],
  );

  const subCategories = useMemo(() => {
    const subs = selectedCat ? allCategories[selectedCat] : [];
    return createListCollection({
      items: subs.map((s) => ({ label: s, value: s })),
    });
  }, [selectedCat]);

  return (
    <div>
      <Nav />

      <div id="UpLoad-page">
        <div id="UpLoad-layout">
          <Card.Root size="lg" className="UpLoad-firstMain">
            <Card.Header>
              <Card.Title fontSize="2xl">Új hangszer feltöltése</Card.Title>
              <Card.Description>
                Az adatok minél pontosabb megadására szíveskedjenek ügyelni!
              </Card.Description>
            </Card.Header>

            <Card.Body>
              <div id="UpLoad-field">
                <Field.Root id="UpLoad-InsName">
                  <Field.Label fontSize="xl">Hangszer neve</Field.Label>
                  <Input
                    width="32vw"
                    onChange={(e) => setInsName(e.target.value)}
                  />
                </Field.Root>

                <div className="UpLoad-InsCat">
                  <br />
                  <Field.Root>
                    <Field.Label fontSize="xl" paddingBottom="1rem">
                      Kategóriája és alkategóriája
                    </Field.Label>
                  </Field.Root>
                  <div id="UpLoad-comboField">
                    <Field.Root>
                      <Select.Root
                        collection={categories}
                        size="sm"
                        closeOnSelect={true}
                        unmountOnExit={true}
                        className="UpLoad-comboInputs"
                        onValueChange={(details) =>
                          SetSelectedCat(details.value[0])
                        }
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Válassz kategóriát. . ." />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>

                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {categories.items.map((categorie) => (
                                <Select.Item
                                  item={categorie}
                                  key={categorie.value}
                                >
                                  <Select.ItemText className="UpLoad-ComboItemText">
                                    {categorie.label}
                                  </Select.ItemText>
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>

                    <Field.Root>
                      <Select.Root
                        collection={subCategories}
                        size="sm"
                        closeOnSelect={true}
                        unmountOnExit={true}
                        className="UpLoad-comboInputs"
                        disabled={!selectedCat}
                        key={selectedCat}
                        onValueChange={(details) =>
                          setIns_Scat(details.value[0])
                        }
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Válassz kategóriát. . ." />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>

                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {selectedCat &&
                                allCategories[selectedCat].map((scategorie) => {
                                  const item = {
                                    label: scategorie,
                                    value: scategorie,
                                  };
                                  return (
                                    <Select.Item item={item} key={scategorie}>
                                      <Select.ItemText>
                                        {scategorie}
                                      </Select.ItemText>
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  );
                                })}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    </Field.Root>
                  </div>
                </div>

                <br />

                <Field.Root className="UpLoad-cost">
                  <Field.Label fontSize="xl">Ár</Field.Label>
                  <NumberInput.Root defaultValue="0" width="80" padding="0.5">
                    <NumberInput.Control />
                    <NumberInput.Input
                      onChange={(e) => setIns_Price(parseInt(e.target.value))}
                    />
                  </NumberInput.Root>
                </Field.Root>

                <br />

                <Field.Root className="UpLoad-condition">
                  <Field.Label fontSize="xl" paddingBottom="0.25rem">
                    Állapot
                  </Field.Label>
                  <RadioGroup.Root
                    defaultValue="1"
                    variant="subtle"
                    onValueChange={(details) => setIns_Condition(details.value)}
                  >
                    <Stack gap="1.5">
                      {radioOptions.map((opt) => (
                        <RadioGroup.Item
                          key={opt.value}
                          value={opt.value}
                          size="md"
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText fontSize="lg">
                            {opt.label}
                          </RadioGroup.ItemText>
                          <InfoTip
                            content={opt.desc}
                            unmountOnExit={true}
                            size={"lg"}
                          />
                        </RadioGroup.Item>
                      ))}
                    </Stack>
                  </RadioGroup.Root>
                </Field.Root>

                <Field.Root className="UpLoad-description">
                  <Field.Label fontSize="xl">Leírás</Field.Label>
                  <Textarea
                    w="22vw"
                    h="100%"
                    resize="none"
                    variant="flushed"
                    placeholder="Írj egy minél részletesebb leírást!"
                    onChange={(e) => setIns_Desc(e.target.value)}
                  />
                </Field.Root>

                <Field.Root className="UpLoad-isPremium">
                  <Field.Label fontSize="xl">Kiemelt hirdetés</Field.Label>
                  <SegmentGroup.Root
                    onValueChange={(details) => setIns_IsPrem(details.value)}
                  >
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items items={["Nem", "Igen"]} />
                  </SegmentGroup.Root>

                  <Dialog.Root size="lg">
                    <Dialog.Trigger asChild>
                      <Button variant="surface" size="sm">
                        Tudj meg többet
                      </Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.CloseTrigger />
                          <Dialog.Header justifyContent="center">
                            <Dialog.Title fontSize="xl">
                              Emeld ki hirdetésed, és add el gyorsabban!
                            </Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body fontSize="large">
                            <p>
                              Szeretnéd, ha termékedet többen látnák? A Kiemelt
                              hirdetés opcióval <b>(fizetős szolgáltatás)</b>{" "}
                              jelentősen megnövelheted az eladási esélyeidet.
                              Miért érdemes választani?
                            </p>
                            <br />
                            <ul>
                              <li className="UpLoad-dialList">
                                <b>Maximális láthatóság:</b> Hirdetésed a
                                találati lista elején, feltűnőbb kerettel
                                jelenik meg.
                              </li>
                              <li className="UpLoad-dialList">
                                <b>Főoldali megjelenés:</b> Kiemelt hirdetésedet
                                a weboldal kezdőlapján is megjelenítjük, így az
                                összes látogatónk rögtön találkozhat vele.
                              </li>
                              <li className="UpLoad-dialList">
                                <b>Gyorsabb eladás:</b> A nagyobb figyelem több
                                érdeklődőt és gyorsabb üzletkötést eredményez.
                              </li>
                            </ul>
                          </Dialog.Body>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Field.Root>

                <Field.Root className="UpLoad-footer" alignItems="flex-end">
                  <HStack>
                    <Button
                      rounded="3xl"
                      size="2xl"
                      className="UpLoad-btn"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Mégse
                    </Button>
                    <Button
                      rounded="3xl"
                      size="2xl"
                      className="UpLoad-btn"
                      onClick={() => SetIsNextAct(true)}
                      disabled={!isReady}
                    >
                      Következő
                    </Button>
                  </HStack>
                </Field.Root>
              </div>
            </Card.Body>
          </Card.Root>

          {isNextAct ? (
            <>
              <Card.Root
                size="md"
                bg="#ead7ce"
                width="50vw"
                height="55vh"
                className="UpLoad-secondMain"
              >
                <Card.Body gap="2" alignItems="center">
                  <FileUpload.Root
                    accept={[
                      "image/bmp",
                      "image/heic",
                      "image/jpeg",
                      "image/png",
                      "image/webp",
                    ]}
                    alignItems="center"
                    maxFiles={10}
                    width="80%"
                    onFileChange={(details) => {
                      setUpLoadedFiles(details.acceptedFiles);
                    }}
                  >
                    <FileUpload.HiddenInput />
                    <FileUpload.Dropzone width="xl">
                      <Icon size="lg" color="fg.muted">
                        <LuUpload />
                      </Icon>
                      <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                    <FileUpload.List alignItems="center" />
                  </FileUpload.Root>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="surface"
                    onClick={() =>
                      upLoadFiles(
                        upLoadedFiles,
                        cloadPreset,
                        insName,
                        userData.imageId,
                      )
                    }
                  >
                    Feltöltés
                  </Button>
                </Card.Footer>
              </Card.Root>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
