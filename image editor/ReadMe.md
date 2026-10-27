# Image Editor — JavaScript Canvas API

A browser-based image editor built with HTML, CSS, and vanilla JavaScript. This project allows users to upload an image, apply real-time visual filters, choose predefined presets, reset adjustments, and download the edited image.

## Features

- **Image Upload:** Upload an image from your local device.
- **Real-Time Editing:** Preview filter changes instantly using the HTML Canvas API.
- **Adjustable Filters:** Modify brightness, contrast, exposure, saturation, hue rotation, blur, grayscale, sepia, opacity, and invert.
- **Preset Filters:** Apply predefined styles such as Original, Vintage, Black & White, Warm, Cool, Dramatic, and Faded.
- **Reset Functionality:** Restore the default filter values.
- **Image Download:** Export the edited image as a PNG file.
- **Responsive UI:** A flexible layout for desktop and smaller screens.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- HTML Canvas API
- DOM Manipulation
- Browser File API

No external libraries or frameworks are required.

## Project Structure

```text
image-editor/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Open the project

Navigate to the project directory:

```bash
cd image-editor
```

Open `index.html` in your browser, or use the Live Server extension in VS Code for local development.

### 3. Use the editor

1. Upload an image.
2. Adjust the filter sliders or choose a preset.
3. Click **Reset** to restore the original filter settings.
4. Click **Download** to save the edited image.

## What I Learned

### 1. The HTML Canvas API

The HTML Canvas API allows JavaScript to draw and manipulate graphics inside a browser.

Canvas requires an HTML element and a rendering context.

```html
<canvas class="image-canvas"></canvas>
```

JavaScript:

```javascript
const imageCanvas = document.querySelector(".image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
```

- `imageCanvas` references the canvas element.
- `getContext("2d")` provides the 2D drawing context.
- `canvasCtx` exposes methods for drawing images, clearing pixels, and applying canvas filters.

### 2. Loading an Image with JavaScript

The File API allows the application to access a file selected through an HTML file input.

```javascript
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;

    imageCanvas.width = img.naturalWidth;
    imageCanvas.height = img.naturalHeight;

    applyFilters();
  };
});
```

**Important concepts:**

- `event.target.files[0]` retrieves the selected file.
- `new Image()` creates an image object.
- `URL.createObjectURL(file)` creates a temporary URL for the selected file.
- `img.onload` ensures the image has loaded before drawing it.
- `naturalWidth` and `naturalHeight` provide the original image dimensions.

The canvas dimensions are set to the image dimensions to preserve its native resolution.

### 3. Drawing an Image on Canvas

The `drawImage()` method draws an image onto the canvas.

```javascript
canvasCtx.drawImage(image, 0, 0);
```

The arguments represent:

- `image`: the image to draw.
- `0`: the horizontal position.
- `0`: the vertical position.

Canvas uses a coordinate system that begins at the top-left corner. The X-axis increases to the right, and the Y-axis increases downward.

### 4. Applying Filters with `ctx.filter`

The Canvas 2D API provides the `filter` property, which accepts CSS filter functions.

```javascript
canvasCtx.filter = "brightness(120%) contrast(110%)";
canvasCtx.drawImage(image, 0, 0);
```

The filter is applied when the image is drawn. Setting `ctx.filter` alone does not modify pixels already on the canvas.

Common filter functions include:

| Filter | Purpose | Example |
|---|---|---|
| `brightness()` | Adjusts lightness | `brightness(120%)` |
| `contrast()` | Changes tonal contrast | `contrast(130%)` |
| `saturate()` | Adjusts color intensity | `saturate(150%)` |
| `hue-rotate()` | Rotates colors around the hue wheel | `hue-rotate(90deg)` |
| `blur()` | Applies a blur effect | `blur(3px)` |
| `grayscale()` | Converts colors toward grayscale | `grayscale(100%)` |
| `sepia()` | Adds a warm brown tone | `sepia(60%)` |
| `opacity()` | Changes opacity | `opacity(80%)` |
| `invert()` | Inverts colors | `invert(100%)` |

The filters can be combined into one string:

```javascript
canvasCtx.filter = `
  brightness(110%)
  contrast(120%)
  saturate(130%)
  sepia(20%)
`;

canvasCtx.drawImage(image, 0, 0);
```

In the project, JavaScript generates this filter string dynamically from the current filter settings.

### 5. Managing Filter Values with Objects

Instead of creating separate variables for each filter, the editor stores filter configuration in an object.

```javascript
const filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },

  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%"
  },

  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px"
  }
};
```

Each filter contains:

- `value`: its current setting.
- `min`: the minimum slider value.
- `max`: the maximum slider value.
- `unit`: the unit used by the filter.

This structure makes it easier to generate sliders dynamically, update values, and define presets.

### 6. Generating Sliders Dynamically

JavaScript can create HTML elements at runtime using DOM methods.

```javascript
const input = document.createElement("input");

input.type = "range";
input.min = config.min;
input.max = config.max;
input.value = config.value;

filterContainer.appendChild(input);
```

The `input` event fires as the user moves the slider.

```javascript
input.addEventListener("input", () => {
  filters[name].value = Number(input.value);
  applyFilters();
});
```

This updates the selected filter's value and calls `applyFilters()` to redraw the image.

The `Number()` conversion ensures that slider values are stored as numbers instead of strings.

### 7. Applying Multiple Filters Dynamically

The editor reads all current filter values and builds a combined filter string.

```javascript
function applyFilters() {
  if (!image) return;

  const f = filters;

  canvasCtx.clearRect(
    0,
    0,
    imageCanvas.width,
    imageCanvas.height
  );

  canvasCtx.filter = [
    `brightness(${f.brightness.value}%)`,
    `contrast(${f.contrast.value}%)`,
    `saturate(${f.saturation.value}%)`,
    `hue-rotate(${f.hueRotation.value}deg)`,
    `blur(${f.blur.value}px)`,
    `grayscale(${f.grayscale.value}%)`,
    `sepia(${f.sepia.value}%)`,
    `opacity(${f.opacity.value}%)`,
    `invert(${f.invert.value}%)`
  ].join(" ");

  canvasCtx.drawImage(image, 0, 0);

  canvasCtx.filter = "none";
}
```

**How it works:**

1. Check whether an image has been loaded.
2. Clear the previous canvas output.
3. Read the latest values from the filter object.
4. Combine the filter functions into one string.
5. Draw the original image with the selected filters.
6. Reset the context filter for subsequent drawing operations.

Redrawing the original image prevents previous filter effects from accumulating across edits.

### 8. Creating Presets

A preset is a collection of predefined filter values.

```javascript
const presets = {
  Vintage: {
    brightness: 105,
    contrast: 110,
    saturation: 80,
    hueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 35,
    opacity: 100,
    invert: 0
  },

  "Black & White": {
    brightness: 100,
    contrast: 115,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  }
};
```

When a user selects a preset, the application copies its values into the active filter state, updates the sliders, and calls `applyFilters()`.

This demonstrates how configuration objects can control multiple parts of a user interface.

### 9. Resetting Filters

Resetting involves restoring the default configuration and synchronizing the UI.

```javascript
filters = structuredClone(defaultFilters);
createFilters();
applyFilters();
```

`structuredClone()` creates a deep copy of the default configuration, preventing modifications to the active filters from changing the defaults.

Recreating the sliders ensures their positions and displayed values match the restored configuration.

### 10. Downloading the Edited Image

The canvas can export its rendered output as an image.

```javascript
const link = document.createElement("a");

link.download = "edited-image.png";
link.href = imageCanvas.toDataURL("image/png");
link.click();
```

- `toDataURL("image/png")` converts the canvas contents into a PNG data URL.
- `link.download` specifies the suggested filename.
- `link.click()` triggers the download.

The downloaded file contains the rendered image, including the applied filters.

## Important Technical Notes

- `brightness(100%)` represents the normal brightness setting.
- `saturate()` is the correct CSS filter function for saturation adjustments.
- `hue-rotate()` uses degrees.
- `blur()` uses a length unit such as pixels.
- `exposure` is not a native CSS or Canvas filter. Mapping it to another brightness adjustment is an approximation, not a true exposure calculation.
- Canvas filters are applied when drawing; they do not change the source image object.
- The original image should be retained so that filters can be adjusted without repeatedly processing an already-edited result.
- For production use, validate uploaded file types, handle image-loading failures, and revoke temporary object URLs after use.
- Canvas export can fail if the canvas contains images from external origins without appropriate cross-origin permissions. Locally uploaded images normally avoid this issue.

## Possible Future Improvements

- Add undo and redo functionality.
- Show an active state on the selected preset.
- Add before-and-after comparison.
- Support image cropping and rotation.
- Add keyboard shortcuts.
- Allow users to save and load custom presets.
- Add support for exporting JPEG and WebP formats.
- Improve accessibility with keyboard-friendly controls and descriptive labels.

## Learning Outcome

This project demonstrates how the HTML Canvas API works with JavaScript to render images, apply visual filters, update a user interface dynamically, manage application state, and export edited graphics.

It also provides practical experience with DOM manipulation, event listeners, objects, functions, browser file handling, and reusable UI logic.

---

**Built with HTML, CSS, and JavaScript.**