//console.log("Inside task2.ts file")

const csvtojson = require('csvtojson')
const paths = require('./constants/paths')
const fs = require('fs')
const errLogger = require('./utils/utils')

const logger = fs.createWriteStream(paths.TEXT_FILE_PATH)

const convertCSVtoJSONFile = async () => {
    fs.createReadStream(paths.CSV_FILE_PATH)
        .pipe(csvtojson())
        .on('data', (obj) =>  {
            const bookObj = JSON.parse(obj)
            const transformedData = {
                'book': bookObj.Book,
                'author': bookObj.Author,
                'price': bookObj.Price,
            }
            logger.write(JSON.stringify(transformedData) + "\r\n")
        })
        .on('error', errLogger);
}

convertCSVtoJSONFile()