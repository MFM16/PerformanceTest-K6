import http from "k6/http";
import { check, sleep } from "k6";
import { generateRandomInteger } from "./helper/helper.js";

export const options = {
  vus: 1,
  duration: "5s",
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
