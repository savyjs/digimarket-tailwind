# TMK

> Tailwind Market Kit

Install the plugin from npm:

```
$ npm install tmk
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    // Optional. Your plugin might not have any options at all.
    tmk: {
      // ...
      YOUR_PLUGIN_CUSTOM_OPTION: true,
      // ...
    },
  },
  variants: {
    // ...
    // Optional. Your plugin might not have any variants at all.
    tmk: ['responsive'],
    // ...
  },
  plugins: [
    // ...
    require('tmk'),
    // ...
  ],
};
```

This plugin will generate following CSS:

```css
/* ... */
.example-utility-class {
  display: block;
}

.custom-utility-class {
  background-color: red;
}
/* ... */
```

## License

TMK is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
