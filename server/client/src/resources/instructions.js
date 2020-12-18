import {
  from_postal_code,
  to_postal_code,
  send_date,
} from "../utils/headersInput";

const instruction = {
  title: "Slik gjør du det",
  instructions: [
    `Sørg for at nødvendige kolonner er inkludert: ${from_postal_code}, ${to_postal_code} og ${send_date}`,
    "Sørg for at alle verdier i disse kolonnene inneholder gyldige verdier",
    `${from_postal_code} og ${to_postal_code} må være en tekststreng og et gydlig postnummer`,
    `${send_date} må være på formatet dato og være gyldig`
  ],
};

export default instruction;
