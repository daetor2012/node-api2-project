const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.put("/api/posts/:id", (req, res) => {
    const id = req.params.id
    const { title, contents } = req.body

    if(!title || !contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.update(id, req.body)
            .then((response) => {
                if(response === 1) {
                    res.status(200).json(req.body)
                } else res.status(404).json({ message: "The post with the specified ID does not exist." })
            })
            .catch((error) => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
})

/*When the client makes a `PUT` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If there's an error when updating the _post_:

  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post information could not be modified." }`.

- If the post is found and the new information is valid:

  - update the post document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _post_.*/

module.exports = router