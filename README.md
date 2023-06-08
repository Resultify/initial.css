# initial.css

**Browser default initial CSS styles with integrated custom properties.**

[![Run tests](https://github.com/Resultify/initial.css/actions/workflows/test.yml/badge.svg)](https://github.com/Resultify/initial.css/actions/workflows/test.yml)
![node-current](https://img.shields.io/node/v/@resultify/initial.css)

[**Demo**](https://resultify.github.io/initial.css)

## Table of contents

- [Why?](#why)
- [Main features and advantages to other solutions](#main-features-and-advantages-to-other-solutions)
- [Quick start](#quick-start)
- [Contributing](#contributing)
- [Changelog](CHANGELOG.md)

## Why?
- Despite the advancements in modern browsers, it is still good to have a basic corrections for the default CSS styles of the browser  - the so-called `user agent stylesheet`.
- Our goal was to provide a basic styles that can easily integrate with `CSS custom properties`, simplify the `CSS cascade`,  allow for easy implementation of `light and dark themes`, integrate `more than six different heading styles` and more. As we were unable to find any comparable open-source solutions, we decided to create our own and open it to the community.


## Main features and advantages to other solutions
- Simple and small. Only modern Browsers are supported (>1% usage).
- Simplified CSS cascade. One way to simplify CSS cascade is by utilizing the `:where()` pseudo-class with **zero** specificity. This makes it effortless to modify styles in any location at a later time.
- **Ten** heading styles. We've added four new heading styles to the existing six, providing more visual design options while maintaining accessibility and correct heading semantics.
- Easy implementation of light and dark themes.
- Flexible integration. You can use `initial.css` as a base for your own project or integrate part of initial.css - for example, only the **root** styles `src/root.css` or only the **heading** styles `src/heading.css`. Check the `src/initial` folder for more details.
- **Integrated CSS custom properties.** You won't have to create new styles on top of existing ones and then modify them later. CSS custom properties are already included in `initial.css`, so you can simply adjust them to suit your requirements.

instead of this three steps:
1. add `normalize.css`
2.
```css
body {
  background-color: var(--bg-color);
}
```
3.
```css
:root {
  --bg-color: red;
}
```
you can simply do this:
```css
:root {
  --bg-color: red;
}
```

## Quick start
### Variant 1
1. Manually add `initial.css` or `initial.min.css` as a base to your project from `dist` folder of the repository.

### Variant 2
1. Install `initial.css` npm package
```
npm install @resultify/initial.css
```
2. Import `initial.css` to your project for example with `postcss-import`
```
@import '@resultify/initial.css';
```
3. Add your own light/dark theme styles. Examples you can find in `src/theme` folder.
4. Add your own design variations. Examples you can find in `src/design-variations` folder.
5. You can also find some useful CSS utilities in `src/utils` folder which you can directly import to your project or paste only parts of code to your own CSS files.
6. There are also accessibility helpers in `src/accessibility` folder which can be useful for your project.
7. Add print styles to your project. Example you can find in `src/print.css`.

## Contributing
1. Clone/fork the repository and run `npm install` to install dependencies.
2. Run `npm start` to start the development server with watcher.
3. Add your changes to `src/*` files and test the result in browser on `http://localhost:8083`
4. Run `npm test` to run tests.
5. Commit your changes and create a pull request.
