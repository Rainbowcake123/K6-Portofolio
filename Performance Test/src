import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = {
  vus: 1000,
  iterations: 3500,
};

export default function () {  
  const apiUrl1 = "https://reqres.in/api/users";
  const apiUrl2 = "https://reqres.in/api/users/2";

  const createResponse = http.post(apiUrl1 + '/create', {
    data: JSON.stringify({
      "name": "morpheus",
      "job": "leader"
     }),
    headers: { 'Content-Type': 'application/json' },
  });

  check(createResponse, {
    'Create successful': (r) => r.status === 201,
    'Response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(2);

  const updateResponse = http.put(apiUrl2 + '/update', {
    data: JSON.stringify({
      "name": "morpheus",
      "job": "zion resident"
    }),
    headers: { 'Content-Type': 'application/json' },
  }); 

  check(updateResponse, {
    'Update successful': (r) => r.status === 200,
    'Response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  sleep(2);

}

export function handleSummary(data) {
  return {
    "testing-result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
