import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.resolve(`/public/uploads`))
        cb(null, `./public/uploads`)
    },
    filename: function (req, file, cb) {
        const fileName = `${req.user._id}-${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})
export const uploadService = multer({ storage: storage })