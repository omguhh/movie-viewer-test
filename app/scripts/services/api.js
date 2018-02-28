
(function(window){

    var apiService = {

        retrieveMovie: function (config, callback) {

            var request = new XMLHttpRequest();

            request.open('GET', config, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var resp = JSON.parse(request.responseText);
                    callback(resp);
                } else {
                    console.log(request.response);
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                console.log("Something's wrong here");
            };

            request.send();

        },

        parseResponse: function (response) {

            return response;
        }

    };

    window.apiService = apiService;

})(window);