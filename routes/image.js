// routes/image.js
const express = require('express');
const uploadmidle = require('../middleware/uploadmidle');
const router = express.Router();

router.post('/updateProfile', async (req, res) => {
    try {
        await uploadmidle(req, res);
        
        if (req.file === undefined) {
            return res.status(400).send({
                message: "You must select a file.",
            });
        }

        const userId = req.body.userId; // Assuming you're sending the userId from the client
        const file = req.file;

        // Save file details to the user in the database
        await User.findByIdAndUpdate(userId, { profilePicture: file.filename });

        return res.status(200).send({
            message: "File has been uploaded.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `Error when trying to upload image: ${error}`,
        });
    }
});

module.exports = router;
