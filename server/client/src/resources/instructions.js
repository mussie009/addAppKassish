import {
  from_postal_code,
  to_postal_code,
  send_date,
} from "../utils/headersInput";

const instruction = {
  title: "Guide",
  instructions: [
    `Følgende kolonner må være til stede: ${from_postal_code}, ${to_postal_code} og ${send_date}`,
    `${from_postal_code} og ${to_postal_code} må være en tekststreng og et gydlig postnummer`,
    `${send_date} må være formatert som dato og være gyldig`
  ],
};

export default instruction;
