const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.post('/api/posts/:id/comments', (req, res) => {
    const { text } = req.body;
    const id  = req.params.id;

    db.findById(id)
        .then(response => {
            if (response.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })

            if (!text) {
                return res.status(400).json({ errorMessage: "Please provide text for the comment." });
            }

    db.insertComment({ post_id: id, text: text})
        .then(response => {
            res.status(201).json({ text });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
})
    

/*When the client makes a `POST` request to `/api/posts/:id/comments`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If the request body is missing the `text` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

- If the information about the _comment_ is valid:

  - save the new _comment_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _comment_.

- If there's an error while saving the _comment_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.*/

module.exports = router