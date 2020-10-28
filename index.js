/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Your code here
// ### `createEmployeeRecord`

// * **Argument(s)**
//   * A 4-element Array of a `String`, `String`, `String`, and `Number`
//     corresponding to a first name, family name, title, and pay rate per hour
// * **Returns**
//   * JavaScript `Object` with keys:
//     * `firstName`
//     * `familyName`
//     * `title`
//     * `payPerHour`
//     * `timeInEvents`
//     * `timeOutEvents`
// * **Behavior**
//   * Loads `Array` elements into corresponding `Object` properties.
//     _Additionally_, initialize empty `Array`s on the properties `timeInEvents`
//     and `timeOutEvents`.
let createEmployeeRecord = function(fields){
    let obj = {
        firstName: fields[0],
        familyName: fields[1],
        title: fields[2],
        payPerHour: fields[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}

// ### `createEmployeeRecords`

// * **Argument(s)**
//   * `Array` of `Arrays`
// * **Returns**
//   * `Array` of `Object`s
// * **Behavior**
//   * Converts each nested `Array` into an employee record using
//     `createEmployeeRecord` and accumulates it to a new `Array`
let createEmployeeRecords = function(record) {
    return record.map(function(row){
        return createEmployeeRecord(row)
    })
}

// ### `createTimeInEvent`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date stamp (`"YYYY-MM-DD HHMM"`)
// * **Returns**
//   * The employee record
// * **Behavior**
//   * Add an `Object` with keys to the `timeInEvents` `Array` on the record
//     `Object`:
//     * `type`: Set to `"TimeIn"`
//     * `hour`: Derived from the argument
//     * `date`: Derived from the argument
let createTimeInEvent = function(timestamp){
    let [date, hour] = timestamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

// ### `createTimeOutEvent`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date stamp (`"YYYY-MM-DD HHMM"`)
// * **Returns**
//   * The employee record
// * **Behavior**
//   * Add an `Object` with keys to the `timeOutEvents` `Array` on the record
//     `Object`:
//     * `type`: Set to `"TimeOut"`
//     * `hour`: Derived from the argument
//     * `date`: Derived from the argument
let createTimeOutEvent = function(timestamp){
    let [date, hour] = timestamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

// ### `hoursWorkedOnDate`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Hours worked, an `Integer`
// * **Behavior**
//   * Given a date, find the number of hours elapsed between that date's
//     timeInEvent and timeOutEvent
let hoursWorkedOnDate = function(searchdate){
    let intime = this.timeInEvents.find(s => s.date === searchdate)
    let outtime = this.timeOutEvents.find(s => s.date === searchdate)
    return (outtime.hour - intime.hour)/100
}

// ### `wagesEarnedOnDate`

// * **Argument(s)**
//   * An employee record `Object`
//   * A date of the form `"YYYY-MM-DD"`
// * **Returns**
//   * Pay owed
// * **Behavior**
//   * Using `hoursWorkedOnDate`, multiply the hours by the record's
//     payRate to determine amount owed. Amount should be returned as a number.
let wagesEarnedOnDate = function(searchdate){
    let hours = hoursWorkedOnDate.call(this,searchdate)
    let wages = this.payPerHour
    return hours * wages
}

// ### `allWagesFor`

// * **Argument(s)**
//   * An employee record `Object`
// * **Returns**
//   * Pay owed for all dates
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number. **HINT**: You will need to find the available dates somehow...
// let allWagesFor = function(record){
//     let allDates = record.timeInEvents.map(x => x.date)
//     const totalWages = allDates.reduce(function(total, date){
//         return total + wagesEarnedOnDate(record, date)
//     }, 0)
//     return totalWages
// }

// ### `findEmployeeByFirstName`

// * **Argument(s)**
//   * `srcArray`: Array of employee records
//   * `firstName`: String representing a first name held in an employee record
// * **Returns**
//   * Matching record or `undefined`
// * **Behavior**
//   * Test the `firstName` field for a match with the `firstName` argument
let findEmployeeByFirstName = function(srcArray,firstName){
    return srcArray.find(r => r.firstName === firstName)
}

// ### `calculatePayroll`

// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed to all employees for all dates, as a number
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number.
let calculatePayroll = function(srcArray){
    return srcArray.reduce(function(total, record){
        return total + allWagesFor.call(record)
    }, 0)   
}

