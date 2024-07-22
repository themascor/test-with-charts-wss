/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  setInterval(() => {
  const response = `data`;
  postMessage(response);
  }, data);
  
});
