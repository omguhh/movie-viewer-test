/**
 * Created by yasmi on 2/28/2018.
 */


(function(window, apiService){

    var detailsController = {

        apiService: apiService,

        elements: {
            overviewContainer: document.getElementById("overview")
        },

        //hardcoded
        config: {
            url: 'http://www.omdbapi.com/?t=the+secret+life+of+pets&plot=full&apikey=65403495'
        },

        setEvents: function() {
            var castLinks = document.getElementsByClassName("transitionLink");
            window.addEventListener("scroll", this.handleScroll.bind(this));
            this.showMovieDetails.bind(this);
            for(var i=0; i< castLinks.length; i++) {
                castLinks[i].addEventListener("click", detailsController.pageTransition.bind(this));
            }
            document.getElementById("resetToHome").addEventListener("click", this.resetTransitionState.bind(this));
        },

        init: function () {
            this.showMovieDetails();
            this.setEvents();
            this.resetTransitionState();
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
                        runtime: data.Runtime,
                        boxOffice:data.BoxOffice,
                        directors:data.Director,
                        initialRelease:data.Released
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
        },
        
        pageTransition:function (event) {
            event.preventDefault();
            var eventTarget = event.target.getAttribute("data-target");
            var linkElement = event.target;

            var screenSize = window.matchMedia("(min-width: 768px)");

            if (screenSize.matches) {
                this.showModal();
            } else {
                this.togglePageState(eventTarget,linkElement);
            }
        },

        resetTransitionState:function () {
            var overviewPage = document.getElementById("overview");
            var inactivePages = document.querySelectorAll('[data-active]');
            var modal = document.getElementsByClassName("modal-window")[0];

            inactivePages.forEach(function(element) {
                element.style.display = 'none';
                element.setAttribute("data-active", "false");
            });
            this.shouldHideHeader("overview");
            overviewPage.style.display = 'block';
            overviewPage.setAttribute("data-active", "true");

            modal.style.opacity = 0;
        },
        
        togglePageState: function (pageTarget,linkElement) {
            var pages = document.querySelectorAll('[data-active]');
            var targetElement = document.getElementById(pageTarget);
            var currentlyActiveElement = document.querySelectorAll('[data-active=true]')[0];
            currentlyActiveElement.classList.add("animated", "fadeOutLeft");
            pages.forEach(function(element) {
                element.classList.remove('movie-details__nav__item--active');
                targetElement.setAttribute("data-active", "false");
                currentlyActiveElement.classList.remove("animated", "fadeOutRight","fadeInRight","fadeOutLeft");
                element.style.display = 'none';
            });
            var links = document.querySelectorAll('[data-target]');
            links.forEach(function(link) {
                link.parentNode.classList.remove('movie-details__nav__item--active');
            });

            this.shouldHideHeader(pageTarget);

            targetElement.setAttribute("data-active", "true");
            targetElement.classList.add("animated", "fadeInLeft");
            targetElement.style.display = 'block';

            linkElement.parentNode.classList.add('movie-details__nav__item--active');
        },

        shouldHideHeader: function (target) {
            var movieDetailsHeader = document.getElementById("moviePageHeader");
            if(target == 'cast-details') {
                movieDetailsHeader.style.display = 'none';
            } else {
                movieDetailsHeader.style.display = 'block';
            }
        },

        showModal:function () {
            var modal = document.getElementsByClassName("modal-window")[0];
            var actorsDetailPage = document.getElementById("cast-details");
            modal.style.opacity = 1;
            actorsDetailPage.style.display = 'block';
        }

    };

    window.detailsController = detailsController;

})(window, window.apiService);