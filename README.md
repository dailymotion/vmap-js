# VMAP Javascript Library

[![Build Status](https://travis-ci.org/dailymotion/vmap-js.png)](https://travis-ci.org/dailymotion/vmap-js)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/vmap.svg)](https://badge.fury.io/js/vmap)

Parse a VMAP XML document to Javascript object. Complies with [VMAP 1.0.1 spec](http://www.iab.net/media/file/VMAP.pdf).

## Installation

Install with npm
```
npm install vmap
```

## Usage

Provide the `VMAP` constructor an XML in order to have a parsed version of it.

Access `VMAP` properties using the APIs documented below.

``` javascript
import VMAP from 'vmap';

// Fetch VMAP as XML
const xhr = new XMLHttpRequest();
xhr.open('GET', vmapURL);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            // Get a parsed VMAP object
            const vmap = new VMAP(xhr.responseXML);
        }
    }
};
```

## API

### VMAP

#### Properties

* `version`: The VMAP version (should be 1.0).
* `adBreaks`: An array of `VMAPAdBreak` objects.
* `extensions`: An array of XML nodes for each extension left as-is if any.

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
* `extensions`: An array of XML nodes for each extension left as-is if any.

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
