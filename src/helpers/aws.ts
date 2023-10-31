import { Upload } from '@aws-sdk/lib-storage';
import { S3 } from '@aws-sdk/client-s3'


const client = new S3({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESSKEY as any,
        secretAccessKey: process.env.SECRETKEY as any
    }
});


export const ImageUpload = async (filename: string, body: any): Promise<any> => {


    let result;



    const UploadLibStorage = new Upload({
        client,
        params: {
            Bucket: process.env.BUCKET,
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