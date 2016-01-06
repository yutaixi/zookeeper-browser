var zookeeper = require('node-zookeeper-client');  

function new_client(hosts,zk){
    var client = zookeeper.createClient(hosts);  
    client.once('connected', function () {
    console.log('Connected to the server.');
    }); 
    client.connect();
    return client;
};

function ZkClient(hosts){
    this.client=new_client(hosts,this);
}

module.exports.ZkClient=ZkClient