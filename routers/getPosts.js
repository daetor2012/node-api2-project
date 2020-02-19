const express = require("express")
const db = require("../data/db")

const router = express.Router()

router.get("/", (req, res) => {
    db.find() 
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json({ error: "The posts information could not be retrieved.", error })
        })
})


/*- If there's an error in retrieving the _posts_ from the database:
  - cancel the request.
  - respond with HTTP status code `500`.
  - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.*/

module.exports = router