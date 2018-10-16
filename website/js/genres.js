var sampleSubmission1 = {
    user: "tehpolecat",
    userUrl: "https://www.reddit.com/user/tehpolecat",
    song: "Song Name",
    artist: "Some Artist",
    threadUrl: "https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/",
    threadNum: 47,
    trackUrl: "https://www.youtube.com/"
};
var submissions = [sampleSubmission1, sampleSubmission1, sampleSubmission1]

$(function () {
    params = getParams(window.location.href);
    genre = params['genre'];
    if (!genre) {
        window.location.href = '../index.html';
    };
    $('#genre-title').text(capitalize(genre));
    listSubmissions(submissions);
    popularityLine();
})

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function escape(string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function listSubmissions(submissions) {
    var container = $('#submission-list');
    var source = document.getElementById("submissions-template").innerHTML;
    var template = Handlebars.compile(source);
    for (var i = 0; i < submissions.length; i++) {
        var submission = submissions[i];
        var html = template(submission);
        container.append(html);
    }
}

function popularityLine() {
submissionLineChart = Highcharts.chart('genre-popularity', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Popularity by Thread'
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            headerFormat: '<span style="font-size: 10px">Thread {point.key}</span><br/>',
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'Submissions',
            data: [32, 22, 42, 12, 11, 22, 50, 27, 29, 10, 17, 25]
        }]
    });
}