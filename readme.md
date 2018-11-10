# Pizza CLI [![Build Status](https://travis-ci.org/xxczaki/pizza-cli.svg?branch=master)](https://travis-ci.org/xxczaki/pizza-cli)

> Order pizza in a CLI app :pizza:

![Animated SVG](https://rawcdn.githack.com/xxczaki/pizza-cli/33ec8c1c50cc0bdc05619d0980d3cdbc39256508/pizza.svg)


## Install

```
$ npm install --global pizza-cli
```


## Usage

```
	Usage
	  $ pizza <options>
	Options
	  --order, -o   		Order pizza
	Examples
	  $ pizza --order
```

## Info

All your orders are available in the `orders` folder :smile:

Example order:
```json
{
  "pizza": [
    {
      "size": "large",
      "dough": "thick",
      "ingredients": [
        "pepperoni",
        "bacon",
        "sausage",
        "ham"
      ]
    }
  ],
  "client": [
    {
      "name": "Anthony",
      "phone": 777777777
    }
  ],
  "address": [
    {
      "time": "12:34",
      "city": "Boston",
      "street": "National Street",
      "number": "12b/44a",
      "notes": "Please come quickly :D"
    }
  ]
}          
```


## License

MIT © [Antoni Kepinski](https://kepinski.me)
