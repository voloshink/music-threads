var genreBarChart;

$(function () {
    genreBar();
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