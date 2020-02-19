const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.post("/", (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents ) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(req.body)
            .then((response) => {
                res.status(201).json({ message: "Post successfully added!"})
            })
            .catch((error) => {
                res.status(500).json({ error: "There was an error while saving the post to the database", error })
            })
    }
})

/*When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.*/

  module.exports = router