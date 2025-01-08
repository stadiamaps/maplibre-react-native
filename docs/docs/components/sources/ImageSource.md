<!-- DO NOT MODIFY -->
<!-- This file is auto-generated from src/components/ImageSource.tsx -->

# `<ImageSource />`

ImageSource is a content source that is used for a georeferenced raster image to be shown on the map.<br/>The georeferenced image scales and rotates as the user zooms and rotates the map

## Props

| Prop        |        Type        | Default | Required | Description                                                                                                     |
| ----------- | :----------------: | :-----: | :------: | --------------------------------------------------------------------------------------------------------------- |
| id          |      `string`      | `none`  |  `true`  | A string that uniquely identifies the source.                                                                   |
| url         | `number \| string` | `none`  | `false`  | An HTTP(S) URL, absolute file URL, or local file URL to the source image.<br/>Gifs are currently not supported. |
| coordinates |      `tuple`       | `none`  | `false`  | The top left, top right, bottom right, and bottom left coordinates for the image.                               |
| children    |    `ReactNode`     | `none`  | `false`  | FIX ME NO DESCRIPTION                                                                                           |