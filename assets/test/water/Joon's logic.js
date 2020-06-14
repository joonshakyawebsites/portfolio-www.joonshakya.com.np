function water(array) {
    var waters = 0;
    var from = 0;
    var result = "";
    var to = 0;
    for(let i = 0; i < array.length; i++) {
        if (!(array[i] >= 0)) {
            return "Please enter a whole number value"
        }
    }
    for(let i = 0; i < array.length - 1; i++) {
        from = i;
        to = i + 1;
        for(var j = i + 1; j < array.length; j++) {
            if (array[j] >= array[from]) {
                to = j;
                break;
            }
            if (array[j] > array[to]) {
                to = j;
            }
        }
        // console.log(from + " " + to);
        min = Math.min(array[from], array[to]);
        for(let k = from; k < to; k++) {
            if (min > array[k+1]) {
                waters += min - array[k+1];
                // console.log(min - array[k+1]);
            }
        }
        i = to - 1;
    }
    result = "Input:  [" + array + "]" + " <br>\nOutput: " + waters
    return result;
}

// water([4, 2, 3, 2, 4, "HI"]);
// "Please enter a whole number value"

// water([4, 2, 3, 2, -1, 5]);
// "Please enter a whole number value"

// water([4, 2, 3, 2, 4, 5]);
// 5

// water([10, 7, 9, 11, 5, 11]);
// 10

// water([10, 0, 10, 0, 10, 0]);
// 20

// water([2, 10, 2]);
// 0

// water([23, 0, 12])
// 12

// water([12, 0, 13])
// 12

// water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
// 6

