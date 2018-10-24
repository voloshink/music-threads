/* global Highcharts, Handlebars listSubmissions*/

const sampleSubmission1 = {
    user: 'tehpolecat',
    userId: 10,
    genre: 'Rock',
    genreId: 2,
    artistId: 3,
    song: 'Song Name',
    artist: 'Some Artist',
    threadNum: 47,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission2 = {
    user: 'tehpolecat',
    song: 'Song Name',
    userId: 10,
    genreId: 2,
    genre: 'EDM',
    artistId: 3,
    artist: 'Some Artist',
    threadNum: 46,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission3 = {
    user: 'tehpolecat',
    song: 'Song Name',
    userId: 10,
    genreId: 2,
    genre: 'Pop',
    artistId: 3,
    artist: 'Some Artist',
    threadNum: 45,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission4 = {
    user: 'tehpolecat',
    song: 'Song Name',
    userId: 10,
    genreId: 2,
    artistId: 3,
    genre: 'Hip-hop',
    artist: 'Some Artist',
    threadNum: 44,
    trackUrl: 'https://www.youtube.com/',
};

const submissions = [sampleSubmission1, sampleSubmission2, sampleSubmission1, sampleSubmission3, sampleSubmission3, sampleSubmission2, sampleSubmission2, sampleSubmission1, sampleSubmission3, sampleSubmission4];

// stuff that i will need from the api
const genreJson = {
    genreName: 'rock',
    genreId: 2,
    submissions: submissions,
    latestThread: 48,
    genreProportion: 5,
};

let submissionLineChart;

/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function popularityLine(subs, latestThread) {
    const data = Array(latestThread).fill(0);

    for (const submission of subs) {
        data[submission.threadNum]++;
    }

    submissionLineChart = Highcharts.chart('genre-popularity', {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Popularity by Thread',
        },
        xAxis: {
            categories: data.map((_, i) => i),
        },
        yAxis: {
            allowDecimals: false,
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
                    enabled: true,
                },
                enableMouseTracking: true,
            },
        },
        series: [{
            name: 'Submissions',
            data: data,
        }],
    });
}

function genrePie(genre, proportion) {
    Highcharts.chart('genre-pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Genre Propotion',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                    },
                },
            },
        },
        series: [{
            name: 'Submissions',
            colorByPoint: true,
            data: [{
                name: genre,
                y: proportion,
                sliced: true,
                selected: true,
            }, {
                name: 'Other',
                y: 100 - proportion,
            }],
        }],
    });
}


$(() => {
    const params = getParams(window.location.href);
    const genreId = params.genre;
    if (!genreId) {
        window.location.href = '../index.html';
    }
    // perform a look-up by id to get genreJson
    $('#genre-title').text(capitalize(genreJson.genreName));
    listSubmissions('#submission-list', genreJson.submissions);
    popularityLine(genreJson.submissions, genreJson.latestThread);
    genrePie(capitalize(genreJson.genreName), genreJson.genreProportion);
});
