import AWS from 'aws-sdk';

// Configure AWS SDK (replace with your actual credentials and region)
const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadProfileImage = async (file, userId) => {
  if (!file) throw new Error('No file provided');
  const fileName = `profile_images/${userId}_${Date.now()}_${file.name}`;
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  };
  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Public URL of the uploaded image
  } catch (error) {
    throw new Error('Error uploading image to AWS S3: ' + error.message);
  }
};

export default {
  uploadProfileImage,
};