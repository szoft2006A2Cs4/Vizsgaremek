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
  DataList,
  CloseButton,
} from "@chakra-ui/react";
import { InfoTip } from "@/components/ui/toggle-tip";
import { LuUpload } from "react-icons/lu";

import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import axios from "../scripts/axios";
import Loading from "./Loading";

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
  const cloudName = "dknhbvrq9";
  const cloudPreset = "HasznaltHangszerek_UploadProducts";

  const navigate = useNavigate();

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const [userData, setUserData] = useState(null);

  const [isNextAct, setIsNextAct] = useState(false);
  const [isLastAct, setIsLastAct] = useState(false);

  const [upLoadedFiles, setUpLoadedFiles] = useState([]);

  const [insName, setInsName] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [ins_Scat, setIns_Scat] = useState("");
  const [ins_Price, setIns_Price] = useState(0);
  const [ins_Condition, setIns_Condition] = useState("");
  const [ins_Desc, setIns_Desc] = useState("");
  const [ins_IsPrem, setIns_IsPrem] = useState("Nem");

  const [isReady, setIsReady] = useState(false);
  const [isFilesReady, setIsFilesReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpLoadSuccess, setIsUpLoadSuccess] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get("api/login/me");
        const email = resp.data.email;

        const user = await axios.get(`api/user/${email}`);
        setUserData(user.data);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

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

  const upLoadFiles = async (files, preset, insname, imageId) => {
    if (!imageId || files.length == 0) return;

    const cleanName = insname.split(" ").join("");
    let imgCount = 0;

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

        if (resp.ok) {
          imgCount++;
        }
      } catch (error) {
        console.log("Hiba a feltöltés során: ", error);
      }
    }
    return imgCount;
  };

  useEffect(() => {
    setIsFilesReady(upLoadedFiles.length > 0);
  }, [upLoadedFiles]);

  const handleFinalSubmit = async () => {
    if (!userData) return console.log("felh. adatok hianyoznak");
    setIsLoading(true);

    const insToUpLoad = {
      Name: insName,
      Cost: ins_Price,
      Description: ins_Desc,
      Sold: false,
      UId: userData.id,
      SCName: ins_Scat,
      IsPremium: ins_IsPrem === "Igen",
      Condition: ins_Condition,
    };

    try {
      const resp = await axios.post("api/Instrument", insToUpLoad, {
        withCredentials: true,
      });

      const insId = resp.data.id;
      let imageCount = 0;

      if (upLoadedFiles.length > 0) {
        imageCount = await upLoadFiles(
          upLoadedFiles,
          cloudPreset,
          insName,
          userData.imageId,
        );
      }

      if (imageCount > 0) {
        await axios.put(`api/Instrument/${insId}/imagecount`, imageCount, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setIsUpLoadSuccess(true);
      setTimeout(() => {
        navigate("/", { replace: true });
        setIsUpLoadSuccess(false);
      }, 4000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      {isLoading ? <Loading /> : <></>}
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
                          setSelectedCat(details.value[0])
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
                    w="100%"
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
                              <li>A kiemelés díja 1000Ft/Hét</li>
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
                      size="2xl"
                      className="uni-button"
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Mégse
                    </Button>
                    <Button
                      size="2xl"
                      className="uni-button"
                      onClick={() => setIsNextAct(true)}
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
                    <FileUpload.ClearTrigger asChild>
                      <CloseButton
                        me="-1"
                        size="xs"
                        variant="plain"
                        focusVisibleRing="inside"
                        focusRingWidth="2px"
                        pointerEvents="auto"
                        onClick={() => {
                          setUpLoadedFiles([]);
                        }}
                      >
                        Fájlok törlése
                      </CloseButton>
                    </FileUpload.ClearTrigger>
                  </FileUpload.Root>
                </Card.Body>
                <Card.Footer justifyContent="flex-end">
                  <Button
                    className="uni-button"
                    disabled={!isFilesReady}
                    onClick={() => {
                      setIsLastAct(true);
                    }}
                  >
                    Áttekintés
                  </Button>
                </Card.Footer>
              </Card.Root>
            </>
          ) : (
            <></>
          )}
          {isLastAct && isFilesReady ? (
            <Card.Root
              className="UpLoad-thirdMain"
              size="md"
              bg="#ead7ce"
              width="50vw"
              height="55vh"
            >
              <Card.Body>
                <div id="UpLoad-thirdMain-grid">
                  <DataList.Root
                    orientation="horizontal"
                    maxW="md"
                    className="UpLoad-checkOut-field"
                  >
                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Név</DataList.ItemLabel>
                      <DataList.ItemValue>{insName}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Kategória</DataList.ItemLabel>
                      <DataList.ItemValue>{selectedCat}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Alkategória</DataList.ItemLabel>
                      <DataList.ItemValue>{ins_Scat}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Ár</DataList.ItemLabel>
                      <DataList.ItemValue>{ins_Price}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Állapot</DataList.ItemLabel>
                      <DataList.ItemValue>{ins_Condition}</DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item pt="4">
                      <DataList.ItemLabel>Prémium</DataList.ItemLabel>
                      <DataList.ItemValue>
                        {ins_IsPrem == "Igen" ? "Igen" : "Nem"}
                      </DataList.ItemValue>
                    </DataList.Item>

                    {ins_IsPrem && (
                      <DataList.Item pt="4">
                        <DataList.ItemLabel>Költség</DataList.ItemLabel>
                        <DataList.ItemValue>
                          {ins_IsPrem == "Igen" ? 1000 + "Ft" : 0 + "Ft"}
                        </DataList.ItemValue>
                      </DataList.Item>
                    )}
                  </DataList.Root>

                  <div id="UpLoad-thirdMain-imgList">
                    <p id="UpLoad-thirdMain-imgList-title">Feltöltött képek</p>
                    <ul
                      className="chakra-file-upload__itemGroup css-1hdg0h2"
                      style={{ alignItems: "flex-start" }}
                    >
                      {upLoadedFiles.map((file, index) => {
                        return (
                          <li
                            key={index}
                            className="chakra-file-upload__item css-13326kx"
                            style={{ width: "20rem" }}
                          >
                            <div className="chakra-file-upload__itemPreview css-buqlve">
                              <svg className="css-s3mb0o" viewBox="0 0 24 24">
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                              </svg>
                            </div>
                            <div>{file.name}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button
                  className="uni-button"
                  disabled={isLoading}
                  onClick={() => {
                    handleFinalSubmit();
                  }}
                >
                  Befejezés
                </Button>
              </Card.Footer>
            </Card.Root>
          ) : (
            <></>
          )}

          <Dialog.Root open={isUpLoadSuccess} placement="center">
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>A hangszer feltöltése sikeres!</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body as="h2">
                  Vissza irányítunk a főoldalra . . .
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </div>
      </div>
      <Footer />
    </div>
  );
}
