const {input} = require('./data.json');

// For example, consider just the first seven characters of FBFBBFFRLR:
// 
// Start by considering the whole range, rows 0 through 127.
// F means to take the lower half, keeping rows 0 through 63.
// B means to take the upper half, keeping rows 32 through 63.
// F means to take the lower half, keeping rows 32 through 47.
// B means to take the upper half, keeping rows 40 through 47.
// B keeps rows 44 through 47.
// F keeps rows 44 through 45.
// The final F keeps the lower of the two, row 44.
// The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.
// 
// For example, consider just the last 3 characters of FBFBBFFRLR:
// 
// Start by considering the whole range, columns 0 through 7.
// R means to take the upper half, keeping columns 4 through 7.
// L means to take the lower half, keeping columns 4 through 5.
// The final R keeps the upper of the two, column 5.

const bigMax = 127;
const littleMax = 7;

const processRow = (row, index, top, bottom) => {
    if (index === row.length){
       if(row[index] === 'F'){
           return bottom;
       }  else {
           return top;
       }
    }
    
    // End of base case;
    if(row[index] === 'F'){
        const newTop = Math.floor((top + bottom) / 2);
        return processRow(row, index + 1, newTop, bottom)
    } else {
        const newBottom = Math.ceil((top + bottom) / 2);
        return processRow(row, index + 1, top, newBottom)
    }

}

const processCol = (col, index, top, bottom) => {
    if (index === col.length){
       if(col[index] === 'L'){
           return bottom;
       }  else {
           return top;
       }
    }
    
    // End of base case;
    if(col[index] === 'L'){
        const newTop = Math.floor((top + bottom) / 2);
        return processCol(col, index + 1, newTop, bottom)
    } else {
        const newBottom = Math.ceil((top + bottom) / 2);
        return processCol(col, index + 1, top, newBottom)
    }

}



const processBoardingPass = boardingPass => {
    const [rowData, colData] = [boardingPass.slice(0, 7), boardingPass.slice(7)]
    const row = processRow(rowData, 0, bigMax, 0)
    const col = processCol(colData, 0, littleMax, 0)
    
    // seat ID: multiply the row by 8, then add the column.
    return row * 8 + col;
}

const boardingPassIDs = input.map(processBoardingPass)

const largestBoardingID = boardingPassIDs.sort((a, b) => a - b).pop();
console.log('DEBUG:: largestBoardingID is', largestBoardingID);

// Find my seat

const checkSeat = (ids, currentSeat = 0, nextSeat = 1) => {
    // Base case is when there is a gap
    const next = Number(ids[nextSeat]);
    const current = Number(ids[currentSeat]) + 1
    if(next !== current){
        return current
    } else {
        return checkSeat(ids, ++currentSeat, ++nextSeat)
    }

}

console.log('This is it: ', checkSeat(boardingPassIDs));