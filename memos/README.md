``` bash

cd move

aptos run test

# Screw the local testnet environment it does not work
aptos node run-local-testnet --with-faucet --with-indexer-api
curl http://localhost:8080/v1
aptos init --network local --profile local
aptos account fund-with-faucet --account local
aptos account fund-with-faucet \
--account local \
--amount 1000000000000000000


aptos move compile --named-addresses transfer_with_memo=local

aptos move test --named-addresses transfer_with_memo=local

# Local
aptos move publish --named-addresses TransferWithMemo=local,minter=local,sender=local --profile devnet
# Testnet
aptos move publish --named-addresses transfer_with_memo=devnet --profile devnet

export LOCAL_ACCOUNT_ADDRESS=290445f040f0e8d5524a7ddd3c456f78455a798b1c52dfafe5ad03ee6de5eb28

echo $LOCAL_ACCOUNT_ADDRESS

curl -X GET http://localhost:8080/v1/accounts/$LOCAL_ACCOUNT_ADDRESS/modules



```

## Publish Stuff

``` bash

aptos init --profile mylocal --network local

aptos account fund-with-faucet --account mylocal

aptos move deploy --profile-gas

aptos move publish --profile mylocal --package-dir . --named-addresses TransferWithMemo=mylocal

aptos move clear-staging-area --profile local
aptos move publish --named-addresses TransferWithMemo=local --chunked-publish

aptos move clear-staging-area --profile local
aptos move publish --profile local --package-dir . --named-addresses transfer_with_memo=local --chunked-publish



aptos init --profile devnet
# type devnet
aptos move publish --named-addresses TransferWithMemo=devnet,minter=devnet,sender=devnet --profile devnet

```

# Devnet
``` bash

aptos init --profile devnet15
# type in devnet

aptos move publish --named-addresses transfer_with_memo=devnet15 --profile devnet15


aptos init --profile devnet16

aptos move run \
  --function-id f39da629e1e8d233b6b9b892a12312a10de4c4f147fc28bcad12568eabbbfef3::transfer_memo::transfer_with_memo \
  --args address:f39da629e1e8d233b6b9b892a12312a10de4c4f147fc28bcad12568eabbbfef3 u64:69420 string:qwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwer1234  --profile mainnet01



# aptos move run \
#   --function-id 44472c42e5ccac189db287aa45a8d8815d9291c9a122f94ec4b3aa28a5c0dfbd::transfer_memo::transfer_with_memo \
#   --args address:b6fee46a74f83572cd78e4319641e177a608b167b405bdb066d415196ddeee73 u64:69420 string:qwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwerqwer1234  --profile devnet4


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq

# 15
curl https://api.devnet.aptoslabs.com/v1/accounts/f39da629e1e8d233b6b9b892a12312a10de4c4f147fc28bcad12568eabbbfef3/transactions \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


# 16
curl https://api.devnet.aptoslabs.com/v1/accounts/eb7c84410d78bc52deff8f932b5a091ab5fd7e251b34dfc662fffdd4f7331e2b/transactions \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq

# Contract Address from 13 Transactions
curl https://api.devnet.aptoslabs.com/v1/accounts/0xf39da629e1e8d233b6b9b892a12312a10de4c4f147fc28bcad12568eabbbfef3/transactions \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq




curl https://api.devnet.aptoslabs.com/v1/accounts/0x44472c42e5ccac189db287aa45a8d8815d9291c9a122f94ec4b3aa28a5c0dfbd/events/44472c42e5ccac189db287aa45a8d8815d9291c9a122f94ec4b3aa28a5c0dfbd:: \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


```


``` JSON

Transaction submitted: https://explorer.aptoslabs.com/txn/0x8a997ed58d51bce8d89a4f07e9c215945ece43b467993e5f6d9410a4792f75cd?network=devnet
{
  "Result": {
    "transaction_hash": "0x8a997ed58d51bce8d89a4f07e9c215945ece43b467993e5f6d9410a4792f75cd",
    "gas_used": 2099,
    "gas_unit_price": 100,
    "sender": "81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1747377952339522,
    "version": 46582026,
    "vm_status": "Executed successfully"
  }
}





https://{rest_server_api}/account/{address}/transactions?start={sequence_number}&limit=1

```

``` bash

curl https://api.devnet.aptoslabs.com/v1/accounts/0x1/resources \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG"


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/resources \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/events/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765::transfer_memo::TransferEvent/0x0 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq




# https://aptos.dev/en/build/apis/fullnode-rest-api-reference#tag/events
# /accounts/{address}/events/{creation_number}


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/events/1 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/events/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765::transfer_memo::TransferEvent/1/data \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/resources \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/accounts/0x0/events/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765::transfer_memo::TransferEvent/2/memo \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/events/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765::transfer_memo::TransferEvent?start=0&limit=1 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq


curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq





curl https://api.devnet.aptoslabs.com/v1/accounts/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765/events/0x81b140fba1654b57c284211e76cbadeaea07b08714c24efcfeaea5be43905765::transfer_memo::TransferEvent \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq



curl https://api.devnet.aptoslabs.com/v1/accounts/0xfd652628617d019db8376c17ee3f0fd7f9c0da1901094104485d03da48fd6243 \
-H "Authorization: Bearer aptoslabs_UaVMkCipWm_KqxJL5YJTK2wAJ99f7BqqcrxM88MVXRYG" | jq

```



# Sources

* [String generator - Generate random string online](https://generate-random.org/string-generator)
