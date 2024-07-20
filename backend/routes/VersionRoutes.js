import express from "express"
import { createVersions, fetchAllVersions, readVersion,  } from "../controllers/VersionController.js"

const router = express.Router()

router.route("/").get(fetchAllVersions).post(createVersions)
router.route("/:versionName").get(readVersion)




export default router