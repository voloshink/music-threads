/* global Highcharts, listSubmissions*/

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
const artistJson = {
    artistName: 'Artist',
    artistId: 2,
    submissions: submissions,
    latestThread: 48,
};

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

function activityBar(subs, latestThread) {
    const data = Array(latestThread).fill(0);

    for (const submission of subs) {
        data[submission.threadNum]++;
    }

    Highcharts.chart('artist-activity', {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Submissions by Thread',
        },
        xAxis: {
            categories: data.map((_, i) => i),
        },
        yAxis: {
            min: 0,
            allowDecimals: false,
            max: 1,
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Submissions',
            data: data,
        }],
    });
}

function genrePie(subs) {
    const genres = {};
    for (const sub of subs) {
        const count = genres[capitalize(sub.genre)];
        if (!count) {
            genres[capitalize(sub.genre)] = 1;
        } else {
            genres[capitalize(sub.genre)]++;
        }
    }

    const data = [];
    for (const [key, value] of Object.entries(genres)) {
        data.push({
            name: key,
            y: value,
        });
    }


    Highcharts.chart('genre-pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        title: {
            text: 'Genre Classification',
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
            data: data,
        }],
    });
}


$(() => {
    const params = getParams(window.location.href);
    const artistId = params.artist;
    if (!artistId) {
        window.location.href = '../index.html';
    }
    // perform a look-up by id to get userJson
    $('#artist-title').text(capitalize(artistJson.artistName));
    $('#submissions').text(artistJson.submissions.length);
    $('[data-toggle="tooltip"]').tooltip();
    listSubmissions('#submission-list', artistJson.submissions);
    activityBar(artistJson.submissions, artistJson.latestThread);
    genrePie(artistJson.submissions);
});
