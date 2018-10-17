/* global Handlebars, Highcharts*/

const sampleSubmission1 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
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
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 46,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission3 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    song: 'Song Name',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 45,
    trackUrl: 'https://www.youtube.com/',
};

const sampleSubmission4 = {
    user: 'tehpolecat',
    userUrl: 'https://www.reddit.com/user/tehpolecat',
    song: 'Song Name',
    artist: 'Some Artist',
    threadUrl: 'https://www.reddit.com/r/Destiny/comments/9mnr30/the_biweekly_music_sharing_thread_47/',
    threadNum: 44,
    trackUrl: 'https://www.youtube.com/',
};

const submissions = [sampleSubmission1, sampleSubmission2, sampleSubmission1, sampleSubmission3, sampleSubmission3, sampleSubmission2, sampleSubmission2, sampleSubmission1, sampleSubmission3, sampleSubmission4];

// stuff that i will need from the api
const genreJson = {
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
    const genre = params.genre;
    if (!genre) {
        window.location.href = '../index.html';
    }
    $('#genre-title').text(capitalize(genre));
    listSubmissions(genreJson.submissions);
    popularityLine(genreJson.submissions, genreJson.latestThread);
    genrePie(genre, genreJson.genreProportion);
});
