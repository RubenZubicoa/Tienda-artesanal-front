import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) =>{
        cb(null, Date.now().toString() + path.extname(file.originalname));
    }
});

export default multer({storage});