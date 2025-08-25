import http from "k6/http";
import { sleep, check, fail } from "k6";
import { generateRandomInteger } from "./helper/helper";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const randNumb = generateRandomInteger(1, 10);

  const getObjectById = http.get(
    `https://api.restful-api.dev/objects/${randNumb}`
  );

  const checkObject = check(getObjectById, {
    "response status must 200": (response) => response.status === 200,
  });

  if (!checkObject) {
    fail();
  }

  const newData = {
    name: `Update Data ${new Date().getTime()}`,
    data: {
      year: 2019,
      price: generateRandomInteger(500, 2000),
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
      color: "silver",
    },
  };

  const updateObject = http.post(
    `https://api.restful-api.dev/objects/${randNumb}`,
    JSON.stringify(data)
  );

  check(updateObject, {
    "response status must 200": (response) => response.status === 200,
    "updated at field must not null": (response) =>
      response.json().updated_at != null,
  });
}
