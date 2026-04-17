import { Dialog, Portal } from "@chakra-ui/react";

export default function ASzF({ value, setter }) {
  return (
    <Dialog.Root size="lg" open={value} onOpenChange={(e) => setter(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header justifyContent="center">
              <Dialog.Title fontSize="xl">
                Adatkezelési Tájékoztató
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body style={{ fontSize: "large", lineHeight: "1.6" }}>
              <div className="aszf_div">
                <h4 className="aszf_cim">1. Az Adatkezelő adatai:</h4>
                <div style={{ display: "grid", gap: "4px" }}>
                  <div>
                    <strong>Név/Cégnév:</strong> Használt Hangszerek
                  </div>
                  <div>
                    <strong>Székhely/Lakcím:</strong> Szombathely
                  </div>
                  <div>
                    <strong>E-mail cím:</strong>{" "}
                    <a href="mailto:hasznalthangszerek01@gmail.com">
                      hasznalthangszerek01@gmail.com
                    </a>
                  </div>
                  <div>
                    <strong>Honlap:</strong>{" "}
                    <a href="https://hasznalthangszerek.hu" target="_blank">
                      használthangszerek.hu
                    </a>
                  </div>
                </div>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">
                  2. A kezelt adatok köre és az adatkezelés célja:
                </h4>
                <p>
                  A weboldal látogatása során az alábbi esetekben történik
                  adatkezelés:
                </p>
                <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
                  <li>
                    <strong>Kapcsolatfelvételi űrlap:</strong> Ha üzenetet
                    küldesz, a megadott nevet és e-mail címet kizárólag a
                    válaszadáshoz használom fel.
                  </li>
                  <li>
                    <strong>Sütik (Cookies):</strong> A honlap technikai okokból
                    és statisztikai célból (pl. Google Analytics) apró
                    adatfájlokat helyezhet el a gépeden.
                  </li>
                </ul>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">3. Az adatkezelés jogalapja:</h4>
                <p>
                  Az adatkezelés a felhasználó önkéntes hozzájárulásán alapul (
                  <strong>GDPR 6. cikk (1) bek. a) pont</strong>. Az űrlap
                  kitöltésével és az üzenet elküldésével hozzájárulsz az adatok
                  kezeléséhez.
                </p>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">4. Az adatkezelés időtartama:</h4>
                <p>
                  A megadott adatokat a cél megvalósulásáig (pl. a kérdés
                  megválaszolásáig) vagy a hozzájárulás visszavonásáig tárolom.
                </p>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">
                  5. Adatfeldolgozók (Tárhelyszolgáltató):
                </h4>
                <p>
                  Az adatokat biztonságos szervereken tároljuk.
                  Tárhelyszolgáltatónk:
                </p>
                <div>
                  <strong>aiven.io</strong>, Helsinki, Finland (HQ)
                  <br />
                  Antinkatu 1.,{" "}
                  <a href="mailto:sales@aiven.io">sales@aiven.io</a>
                </div>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">6. Az érintettek jogai:</h4>
                <p>Neked, mint látogatónak, jogod van:</p>
                <ul style={{ listStyle: "none" }}>
                  <li>Tájékoztatást kérni az adataid kezeléséről.</li>
                  <li>Kérni az adataid helyesbítését vagy törlését.</li>
                  <li>Tiltakozni az adatkezelés ellen.</li>
                </ul>
              </div>

              <div className="aszf_div">
                <h4 className="aszf_cim">7. Jogorvoslati lehetőség:</h4>
                <p>
                  Bármilyen adatvédelmi panasszal a{" "}
                  <strong>
                    Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH)
                  </strong>{" "}
                  fordulhatsz:
                </p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <strong>Web:</strong>{" "}
                    <a href="https://www.naih.hu" target="_blank">
                      www.naih.hu
                    </a>
                  </li>
                  <li>
                    <strong>Cím:</strong> 1055 Budapest, Falk Miksa utca 9-11.
                  </li>
                </ul>
              </div>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
