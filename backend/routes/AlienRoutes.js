import express from "express"
import { createAliens, fetchAllAliens, fetchAliensbyVersionId, readAlienByNameandVersionId } from "../controllers/AlienContoller.js"

const router = express.Router()


router.route("/").post(createAliens).get(fetchAllAliens)
router.route("/:versionid").get(fetchAliensbyVersionId)
router.route("/alienData/:name/:versionid").get(readAlienByNameandVersionId)


export default router