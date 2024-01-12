import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";


export let options = {
    //load test
   stages: [
      {duration: "1s", target: 5},
      {duration: "5s", target: 10},
      {duration: "1s", target: 0},
     ],
};

export default function () {  
  let response = http.get('https://reqres.in/api/users?page=2');
  check(response, {
    'Status is 200': (r) => r.status === 200,
  });
   
  sleep(1);
}

export function handleSummary(data) {
  return {
    "testing-result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
