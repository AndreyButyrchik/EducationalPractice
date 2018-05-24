const longPolingPosts = (function longPolingPosts() {
  let clients = [];

  const subscribe = function subscribe(res) {
    clients.push(res);
    res.on('close', () => {
      clients.splice(clients.indexOf(res), 1);
    });
  };

  const clearClients = function clearClients() {
    clients = [];
  };

  return {
    clients,
    subscribe,
    clearClients,
  };
}());

module.exports = longPolingPosts;
