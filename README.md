# angular-simple-carousel

A flexible slide carousel for AngularJS.

Works in ES5 browsers (Firefox, Chrome, IE9+).

## Usage

Encompass your HTML in a container with a `banno-carousel` attribute to activate this directive. Add a `banno-carousel-slides` attribute to the container(s) of slides.

```html
<div banno-carousel>
  <div><!-- slides can be nested inside other elements -->
    <div banno-carousel-slides>
      <div>slide 1</div>
      <div>slide 2</div>
      <div>...and so on</div>
    </div>
    <div class="carousel-controls">
      <span ng-click="prevSlide()" ng-if="!isFirst()" title="Previous">←</span>
      <span ng-click="nextSlide()" ng-if="!isLast()" title="Next">→</span>
    </div>
  </div>
</div>
```

*Note:* The `banno-carousel` element will be replaced with a `div`.

## Installation

Requires Angular.

```shell
bower install --save angular-simple-carousel
```

If you are using RequireJS, load the "banno/carousel" module.

## API

### isFirst()

Returns `true` if the current slide is the first slide.

### isLast()

Retruns `true` if the current slide is the last slide.

### isSlide(index)

Returns `true` if the current slide is the nth slide (beginning with 0).

### nextSlide()

Displays the next slide.

### prevSlide()

Displays the previous slide.

### showSlide(index)

Displays the given slide (beginning with index 0) and hides the others.

## Contributing

You'll need [gulp](http://gulpjs.com/) installed on your machine to run the development tools. Then run `gulp` to run all of the tasks and watch the files for changes.

Please add tests and maintain the existing styling when adding and updating the code.

## Bugs & Feature Requests

Have an issue or feature request? Please [open a new issue](https://github.com/Banno/angular-carousel/issues/new).

## License

Copyright 2015 [Jack Henry & Associates Inc](https://www.jackhenry.com/).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
