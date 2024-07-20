import asynHandler from "../middlewares/asynHandler.js"
import Alien from "../models/Aliens.js"


const createAliens = asynHandler(async (req, res) => {
    try {
        const { name, description, powers, cover, image, version_id } = req.body
        const alien = await new Alien({ name, description, powers, cover, image, version_id }).save()

        res.json(alien)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }

})

const fetchAllAliens = asynHandler(async (req, res) => {
    try {
        const aliens = await Alien.find({})
        res.json(aliens)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})

const fetchAliensbyVersionId = asynHandler(async (req, res) => {
    try {
        const aliens = await Alien.find({ version_id: req.params.versionid }).populate('version_id');
        res.json(aliens)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})
const readAlienByNameandVersionId = asynHandler(async (req, res) => {
    try {
        const { name, versionid } = req.params;
        const alien = await Alien.findOne({ name, version_id: versionid });
        res.json(alien)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})


export { createAliens, fetchAllAliens, fetchAliensbyVersionId, readAlienByNameandVersionId }