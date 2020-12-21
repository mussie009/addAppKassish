import {
  from_postal_code,
  to_postal_code
} from "../utils/headersInput";

const instruction = {
  title: "Guide",
  instructions: [
    `Følgende kolonner må være til stede: ${from_postal_code} og ${to_postal_code}`,
    `${from_postal_code} og ${to_postal_code} må være en tekststreng og et gydlig postnummer`
  ],
};

export default instruction;
