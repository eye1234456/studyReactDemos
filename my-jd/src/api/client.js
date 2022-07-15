// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
import { jsonpClient } from "./jsonp"
async function clientRequest(url, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(url, config)
    data = await response.json()
    if (response.ok) {
      // return data
      if (Array.isArray(data)) {
        return { data };
      }
      return data;

    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}
const client = {};
client.get = function (url, customConfig = {}) {
  // return client(url, { ...customConfig, method: 'GET' })
  if (url.startsWith('http://localhost:3000')) {
    return jsonpClient.get(url);
  } else {
    // let newUrl = url.replace('/api/', 'http://localhost:3000/data/')
    // return jsonpClient.get(newUrl);
    return clientRequest(url, { ...customConfig, method: 'GET' })
  }
}
export default client;
client.post = function (url, body, customConfig = {}) {
  return clientRequest(url, { ...customConfig, body })
}

client.jsonp = { get: jsonpClient.get };
