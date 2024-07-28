let crypto: any
let BulkUpdateDecorator: any

export default function getHashDigest(
    buffer: string,
    algorithm: string,
    digestType: string,
    maxLength: number,
) {
    algorithm = algorithm || 'xxhash64'
    maxLength = maxLength || 9999

    let hash

    if (typeof crypto === 'undefined') {
        crypto = require('crypto')
        if (BulkUpdateDecorator === undefined) {
            BulkUpdateDecorator = require('./hash/BulkUpdateDecorator')
        }
    }

    hash = new BulkUpdateDecorator(() => crypto.createHash(algorithm), algorithm)

    hash.update(buffer)

    return hash.digest(digestType || 'hex').substr(0, maxLength)
}
