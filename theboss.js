'use strict'

const TableStore = require('tablestore')

const instanceName = 'HumansTable'
const tableName = 'users'

exports.handler = function(event, context, callback) {
    const client = new TableStore.Client({
        accessKeyId: context.credentials.accessKeyId,
        secretAccessKey: context.credentials.accessKeySecret,
        stsToken: context.credentials.securityToken,
        endpoint: 'http://' + instanceName + '.' + context.region + '.ots.aliyuncs.com',
        instancename: instanceName,
    })

    const getReq = {
        tableName: tableName,
        primaryKey: [
            {
                id: TableStore.Long.fromNumber(1),
            },
        ],
        maxVersions: 1,
    }

    client.getRow(getReq, function(err, data) {
        if (err) {
            callback(err)
        }

        const response = JSON.stringify({ data })
        const jsonResponse = {
            isBase64Encoded: true,
            statusCode: 200,
            headers: {
                "Content-type": "application/json"
            },
            body: new Buffer(response).toString('base64')
        }

        callback(null, jsonResponse)
    })
}
