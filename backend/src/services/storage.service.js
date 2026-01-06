import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


export function uploadFile(file, folder = "/files") {
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
                file: file.toString("base64"),

                
                fileName: `file-${Date.now()}`,

                
                folder: folder
            },
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
}
