var genreBarChart;
var activeUserBarChart;
var upvotedUserBarChart;

$(function () {
    genreBar();
    activeUsersBar();
    upvotedUsersBar();
})

function genreBar() {
    genreBarChart = Highcharts.chart('genre-bar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Most Popular Genres'
        },
        subtitle: {
            text: 'By submission'
        },
        xAxis: {
            categories: ['EDM', 'Rock', 'Metal', 'Pop', 'Indie'],
            title: {
                text: null
            }
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Submissions',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' submissions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Submissions',
            data: [50, 45, 24, 10, 2]
        }]
    });
}

function activeUsersBar() {
    activeUserBarChart = Highcharts.chart('active-users-bar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Most Active Users'
        },
        subtitle: {
            text: 'By submission'
        },
        xAxis: {
            categories: ['User1', 'User2', 'User3', 'User4', 'User5'],
            title: {
                text: null
            }
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Submissions',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' submissions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Submissions',
            data: [50, 45, 24, 10, 2]
        }]
    });
}

function upvotedUsersBar() {
    upvotedUserBarChart = Highcharts.chart('upvoted-users-bar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Most Upvoted Users'
        },
        xAxis: {
            categories: ['User1', 'User2', 'User3', 'User4', 'User5'],
            title: {
                text: null
            }
        },
        legend: {
            enabled: false,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Upvotes',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' upvotes'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Upvotes',
            data: [50, 45, 24, 10, 2]
        }]
    });
}