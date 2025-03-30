"use strict";

$(function() {
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

    //Bar Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "電磁閥",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgb(92 235 12 / 70%)"
                },
                {
                    label: "流量控制器",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgb(33 235 22 / 50%)"
                },
                {
                    label: "氣動閥",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgb(22 235 37 / 30%)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });

    //Line Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "使用量",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgb(92 235 12 / 70%)",
                    fill: true
                },
                {
                    label: "總數量",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgb(33 235 22 / 50%)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });
});