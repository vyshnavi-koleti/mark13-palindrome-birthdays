function getReverse(str) {
    var charList = str.split('');
    var reversedList = charList.reverse();
    return reversedList.join('');
}

function checkPalindrome(str) {
    return (str === getReverse(str));
}

function getDateAsString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;

}

function getAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
    var dateFormatsList = getAllFormats(date);
    var listOfPalindromes = [];
    for (var i = 0; i < dateFormatsList.length; i++) {
        var result = checkPalindrome(dateFormatsList[i]);
        listOfPalindromes.push(result);
    }
    return listOfPalindromes;
}

function isLeapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0)
        return true;
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var flag = 0;

    while (1) {
        flag++;
        var dateStr = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllFormats(dateStr);

        for (var i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [flag, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}


const inputDate = document.querySelector("#input-date");
const btnCheckPalindrome = document.querySelector("#button-check");
const output = document.querySelector("#output");

btnCheckPalindrome.addEventListener('click', clickHandler);

function clickHandler() {

    var inputStr = inputDate.value;

    if (inputStr != '') {
        var date = inputStr.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];
    }

    var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
    }

    var dateStr = getDateAsString(date);
    var list = checkPalindromeForAllFormats(dateStr);
    var isPalindrome = false;

    for (var i = 0; i < list.length; i++) {
        if (list[i]) {
            isPalindrome = true;
            output.innerText = "YAYY! Your birthday is a Palindrome!"
            break;
        }
    }

    if (!isPalindrome) {
        const [days, nextDate] = getNextPalindromeDate(date);
        output.innerText = 'Your birthday is not a palindrome. The nearest palindrome date is on ' + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + ' , after ' + days + ' days.';
    }
}