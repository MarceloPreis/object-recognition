const fs = require('fs');
const { RekognitionClient, DetectLabelsCommand } = require("@aws-sdk/client-rekognition");

const client = new RekognitionClient({
    region: "us-east-2",
    credentials: {
        accessKeyId: 'AKIA562ORD6FEZKSTU6E',
        secretAccessKey: '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',
    }
});

const image = fs.readFileSync('./images/foto_1.jpg');
const command = new DetectLabelsCommand({
    Image: {
        Bytes: image
    },
    MaxLabels: 10,
    MinConfidence: 80
});

client.send(command)
    .then((data) => {
        for (const label of data.Labels) {
            for (const category of label.Categories) {
                if (['Weapons and Military'].includes(category.Name)) {
                    console.log('Weapon Found');
                    return
                }
            }
        }

        console.log('No Weapon Found');
    })
    .catch((error) => {
        console.error(error);
    });