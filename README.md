# Getting Started with Albums Explorer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# DEMO

## What the app does

The client application perform the following:

1. Fetch a list of all albums from the test API.
2. Show a list of the fetched albums. Decide on a design.
3. Every album record should display album name, album id, and its user's name and email address. In addition, every record to show expand / collapse toggle image.
4. Click on expand button will cause fetching the album's photos and displaying a set of only 12 of them on a screen. Only thumbnail images to be displayed, in a way of a visual grid of 3 rows, 4 images in each. Don't use a table component to display photos, use css only.
5. Each image to have "x" button at the top right corner. Clicking on this button will remove the photo from the grid and reorder the rest of photos to reduce the empty room of the removed one.
6. On hover of a thumbnail, show its title. Decide on the visual design.
7. On click on a thumbnail, show a popup with a corresponding full size image. At the top right corner of the full size image, place an "x" button which will close the image on click.
8. On click on the collapse button of the expanded album, close the photos area. On next click on the expand button to refresh photos from the API, so if some photos were removed before, all of them should be displayed again.
9. Allow reordering of expanded photos by dragging and dropping any of them. Dropping an image between two adjacent images will reorder images to place the dropped one between the two.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
