# nextjs-demo

## Uitgangspunten

 * Browser-state bewaren, maar na sluiten van de browser-tab moet de state opgeruimd zijn. -> sessionStorage
 * De authenticatie moet wel bewaard worden, ook na het sluiten van de browser (JWT-token) -> localStorage
 * De applicatie moet te 'bookmarken' zijn. Het huidige dashboad inclusief de geopende module.
 * Zoveel mogelijk 'pretty-url' (in de adresbalk) en zo weinig mogelijk info voor hackers. -> mogelijk een url genereren en bewaren in db/cache (redis?)
 * Meerdere dashboards tegelijk open, (natuurlijk) een zichtbaar.

## Security
* https cookie
* securing tokens (refresh token en auth jwt token) where to save
   => refreshToken in httpOnly cookie
   => authToken in redux store
* sanatize input (redirect url)
























## Metrics
└─ $ ▶ loadtest -t 20 -c 20 --rps 550 http://localhost/home
[Mon Jul 02 2018 21:11:58 GMT+0200 (Central European Summer Time)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Mon Jul 02 2018 21:12:03 GMT+0200 (Central European Summer Time)] INFO Requests: 2452, requests per second: 491, mean latency: 19.9 ms
[Mon Jul 02 2018 21:12:08 GMT+0200 (Central European Summer Time)] INFO Requests: 5205, requests per second: 550, mean latency: 13.3 ms
[Mon Jul 02 2018 21:12:13 GMT+0200 (Central European Summer Time)] INFO Requests: 7927, requests per second: 545, mean latency: 13.9 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Target URL:          http://localhost/home
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Max time (s):        20
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Concurrency level:   20
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Agent:               none
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Requests per second: 550
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Completed requests:  10702
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Total errors:        0
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Total time:          20.001603599 s
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Requests per second: 535
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Mean latency:        18.1 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO Percentage of the requests served within a certain time
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO   50%      12 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO   90%      38 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO   95%      55 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO   99%      104 ms
[Mon Jul 02 2018 21:12:18 GMT+0200 (Central European Summer Time)] INFO  100%      216 ms (longest request)



└─ $ ▶ loadtest -t 20 -c 20 --rps 310 http://localhost/caseload
[Mon Jul 02 2018 21:18:11 GMT+0200 (Central European Summer Time)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Mon Jul 02 2018 21:18:16 GMT+0200 (Central European Summer Time)] INFO Requests: 1378, requests per second: 276, mean latency: 74.2 ms
[Mon Jul 02 2018 21:18:21 GMT+0200 (Central European Summer Time)] INFO Requests: 2927, requests per second: 310, mean latency: 80.5 ms
[Mon Jul 02 2018 21:18:26 GMT+0200 (Central European Summer Time)] INFO Requests: 4479, requests per second: 310, mean latency: 59 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Target URL:          http://localhost/caseload
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Max time (s):        20
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Concurrency level:   20
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Agent:               none
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Requests per second: 310
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Completed requests:  6027
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Total errors:        0
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Total time:          20.00416481 s
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Requests per second: 301
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Mean latency:        62.2 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO 
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO Percentage of the requests served within a certain time
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO   50%      55 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO   90%      105 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO   95%      121 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO   99%      148 ms
[Mon Jul 02 2018 21:18:31 GMT+0200 (Central European Summer Time)] INFO  100%      184 ms (longest request)




