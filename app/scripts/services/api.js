
(function(window){

    var apiService = {

        retrieveMovie: function (config, callback) {

            var request = new XMLHttpRequest();

            //synchronous because we need the template to be ready to attach events, promises would have been nice here :(
            request.open('GET', config, false);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var resp = JSON.parse(request.responseText);
                    var parseResponse = apiService.parseResponse(resp);
                    callback(parseResponse);
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

        //tiny details to make the response easier to use
        parseResponse: function (response) {
            var actorsArray = response.Actors.split(',');
            response.Actors = actorsArray;

            var imageResizing = response.Poster.replace(/SX300/,"SX500");
            response.Poster = imageResizing;

            return response;
        }

    };

    window.apiService = apiService;

})(window);