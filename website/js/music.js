/* global Handlebars, Highcharts*/

let genreBarChart;
let submissionLineChart;
let activeUserBarChart;
let upvotedUserBarChart;

function genreBar() {
    genreBarChart = Highcharts.chart('genre-bar', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Most Popular Genres',
        },
        subtitle: {
            text: 'By submission',
        },
        xAxis: {
            categories: ['EDM', 'Rock', 'Metal', 'Pop', 'Indie'],
            title: {
                text: null,
            },
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Submissions',
                align: 'high',
            },
            labels: {
                overflow: 'justify',
            },
        },
        tooltip: {
            valueSuffix: ' submissions',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Submissions',
            data: [50, 45, 24, 10, 2],
        }],
    });
}

function submissionsLine() {
    submissionLineChart = Highcharts.chart('submission-line', {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Thread Stats',
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },
        yAxis: {
            // title: {
            //     text: 'Submissions'
            // }
        },
        legend: {
            enabled: true,
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
            data: [32, 22, 42, 12, 11, 22, 50, 27, 29, 10, 17, 25],
        }, {
            name: 'Views',
            data: [33, 422, 442, 122, 311, 222, 450, 327, 229, 110, 317, 425],
        }],
    });
}

function activeUsersBar() {
    activeUserBarChart = Highcharts.chart('active-users-bar', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Most Active Users',
        },
        subtitle: {
            text: 'By submission',
        },
        xAxis: {
            categories: ['User1', 'User2', 'User3', 'User4', 'User5'],
            title: {
                text: null,
            },
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Submissions',
                align: 'high',
            },
            labels: {
                overflow: 'justify',
            },
        },
        tooltip: {
            valueSuffix: ' submissions',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Submissions',
            data: [50, 45, 24, 10, 2],
        }],
    });
}

function upvotedUsersBar() {
    upvotedUserBarChart = Highcharts.chart('upvoted-users-bar', {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Most Upvoted Users',
        },
        xAxis: {
            categories: ['User1', 'User2', 'User3', 'User4', 'User5'],
            title: {
                text: null,
            },
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Upvotes',
                align: 'high',
            },
            labels: {
                overflow: 'justify',
            },
        },
        tooltip: {
            valueSuffix: ' upvotes',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [{
            name: 'Upvotes',
            data: [50, 45, 24, 10, 2],
        }],
    });
}

$(() => {
    genreBar();
    activeUsersBar();
    upvotedUsersBar();
    submissionsLine();
});
