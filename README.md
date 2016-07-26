JSON Pointer CLI
================

[![npm](https://img.shields.io/npm/v/jsonpointer-cli.svg)](https://www.npmjs.com/package/jsonpointer-cli)

CLI for retrieving a specific value within a JSON document using
[JSON Pointers](https://tools.ietf.org/html/rfc6901).

Looking for a Node library? Check out
[jsonpointer](https://github.com/janl/node-jsonpointer).


Installation
------------

```bash
$ npm install -g jsonpointer-cli
```


Usage
-----

```bash
$ jp
usage: jsonpointer [options] <pointer> [<indent>]
                jp [options] <pointer> [<indent>]

options:
  -l --log     Output console.log format instead of JSON

examples:
  $ echo {"name": "jsonpointer-cli", "version": "1.0.0"} | jp /name
  "jsonpointer-cli"

  $ echo {"name": "jsonpointer-cli", "version": "1.0.0"} | jp --log /version
  1.0.0

  $ echo {"data": ["a", {"b": 2}, "c"]} | jp /data/1
  {
    "b": 2
  }

  $ echo {"data": ["a", {"b": 2}, "c"]} | jp --log ""
  { data: [ 'a', { b: 2 }, 'c' ] }

  $ echo {"data": ["a", {"b": 2}, "c"]} | jp /data
  ["a",{"b":2},"c"]

  $ echo {} | jp ""
  {}
```

#### Try it out!

Get the URL of the top JavaScript project on GitHub:

```bash
$ curl -s "https://api.github.com/search/repositories?q=language:javascript&sort=stars" | jp -l /items/0/html_url
```


Contributing
------------

1. Check the open issues or open a new issue to start a discussion around
   your feature idea or the bug you found
2. Fork the repository and make your changes
3. Send a pull request

If your PR has been waiting a while, feel free to [ping me on Twitter](https://twitter.com/joeyespo).
