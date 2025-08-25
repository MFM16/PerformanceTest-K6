import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  const objectsResponse = http.get("https://api.restful-api.dev/objects");

  check(objectsResponse, {
    "response status must 200": (response) => response.status === 200,
  });
}
