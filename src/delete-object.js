import http from "k6/http";
import { sleep, check } from "k6";
import { generateRandomInteger } from "./helper/helper.js";

export const options = {
  vus: 1,
  duration: "1s",
};

export default function () {
  const randNumb = generateRandomInteger(1, 1000);

  const data = {
    name: `New Device ${randNumb}`,
    data: {
      year: 2020,
      price: 1000,
      model: "Test new device",
      size: "1 TB",
    },
  };

  const addObjectResponse = http.post(
    "https://api.restful-api.dev/objects",
    JSON.stringify(data),
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const checkResponse = check(addObjectResponse, {
    "response status must 200": (response) => response.status === 200,
    "response data must not null": (response) => response.json().data != null,
  });

  if (!checkResponse) {
    fail();
  }

  const id = addObjectResponse.json().id;

  const deleteObject = http.del(`https://api.restful-api.dev/objects/${id}`);

  check(deleteObject, {
    "response status must 200": (response) => response.status === 200,
    "response message must not null": (response) =>
      response.json().message != null,
  });
}
