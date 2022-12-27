# jsonsearch
Web live search engine for JSON database

[Visit JSONSearch](https://jsonsearch.github.io/)

[Example Search: country-by-capital-city.json](https://jsonsearch.github.io/jsonsearch/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjsonsearch%2Fjsonsearch%2Fmain%2Fexamples%2Fcountry-by-capital-city.json&proxied=false) - By [github/samayo](https://github.com/samayo/country-json/blob/master/src/country-by-capital-city.json)

## Create a database
Acceptable JSON format:
```json
[{
  "title":"title value 1",
  "text":"text value 1"
},{
  "title":"title value 2",
  "text":"text value 2"
}]
```
[Create a databse on text editor](https://jsonsearch.github.io/jsonsearch/editor.html)

The database source must allow to be [XMLHTTPREQUEST](https://en.wikipedia.org/wiki/XMLHttpRequest)ed by jsonsearch.github.io domain

You can allow our domain using Access-Control-Allow-Origin

Example:
```
Access-Control-Allow-Origin: https://jsonsearch.github.io
```

## Licence
[MIT](https://github.com/jsonsearch/jsonsearch/blob/main/LICENSE)
