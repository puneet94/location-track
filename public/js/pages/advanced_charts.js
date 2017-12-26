'use strict';
$(document).ready(function() {

    // Just guage charts
    window.onload = function() {
        var gauge1 = new JustGage({
            id: "gauge1",
            relativeGaugeSize: true,
            value: getRandomInt(0, 100),
            min: 0,
            max: 100,
            decimals: 0,
            valueFontFamily: "Source Sans Pro, sans-serif",
            levelColors: ["#4fb7fe"],
            counter: true
        });

        var gauge2 = new JustGage({
            id: "gauge2",
            relativeGaugeSize: true,
            value: getRandomInt(0, 100),
            min: 0,
            max: 100,
            humanFriendly: false,
            valueFontFamily: "Source Sans Pro, sans-serif",
            decimals: 0,
            levelColors: ["#00cc99"],
            counter: true
        });

        var gauge3 = new JustGage({
            id: "gauge3",
            relativeGaugeSize: true,
            value: getRandomInt(0, 100),
            min: 0,
            max: 100,
            valueFontFamily: "Source Sans Pro, sans-serif",
            levelColors: ["#347dff"],
            decimals: 1,
            counter: true
        });

        setInterval(function() {
            gauge1.refresh(getRandomInt(50, 100));
            gauge2.refresh(getRandomInt(50, 100));
            gauge3.refresh(getRandomInt(0, 50));
            gauge4.refresh(getRandomInt(0, 50));
        }, 2500);
    };
    // End of just guage charts

    // stacked area chart
    var chart = c3.generate({
        bindto: '#chart2',
        data: {
            columns: [
                ['data1', 30, 300, 100, 400, 150, 300],
                ['data2', 300, 130, 350, 130, 300, 80]
            ],
            type: 'bar',
            colors: {
                data1: '#0fb0c0',
                data2: '#4fb7fe',
                data3: '#00cc99'
            },
            color: function(color, d) {
                return d.id && d.id === 'data3' ? d3.rgb(color) : color;
            }
        }
    });
    setTimeout(function() {
        chart.transform('area-spline', 'data1');
    }, 1000);

    setTimeout(function() {
        chart.transform('area-spline', 'data2');
    }, 2000);

    setTimeout(function() {
        chart.transform('bar');
    }, 3000);

    setTimeout(function() {
        chart.transform('area-spline');
    }, 4000);
    // End of stacked area chart

    // Scatter plot

    // End of Scatter plot

    // Donut chart


    setTimeout(function() {
        chart1.unload({
            ids: 'data1'
        });
        chart1.unload({
            ids: 'data2'
        });
    }, 2500);
    // End of donut chart

    $(".wrapper").on("resize", function() {
        setTimeout(function() {
            chart.resize();
            chart1.resize();
        }, 500);
    });
});
