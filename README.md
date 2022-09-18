# [`Visit live preview`](https://frontend-task-2.vercel.app)

# Getting Started

1. Clone this repository.
2. `npm install`
3. `npm start`

# Notes

1.  Project uses fake values for displaying data since there is no backend. All API related requirements are under `./src/api`. As a result, all the changes are lost on page reload or first page load. It can be made somewhat persistent by using `localStorage`.

2.  Project uses `typescript`, `react-router`, `faker` and hooks.

3.  All APIs are assumed to be non-failing due to time constraints, wild assumption, so error handling is excluded for now.

4.  By default, `/` redirects to `/profile/:username`, since home page wasn't in scope, so Profile page is our entry point.

5.  Working routes are `/profile/:username`, `/post/:postId` and `/post/:postId/comments`. However, opening second and third route directly from the browser won't work because of the way API is structured, for now.
