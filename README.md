# VMAP Javascript Library

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://travis-ci.org/dailymotion/vmap-js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/vmap.svg)](https://badge.fury.io/js/vmap)

Parse a VMAP XML document to Javascript object. Complies with [VMAP 1.0.1 spec](http://www.iab.net/media/file/VMAP.pdf).

## Installation

Install with npm
```
npm install @dailymotion/vmap
```

## Usage

Provide the `VMAP` constructor an XML in order to have a parsed version of it.

Access `VMAP` properties using the APIs documented below.

``` javascript
import VMAP from '@dailymotion/vmap';

// Fetch VMAP as XML
fetch(vmapURL)
    .then(response => response.text())
    .then(xmlText => {
        // Get a parsed VMAP object
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const vmap = new VMAP(xmlDoc);
    })
    .catch(error => {
        console.error('Error fetching VMAP:', error);
    });
```

## API

### VMAP

#### Properties

* `version`: The VMAP version (should be 1.0).
* `adBreaks`: An array of `VMAPAdBreak` objects.
* `extensions`: An array of `Object` with
    * `children`: `Object` containing all this extension children and their name as the key
    * `attribute`: `Object` containing all this extension attributes and their name as the key
    * `value`: `Object` parsed from CDATA or as a fallback all of the text nodes of this extension concatenated

### VMAPAdBreak

Provides information about an ad break.

#### Properties

* `timeOffset`: Represents the timing of the ad break.
* `breakType`: Identifies whether the ad break allows "linear", "nonlinear" or "display" ads.
* `breakId`: An optional string identifier for the ad break.
* `repeatAfter`: An option used to distribute ad breaks equally spaced apart from one another along a linear timeline.
* `adSource`: A `VMAPAdSource` object.
* `trackingEvents`: An array of `Object` with tracking URLs
    * `event`: The name of the event to track for the element. Can be one of breakStart, breakEnd or error.
    * `uri`: The URI of the tracker.
* `extensions`: An array of `Object` with
    * `children`: `Object` containing all this extension children and their name as the key
    * `attribute`: `Object` containing all this extension attributes and their name as the key
    * `value`: `Object` parsed from CDATA or as a fallback all of the text nodes of this extension concatenated

#### Methods

* `track(event, errorCode)`: Call the trackers for the given event with an option error code parameter for `error` events.

### VMAPAdSource

Provides the player with either an inline ad response or a reference to an ad response.

#### Properties

* `id`: Ad identifier for the ad source.
* `allowMultipleAds`: Indicates whether a VAST ad pod or multple buffet of ads can be served into an ad break.
* `followRedirects`: Indicates whether the video player should honor the redirects within an ad response.
* `vastAdData`: Contains an embedded VAST response.
* `adTagURI`: Contains a URI to the VAST.
* `customData`: Contains custom ad data.

## Support and compatibility
The library is 100% written in JavaScript and the source code uses modern features like `modules`, `classes`, ecc... . Make sure your environment supports these features, or transpile the library when bundling your project.

### Pre-bundled versions
We provide several pre-bundled versions of the library (see [`dist` directory](dist/))

#### Browser
A pre-bundled version of VMAP-jsis available: [`vmap-js.js`](dist/vmap-js.js).

You can add the script directly to your page and access the library through the `VMAP` constructor.

```html
<script src="dist/vmap-js.js"></script>
```

```javascript
var vmap = new VMAP(vmapXML);
```

#### Node
A pre-bundled version for node is available too: [`vmap-js-node.js`](dist/vmap-js-node.js).

```javascript
const VMAP = require('@dailymotion/vmap')

const vmap = new VMAP(vmapXML);
```

## Build and tests

Install dependencies with:

```
npm install
```

The project is bundled using [Rollup](https://rollupjs.org/guide/en). Build with:

```
npm run-script build
```

Run tests with:

```
npm test
```
