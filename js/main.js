let primeArray = [];
var colors = ["#3FB8AD", "#EF28C3", "#1D2951", "#6B0E5B", "#455A64", "#6C2B3B", "#A9B0E6", "#EA3045", "#6A7D81", "#B71C1C", "#880E4F", "#00695C", "#F57F17", "#757575", "#FFA000"]
$(document).ready(function() {
    $("#speed").val(400);
    $("#numOfElements").val(100);
    $("#speedVal").html("  <strong>" + 150 + "</strong> ms");
    $("#eratosten").submit(function(e) {
        e.preventDefault();
        n = $("#numOfElements").val();
        if (n < 100 || n == undefined || n > 2000) { // ograniciti gornju granicu
            alert("Unesite broj elemenata, ukoliko niste. \nBroj elemenata mora biti u opsegu od 100 do 2000.");
            $("#numOfElements").val(100);
            return;
        }
        $("#btnStart").html("Simulacija u toku ...");
        $(':input[type="submit"]').prop('disabled', true);
        $("#btnStart").removeClass("btn-primary");
        $("#btnStart").addClass("btn-warning");
        primeArray = [];

        var str = "";
        str += "<div id='0' class='col-1 hiddenBox '></div>"
        for (let index = 2; index <= n; index++) {
            str += "<div id='e" + index + "' class='col-1 box '>" + index + "</div>"
        }

        if (n % 12 != 0) {
            var hiddenDiv = 12 - (n % 12);
            for (let index = 0; index < hiddenDiv; index++) {
                str += "<div class='col-1 hiddenBox '></div>"
            }
        }
        updateProgressBar(0);


        $("#table").html(str);
        var speed = $("#speed").val();
        speed = 500 - speed + 50

        eratosten(n, speed);

    });
    $("#speed").change(function(e) {
        e.preventDefault();
        var curSpeed = 500 - $("#speed").val() + 50
        $("#speedVal").html("  <strong>" + curSpeed + "</strong> ms");
    });

});

var count = 0;
var markCount = 0

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function mark(id, color) {
    // $("#e" + id).css("background-color", "#dc3545");
    // count++;
    markCount++
    // console.log(count);
    $("#e" + id).css("background-color", color);
    $("#e" + id).css("border", "2px solid " + color);
    $("#e" + id).css("color", "white");
    $("#e" + id).css("opacity", 0.3);

    updateProgressBar(markCount / count * 100);
}

function markPrime(id) {
    $("#e" + id).css("background-color", "#28a745");
    $("#e" + id).css("color", "white");
    $("#e" + id).css("border", "2px solid black");
    $("#e" + id).css("z-index", "20");
    markCount++;
    primeArray.push(id);
    var primeNumbers = "Ukupno: <span class='textColCount'>" + primeArray.length + "</span><br>Prosti brojevi: <br><span class='textCol'>"
    if (primeArray.length > 1) {
        for (let index = 0; index < primeArray.length - 1; index++) {
            primeNumbers += primeArray[index] + ", ";

        }

    }
    primeNumbers += primeArray[primeArray.length - 1] + "</span>";
    $("#primeNum").html(primeNumbers);
    console.log(markCount + " -" + count)
    if (markCount == count) {
        $(':input[type="submit"]').prop('disabled', false);
        $("#btnStart").html("Pokreni");
        $("#btnStart").removeClass("btn-warning");
        $("#btnStart").addClass("btn-primary");
    }
    updateProgressBar(markCount / count * 100);


}

function updateProgressBar(value) {
    $('.progress-bar').css('width', value + '%').attr('aria-valuenow', value);
    $("#progressPercentge").html(parseInt(value) + "%");
}

function eratosten(n, speed) {

    count = 0;
    markCount = 0;

    var array = [],
        upperLimit = Math.sqrt(n),
        output = [];

    // Make an array from 2 to (n - 1)
    for (var i = 0; i <= n; i++) {
        array.push(true);
    }
    var wTime = 0;

    // Remove multiples of primes starting from 2, 3, 5,...
    for (var i = 2; i <= upperLimit; i++) {
        color = getRandomColor();

        if (array[i]) {
            wTime++;
            array[i] = false;
            setTimeout(markPrime, wTime * speed, i);
            for (var j = i * i; j <= n; j += i) {
                array[j] = false;
                wTime++
                setTimeout(mark, wTime * speed, j, color);
                count++;
            }
            count++;

        }

    }

    // All array[i] set to true are primes
    for (var i = 2; i < n; i++) {
        if (array[i]) {
            output.push(i);
            wTime++;
            setTimeout(markPrime, wTime * speed, i);
            count++;
        }
    }

    return output;





    // ----------------------------------------


}