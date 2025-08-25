import http from "k6/http";
import { sleep, check } from "k6";
import { generateRandomInteger } from "./helper/helper";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const randNumb = generateRandomInteger(1, 1000);

  const data = {
    name: `New Device ${randNumb}`,
    data: {
      year: 2020,
      price: 1000,
      "CPU model": "Test new device",
      "Hard disk size": "1 TB",
    },
  };

  const addObjectResponse = http.post(
    "https://api.restful-api.dev/objects",
    JSON.stringify(data)
  );

  check(addObjectResponse, {
    "response status must 200": (response) => response.status === 200,
    "response data must not null": (response) => response.json().data != null,
  });
}
