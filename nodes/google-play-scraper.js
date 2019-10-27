module.exports = function(RED) {
    
    let scraper = require('google-play-scraper');

    function GooglePlayScraper(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            
            // convert to upper case
            node.status({ fill : "blue", shape : "dot", text : "fetching..." });

            this.appId = config.appId;
            this.lang = config.lang;
            this.country = config.country;

            scraper.app(
                {
                    appId : this.appId,
                    lang : this.lang,
                    country : this.country
                })
            .then((result) => {
                msg.payload = result;
                node.status({ fill : "green", shape : "dot", text : "fetch success" });
                node.send(msg);
                return;
            })
            .catch((error) => {
                msg.payload = error;
                node.status({ fill : "red", shape : "ring", text : "fetch failed" });
                node.send(msg);
                return;
            })
            
        });
    }

    RED.nodes.registerType("google-play-scraper", GooglePlayScraper);
}