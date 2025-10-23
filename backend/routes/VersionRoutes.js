import express from "express"
import { createVersions, fetchAllVersions, readVersion, readVersionById,  } from "../controllers/VersionController.js"

const router = express.Router()

router.route("/").get(fetchAllVersions).post(createVersions)
router.route("/:versionName").get(readVersion)
router.route("/:id").get(readVersionById)




export default router