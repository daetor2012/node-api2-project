const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id

    db.remove(id)
        .then((response) => {
            if(response === 1) {
                return res.status(200).json({ message: "Post successfully deleted!"})
            } else res.status(500).json({ message: "The post with the specified ID does not exist." })
            
            //res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})

/*When the client makes a `DELETE` request to `/api/posts/:id`:

- If the _post_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

- If there's an error in removing the _post_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The post could not be removed" }`.*/

module.exports = router