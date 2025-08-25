import http from "k6/http";
import { check } from "k6";
import { generateRandomInteger } from "./helper/helper";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const randomNumber = generateRandomInteger(1, 15);

  const objectResponse = http.get(
    `https://api.restful-api.dev/objects/${randomNumber}`
  );

  check(objectResponse, {
    "response status must 200": (response) => response.status === 200,
  });
}
