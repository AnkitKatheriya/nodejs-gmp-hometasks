const csv = require('csvtojson')
const filePaths = require('./constants/paths')
const fileSystem = require('fs')
const errLogger1 = require('./utils/utils')

const logger1 = fileSystem.createWriteStream(filePaths.TEXT_FILE_PATH_V1)

const convertCSVtoJSONFile1 = async () => {
    fileSystem.createReadStream(filePaths.CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (obj) =>  {
            const bookObj = JSON.parse(obj)
            const transformedData = {
                'book': bookObj.Book,
                'author': bookObj.Author,
                'price': bookObj.Price,
            }
            logger1.write(JSON.stringify(transformedData) + "\r\n")
        })
        .on('error', errLogger1);
}

convertCSVtoJSONFile1()