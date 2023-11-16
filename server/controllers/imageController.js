import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { s3config } from '../s3config.js';
import { matchedData } from 'express-validator';
import { randomBytes } from 'node:crypto';
import Image from '../model/Image.js';
import {
    sendResponse,
    formatAdminGetListQuery,
} from '../utils/sharedControllerFunctions.js';

const s3 = new S3Client(s3config);

const imageController = {
    create: async (req, res) => {
        const { title, altText, caption } = matchedData(req);
        // const { title, altText, caption } = req.body;

        // generate random file name
        const imageFileName = randomBytes(16).toString('hex');

        const cdnBaseUrl = process.env.CDN_BASE_URL;
        console.log('CDN Base url: ', cdnBaseUrl);

        // TODO: get image dimensions from image-size,
        // TODO: calculate orientation based on image dims

        const dbImageData = {
            title: title,
            altText: altText,
            caption: caption,
            url: `${cdnBaseUrl}/${imageFileName}`,
            fileName: imageFileName,
            // dimensions: dimensions,
            // orientation: orientation
        };

        const bucketParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: imageFileName,
            Body: req.file.buffer, //multer
            ContentType: req.file.mimetype, //multer
        };

        try {
            // Send to S3 bucket
            const command = new PutObjectCommand(bucketParams);
            await s3.send(command);

            // Send to db
            const newImage = await Image.create(dbImageData);
            sendResponse(Image, 'images', newImage, res, 201);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    fetch: async (req, res) => {
        console.log('Started getting list of images...');
        const { queryFilter, options } = formatAdminGetListQuery(req);

        try {
            const images = await Image.find(queryFilter).setOptions(options);
            sendResponse(Image, 'images', images, res, 200, queryFilter);
        } catch (error) {
            console.log('Error getting posts: ', error);
            res.status(500).send(error);
        }
    },

    get: async (req, res) => {
        console.log('Started fetching a single image...');
        try {
            const { id } = matchedData(req);
            // const postId = req.params.id;
            const image = await Image.findById(id);
            sendResponse(Image, 'images', image, res, 200);
        } catch (error) {
            console.log('Error getting image: ', error);
            res.status(500).send(error);
        }
    },

    update: async (req, res) => {
        let { id, ...updates } = matchedData(req);

        updates = { ...updates, updatedAt: new Date() };
        console.log('Image updates: ', updates);

        try {
            const imageToUpdate = await Image.findByIdAndUpdate(id, updates);
            sendResponse(Image, 'images', { data: imageToUpdate }, res, 200);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = matchedData(req);
            const imageToDelete = await Image.findById(id);

            // S3 delete
            if (imageToDelete) {
                const bucketParams = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: imageToDelete.fileName,
                };

                const command = new DeleteObjectCommand(bucketParams);
                await s3.send(command);
            }

            // db delete
            await Image.findByIdAndDelete(id);
            sendResponse(Image, 'images', { data: imageToDelete }, res, 200);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default imageController;
