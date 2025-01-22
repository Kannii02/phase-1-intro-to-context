function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Test Cases
  if (require.main === module) {
    let employee = createEmployeeRecord(["John", "Doe", "Engineer", 25]);
    console.log("Created Employee Record:");
    console.log(employee);
  
    console.log("\nAdding Time In Event:");
    createTimeInEvent(employee, "2024-01-20 0800");
    console.log(employee);
  
    console.log("\nAdding Time Out Event:");
    createTimeOutEvent(employee, "2024-01-20 1700");
    console.log(employee);
  
    console.log("\nHours Worked:");
    console.log(hoursWorkedOnDate(employee, "2024-01-20")); // Expected: 9
  
    console.log("\nWages Earned:");
    console.log(wagesEarnedOnDate(employee, "2024-01-20")); // Expected: 9 * 25 = 225
  
    console.log("\nAll Wages:");
    console.log(allWagesFor(employee)); // Expected: 225
  
    let employees = createEmployeeRecords([
      ["John", "Doe", "Engineer", 25],
      ["Jane", "Smith", "Manager", 40]
    ]);
  
    createTimeInEvent(employees[0], "2024-01-20 0800");
    createTimeOutEvent(employees[0], "2024-01-20 1700");
    createTimeInEvent(employees[1], "2024-01-20 0900");
    createTimeOutEvent(employees[1], "2024-01-20 1800");
  
    console.log("\nTotal Payroll:");
    console.log(calculatePayroll(employees)); // Should sum up all wages
  }
  
  // Export functions for testing
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  