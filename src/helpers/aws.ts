import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'


const client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESSKEY as any,
        secretAccessKey: process.env.SECRETKEY as any
    }
});

export const ImageUpload = async (filename: any, body: any) => {

    const params = {
        Bucket: process.env.BUCKET,
        Key: filename,
        Body: body
    }


    const UploadLibStorage = new Upload({
        client,
        params
    })

    UploadLibStorage.on("httpUploadProgress", (data) => {
        return data.Key
    })


    await UploadLibStorage.done()

}