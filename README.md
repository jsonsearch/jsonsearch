# jsonsearch
Web live search engine for JSON database

[Visit JSONSearch](https://jsonsearch.github.io/)

[Example Search](https://jsonsearch.github.io/jsonsearch/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjsonsearch%2Fjsonsearch%2Fmain%2Fexamples%2Fcountry-by-capital-city.json&type=raw)

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

The database source must allow to be [XMLHTTPREQUEST](https://en.wikipedia.org/wiki/XMLHttpRequest)ed by this domain

You can allow our domain using Access-Control-Allow-Origin

Example:
```
Access-Control-Allow-Origin: https://jsonsearch.github.io
```

## Contributing
1.  Fork it (https://github.com/jsonsearch/jsonsearch/fork)
2.  Create your feature branch (git checkout -b my-new-feature)
3.  Commit your changes (git commit -am 'Add some feature')
4.  Push to the branch (git push origin my-new-feature)
5.  Create a new pull request

## Licence
[MIT](https://github.com/jsonsearch/jsonsearch/blob/main/LICENSE)
