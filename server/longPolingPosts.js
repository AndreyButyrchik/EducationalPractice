let longPolingPosts = (function () {
    let clients = [];

    let subscribe = function (res) {
        clients.push(res);
        res.on('close', function () {
            clients.splice(clients.indexOf(res), 1);
            console.log('del');
            console.log(clients.length);
        });
        console.log(clients.length);
    };

    let clearClients = function () {
        clients = [];
    };

    return {
        clients,
        subscribe,
        clearClients
    }
})();

module.exports = longPolingPosts;