"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRentalHour = void 0;
const getRentalHour = (startTime, returnTime) => {
    const startTimeStamps = startTime.getTime();
    const returnTimeStamps = returnTime.getTime();
    return returnTimeStamps - startTimeStamps;
};
exports.getRentalHour = getRentalHour;
