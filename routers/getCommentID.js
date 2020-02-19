const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.get("/api/posts/:id/comments", (req, res) => {
    const id = req.params.id

    db.findPostComments(id)
        .then((response) => {
            if(response != false) {
                res.status(200).json(response)
            } else res.status(404).json({ message: "The post with the specified ID does not exist." })
            
        })
        .catch((error) => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

/*When the client makes a `GET` request to `/api/posts/:id/comments`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in retrieving the _comments_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.*/

module.exports = router