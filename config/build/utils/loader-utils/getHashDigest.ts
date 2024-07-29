let crypto: any
let BulkUpdateDecorator: any

export default function getHashDigest(
    buffer: string,
    algorithm: string,
    digestType: string,
    maxLength: number,
) {
    const _algorithm = algorithm || 'xxhash64'
    const _maxLength = maxLength || 9999

    if (typeof crypto === 'undefined') {
        /* eslint-disable global-require */
        crypto = require('crypto')

        if (BulkUpdateDecorator === undefined) {
            /* eslint-disable global-require */
            BulkUpdateDecorator = require('./hash/BulkUpdateDecorator')
        }
    }

    const hash = new BulkUpdateDecorator(() => crypto.createHash(_algorithm), _algorithm)

    hash.update(buffer)

    return hash.digest(digestType || 'hex').substr(0, _maxLength)
}
