# football_go

Our corporate Football meetings players list. Built on Backbone.js and Virtual-dom alliance, so this prototype could be the fastest SPA in theory, but too freaky to use, unfortunately :(
It could be helpful to understand how's virtual DOM works.

## Installation
Common process:
1. npm i
2. npm run dev
3. npm run serve

All magic is in base View class where render function manages the page redraw. Initial render creates virtual nodes tree and caches it, then it only checks the differences and update view.
App.js contains app kickstart mechanism and some helpful utilities.