/* Amplify Params - DO NOT EDIT
	API_GATEWAY_DAOTABLE_ARN
	API_GATEWAY_DAOTABLE_NAME
	API_GATEWAY_GATESTATUSTABLE_ARN
	API_GATEWAY_GATESTATUSTABLE_NAME
	API_GATEWAY_GATETABLE_ARN
	API_GATEWAY_GATETABLE_NAME
	API_GATEWAY_GRAPHQLAPIENDPOINTOUTPUT
	API_GATEWAY_GRAPHQLAPIIDOUTPUT
	API_GATEWAY_GRAPHQLAPIKEYOUTPUT
	API_GATEWAY_KEYTABLE_ARN
	API_GATEWAY_KEYTABLE_NAME
	API_GATEWAY_TASKSTATUSTABLE_ARN
	API_GATEWAY_TASKSTATUSTABLE_NAME
	API_GATEWAY_USERTABLE_ARN
	API_GATEWAY_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /* Amplify Params - DO NOT EDIT
	API_GATEWAY_DAOTABLE_ARN
	API_GATEWAY_DAOTABLE_NAME
	API_GATEWAY_GATETABLE_ARN
	API_GATEWAY_GATETABLE_NAME
	API_GATEWAY_GRAPHQLAPIENDPOINTOUTPUT
	API_GATEWAY_GRAPHQLAPIIDOUTPUT
	API_GATEWAY_GRAPHQLAPIKEYOUTPUT
	API_GATEWAY_KEYTABLE_ARN
	API_GATEWAY_KEYTABLE_NAME
	API_GATEWAY_TASKSTATUSTABLE_ARN
	API_GATEWAY_TASKSTATUSTABLE_NAME
	API_GATEWAY_USERTABLE_ARN
	API_GATEWAY_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const { default: axios } = require('axios')
const {
    createTaskStatus,
    createGateStatus,
    getGateStatus,
    getKey,
    getUser,
    getCompletedKeys,
    getGate,
    markGateAsCompleted,
    removePeopleFromKey,
} = require('/opt/helpers.js')

AWS.config.update({
    region: 'us-east-1',
})

exports.handler = async (event, ctx, callback) => {
    try {
        const { userID, keyID, gateID } = event.arguments

        // 1. get key
        const key = await getKey(keyID)

        // 2. get gate
        const gate = await getGate(key.gateID)

        // 2. get user
        const user = await getUser(userID)

        // 3. get gate status; if doesn't exist, create it
        let gateStatus = await getGateStatus(userID, key.gateID)
        if (!gateStatus) {
            gateStatus = await createGateStatus({
                userID,
                gateID,
            })
        }

        let keysDone = await getCompletedKeys(userID, key.gateID)

        // 4. check if user has interacted with the contract
        const chainID = key.task.chainID
        const scAddress = key.task.address
        const method = key.task.method
        const wallet = user.wallet

        const chain = () => {
            switch (chainID) {
                case 1:
                    return 'ethereum'
                case 44787:
                    return 'celo_alfajores'
                case 62320:
                    return 'celo_baklava'
                case 42220:
                    return 'celo_rc1'
                case 56:
                    return 'bsc'
                case 97:
                    return 'bsc_testnet'
                case 5:
                    return 'goerli'
                case 137:
                    return 'matic'
                case 106:
                    return 'velas'
                case 8217:
                    return 'klaytn'
                case 43114:
                    return 'avalanche'
                default:
                    return 'ethereum'
            }
        }

        // 4.1. connect to BitQuery
        const ENDPOINT = 'https://graphql.bitquery.io/'
        const QUERY = `
			query getContractInteraction($wallet: String!, $scaddress: String!, $method: String!) {
				ethereum(network: ${chain()}) {
					smartContractCalls(
					caller: {is: $wallet}
					${method && "smartContractMethod: {is: $method}" }
					smartContractAddress: {is: $scaddress}
					) {
						smartContractMethod {
							name
						}
					}
				}
			}
		`
        const VARIABLES = {
            wallet: wallet,
            scaddress: scAddress,
            ...(method && { method: method }),
        }

        const res = await axios.post(ENDPOINT, {
            data: {
                query: QUERY,
                variables: VARIABLES,
            },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'BQYTFxjdFDvYNpjzU1echVkLgWLavvpK',
            },
        })

        console.log(res.data)

        const interactions = res.data.data.ethereum.smartContractCalls

        if (interactions.length > 0) {
            // The user interacted with the contract, so task completed
            const item = await createTaskStatus({
                userID,
                keyID,
                gateID,
                completed: true,
            })

            if (!key.unlimited && key.peopleLimit > 0) {
                await removePeopleFromKey(keyID)
            }

            if (keysDone + key.keys >= gate.keysNumber) {
                // Gate completed, update gate status
                await markGateAsCompleted(gateStatus.id)
            }

            return {
                __typename: 'TaskStatus',
                ...item,
            }
        }

        return {
            __typename: 'Error',
            keyID,
            error: 'NO_INTERACTION',
            msg: "User didn't interact with the given method",
        }
    } catch (error) {
        const { keyID } = event.arguments

        console.log(error)

        return {
            __typename: 'Error',
            keyID,
            error: 'UNEXPECTED_ERROR',
            msg: error,
        }
    }
}
