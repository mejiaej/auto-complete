# Toy Blocks

## Dependencies

node version used `15.13.0`
yarn version used `1.22.10`

you can use npm instead of yarn
## Running locally

1. `yarn install`
2. `yarn start`


## Introduction

after starting the app, you'll see an input text. Type in and see the autocomplete options appear.
Remember the list of [static options is here](https://github.com/mejiaej/auto-complete/blob/master/src/components/Autocomplete.js#L9). Moving the list to a REST service would've required more time.


![image](https://user-images.githubusercontent.com/4699893/138615739-020fa509-e584-4faa-abc6-68e2758c6321.png)



## Run tests
1. `yarn test a`

## known bug

When the options are displayed and you hover the mouse over an option and use you keyboard to navigate through all options two highlighted options appear, there should only be one. To fix this issue we'll need to add a `onMouseOver` function [here](https://github.com/mejiaej/auto-complete/blob/master/src/components/Option.js#L15) and use a callback from the parent to update [highlightedIndex](https://github.com/mejiaej/auto-complete/blob/master/src/components/Autocomplete.js#L7) with the correct index, that way both key and mouse events will share the same `highlightedIndex` state.
