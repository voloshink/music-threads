/* global Handlebars, Highcharts*/

const sampleSubmission1 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    genre: 'Rock',
    song: 'Song Name',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 47,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission2 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    song: 'Song Name',
    genre: 'EDM',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 46,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission3 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    song: 'Song Name',
    genre: 'Pop',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 45,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission4 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    song: 'Song Name',
    genre: 'Hip-hop',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
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

function listSubmissions(subs) {
    const sortedSubmissions = subs.sort((a, b) => a.threadNum < b.threadNum);
    const container = $('#submission-list');
    const source = document.getElementById('submissions-template').innerHTML;
    const template = Handlebars.compile(source);
    for (const submission of sortedSubmissions) {
        const html = template(submission);
        container.append(html);
    }
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
    listSubmissions(artistJson.submissions);
    activityBar(artistJson.submissions, artistJson.latestThread);
    genrePie(artistJson.submissions);
});
