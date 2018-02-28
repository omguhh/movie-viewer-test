/**
 * Created by yasmi on 2/28/2018.
 */


(function(window, apiService){

    var detailsController = {

        apiService: apiService,

        elements: {

        },

        //hardcoded
        config: {
            url: 'http://www.omdbapi.com/?t=the+secret+life+of+pets&plot=full&apikey=65403495'
        },


        setEvents: function() {
            window.addEventListener("scroll", this.handleScroll.bind(this));
            this.showMovieDetails.bind(this);
        },

        init: function () {
            this.showMovieDetails();
            this.setEvents();
        },

        showMovieDetails: function () {
            var template = document.querySelectorAll('#movieDetails')[0].text;
            var movieContainer =  document.querySelectorAll('#movieDetailsContainer')[0];

            var movieData = this.apiService.retrieveMovie(this.config.url,function(data) {
                var renderedTemplate = detailsController.parseTemplate(
                    template,
                    {
                        synopsis: data.Plot,
                        poster: data.Poster,
                        movieTitle: data.Title,
                        imdbRating: data.Ratings[0].Value,
                        rottenTomatoesRating: data.Ratings[1].Value,
                        releaseYear: data.Year,
                        genre: data.Genre,
                        runtime: data.Runtime
                    }
                );

                movieContainer.insertAdjacentHTML('afterbegin', renderedTemplate);

            });
        },

        parseTemplate: function(template, data) {

            var variablePlaceholder = /\{\S+\}/g;

            var rendered = template.replace(variablePlaceholder, function(match){

                var variableName = match.substr(1, match.length-2);

                var value = data[variableName];

                return value;

            });

            return rendered;

        },

        handleScroll: function () {

            var menu = document.querySelectorAll('.mobile-only.movie-details__nav')[0];

            if (window.scrollY > 60) {
                menu.classList.add('fixed');
            }
            else {
                menu.classList.remove('fixed');
            }
        }

    };

    window.detailsController = detailsController;

})(window, window.apiService);