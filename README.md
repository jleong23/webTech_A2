## Project Components

Here is a breakdown of each control component:

### `ControlsPanel.jsx`

This component acts as a container for all the individual audio controls. It arranges them vertically within a styled panel, creating a unified user interface for manipulating the audio.

### `ProcAndPlay.jsx`

This component renders a single "PROC & PLAY" button.

- When music is playing, the button turns bright red and has a pulsing animation to give a clear visual cue.
- When idle, it's a standard red button.
- It triggers the `onProcPlay` function when clicked.

### `PlayStopButtons.jsx`

This provides separate "Play" and "Stop" buttons for basic playback control.

- **Play Button**: Features a "Play" icon. When `isPlaying` is true, it pulses to indicate that audio is active. It calls the `onPlay` function when clicked.
- **Stop Button**: Features a "Pause" icon (though it functions as a stop). It calls the `onStop` function when clicked.

### `MuteControls.jsx`

This component, labeled "Hush (Mute)", displays a set of toggle switches to mute individual instrument tracks.

- It dynamically creates a switch for each instrument key provided (hardcoded in this case to `["drums", "bass", "arps"]`).
- The state of each switch (`checked` or not) is determined by the `hush` prop.
- Toggling a switch updates the parent's state via the `setHush` function.

### `TempoControl.jsx`

This allows the user to adjust the tempo, measured in Beats Per Minute (BPM). It offers two methods for input:

- **Slider**: For quick, less precise tempo adjustments within a range of 50 to 200 BPM.
- **Number Input**: For typing in an exact BPM value. This change is only applied when the user clicks the adjacent checkmark button.

### `ReverbControl.jsx`

This is a straightforward slider for controlling the amount of reverb effect.

- It displays the current reverb value, formatted to two decimal places.
- The slider allows adjusting the value between 0 (no reverb) and 1 (maximum reverb).

### `VolumeSlider.jsx`

This component manages the master volume.

- **Slider**: Adjusts the volume level from 0 (silent) to 1 (full volume).
- **Mute/Unmute Button**: Toggles the sound on and off. When un-muting, it cleverly restores the volume to its previous level before it was muted. The button's text and icon change to reflect the current mute state.

### `SaveJSON.jsx`

This component provides the functionality to save the current application state to a JSON file and to load a state from such a file.

- **Save Button**: A button with a "Save" icon that, when clicked, triggers the `saveToJson` function to export the current settings.
- **Load Button**: A button with a "Load" icon that opens a file dialog to select a JSON file. Once a file is chosen, the `loadFromJson` function is called to import the settings.
- **Status Message**: It displays a temporary notification at the bottom of the screen to inform the user about the outcome of the save/load operation (e.g., success or failure). The message style changes to reflect the status.

### `SelectorPanel.jsx`

This component serves as a container for the drum-related selectors, grouping them under a "Drum Controls" heading. It arranges the `DrumSoundSelector` and `DrumPatternSelector` components in a responsive grid.

It composes the following sub-components:

#### `DrumSoundSelector.jsx`

Renders a dropdown menu to allow users to choose a drum kit (sound bank).

- The available kits are: "RolandTR808", "RolandTR909", "KorgDDM110", and "ElektronAnalogRytm".
- When a user selects a new kit from the dropdown, the `onChange` event is triggered, which updates the application's state.

#### `DrumPatternSelector.jsx`

Renders a dropdown menu for selecting a drum pattern.

- It provides a list of predefined drum patterns (e.g., "Pattern 0", "Pattern 1", "Pattern 2").
- Selecting a new pattern from the dropdown triggers the `onChange` event to update the current pattern in the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
