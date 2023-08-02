const admin = require('firebase-admin');
const multer = require('multer');

// Initialize Firebase
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "fir-auth-1c3bc.appspot.com"
});

const bucket = admin.storage().bucket();

const upload = multer({ storage: multer.memoryStorage() });

async function uploadToFirebase(req, res, next) {
    if (!req.file) {
        res.status(400).json({error: 'No file uploaded.'});
        return;
    }

    // Create a new blob in the bucket and upload the file data
    const blob = bucket.file(`${Date.now()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on('error', (err) => next(err));

    blobStream.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Make the file public
        await blob.makePublic();

        // Pass the public URL and the original file name to the next middleware
        req.file.firebaseUrl = publicUrl;
        next();
    });

    blobStream.end(req.file.buffer);
}

module.exports = { upload, uploadToFirebase };
