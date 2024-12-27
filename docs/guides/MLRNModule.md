# MLRNModule

## Methods

### `setAccessToken(accessToken)`

Set accessToken, which is required when you want to use Mapbox tiles. Not required when using other tiles.

#### Arguments

| Name          |   Type   | Required |                                   Description                                    |
|---------------|:--------:|:--------:|:--------------------------------------------------------------------------------:|
| `accessToken` | `string` |  `Yes`   | Access token necessary for Mapbox tiles. Can be `null` for other tile providers. |

### `getAccessToken()`

Get the accessToken.

#### Arguments

| Name          |   Type   | Required |                                   Description                                   |
|---------------|:--------:|:--------:|:-------------------------------------------------------------------------------:|
| `accessToken` | `string` |  `Yes`   | access token to pull Mapbox-hosted tiles; can be `null` if for other tile hosts |

### `addCustomHeader(headerName, headerValue)`

See [Custom HTTP Headers](/docs/guides/Custom-HTTP-Headers.md)

#### Arguments

| Name          |   Type   | Required |      Description       |
|---------------|:--------:|:--------:|:----------------------:|
| `headerName`  | `string` |  `Yes`   | name for customHeader  |
| `headerValue` | `string` |  `Yes`   | value for customHeader |

### `removeCustomHeader(headerName)`

See [Custom HTTP Headers](/docs/guides/Custom-HTTP-Headers.md)

#### Arguments

| Name         |   Type   | Required |            Description             |
|--------------|:--------:|:--------:|:----------------------------------:|
| `headerName` | `string` |  `Yes`   | name of customHeader to be removed |

### `requestAndroidLocationPermissions()`

Android only, opens Location Permission prompt. Returns a Promise which resolves into a boolean. Either permission was
granted or denied.

### `setConnected(connected)`

Manually sets the connectivity state of the app. This is useful for apps which control their own connectivity state and
want to bypass any checks to the `ConnectivityManager`. Set to `true` for connected, `false` for disconnected,
and `null` for the `ConnectivityManager` to determine.

If hosting styles/sources on `localhost`, it's necessary to bypass `ConnectivityManager` when the device is
offline (https://github.com/maplibre/maplibre-react-native/issues/21#issuecomment-2558602006, [mapbox/mapbox-gl-native#12819](https://github.com/mapbox/mapbox-gl-native/issues/12819)):

```ts
setConnected(true);
```

For a low-data/offline app it's possible to block all style/source requests via network:

```ts
setConnected(false);
```

#### Arguments

| Name        |   Type    | Required |                    Description                    |
|-------------|:---------:|:--------:|:-------------------------------------------------:|
| `connected` | `boolean` |  `Yes`   | whether or not the SDK should assume it is online |