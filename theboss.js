'use strict'

const TableStore = require('tablestore')

const instanceName = 'PeopleTable'
const tableName = 'users'

exports.handler = function(event, context, callback) {
    const az = 'ap-southeast-2'
    const creds = context.credentials
    const client = new TableStore.Client({
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.accessKeySecret,
        stsToken: creds.securityToken,
        endpoint: 'http://' + instanceName + '.' + az + '.ots.aliyuncs.com',
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