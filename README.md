# zookeeper browser

 

*zookeeper browser* is a web ui tool that help you manage zookeeper easier.

## What does this zookeeper browser looks like?
 

## How to make it run ?
First you need to install nodejs(v4.2.4) ,the copy the zookeeper browser releases to your computer,start it from zookeeper-browser/bin/www,
you can change the zookeeper server host and port by export the environment variable ZK_HOST ,eg. `export ZK_HOST="localhost:2181" `, also you can modify the file zookeeper-browser/routes/index.js
`var zkHost = process.env.ZK_HOST || 'localhost:2181' `



## Contributing

- Your favourite command isn't covered?
- You can think of more examples for an existing command?

Contributions are most welcome!
 
 
