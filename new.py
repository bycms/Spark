import requests
import json

url = "https://api.langsearch.com/v1/web-search"

payload = json.dumps({
  "query": input(),
  "freshness": "noLimit",
  "summary": False,
  "count": 5
})
headers = {
  'Authorization': 'Bearer sk-d9fd26536a6b48828dc7bbe15e31642c',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

response_data = response.json()

for item in response_data['data']['webPages']['value']:
  print('Name:', item['name'])
  print('URL:', item['url'])
  print('Snippet:', item['snippet'])
  print('---')
