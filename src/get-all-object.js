import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const objectsResponse = http.get("https://api.restful-api.dev/objects");

  check(objectsResponse, {
    "response status must 200": (response) => response.status === 200,
  });
}
