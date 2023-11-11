import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3'


const client = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: "AKIASBRBH3T5DEZKU6FQ",
        secretAccessKey: "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"
    }
});


export const ImageUpload = async (filename: string, body: any): Promise<any> => {


    let result;



    const UploadLibStorage = new Upload({
        client,
        params: {
            Bucket: "leophysio",
            Key: filename,
            Body: body(),
            ACL: "public-read",

        }
    })

    UploadLibStorage.on("httpUploadProgress", (data) => {
        result = `https://leophysio.s3.us-east-2.amazonaws.com/${data.Key}`
    })


    await UploadLibStorage.done()

    return result
}