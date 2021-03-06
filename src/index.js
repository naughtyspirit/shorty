var Querystring = require('querystring')
var Request = require('request-promise')

var Shortlify = function(api_key) {
    this.config = {
        apiKey: api_key,
        url: "https://api-ssl.bitly.com/v3/user/link_save?"
    };

    return this;
};

Shortlify.prototype.getShortLink = function* getShortLink(link) {
    var query = Querystring.stringify({
        access_token: this.config.apiKey,
        longUrl: link
    })
    var options = {
        uri: this.config.url + query,
        method: "GET"
    }
    var result = JSON.parse(yield Request(options))
    if(result.status_code == 304 || result.status_code == 200) {
        return result.data.link_save.link
    }

    return null
}

module.exports = Shortlify
