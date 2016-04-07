Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

Date.prototype.subtractDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() - days);
  return dat;
};

Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.formatDateFromAggregatedTimeframe = function (aggregatedTimeframe) {
  var removeTime = aggregatedTimeframe.split(" ");
      dateArr = removeTime[0].split("-"),
      date = new Date(dateArr[1] + "-" + dateArr[2] + "-" + dateArr[0]);

  return date;
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.getNumberOfDaysHaveOccurredInMonth = function () {
  var today = new Date(),
      numberOfDays = Date.getDaysInMonth(this.getFullYear(), this.getMonth());

  if(today.getFullYear() == this.getFullYear()){
    if(today.getMonth() == this.getMonth()){
      numberOfDays = today.getDate();
    }
  }

  return numberOfDays;
};

Date.prototype.addMonths = function (months) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + months);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

Date.prototype.subtractMonths = function(months){
  var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() - months);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

Date.prototype.addYears = function(years) {
  var n = this.getDate();
  this.setDate(1);
  this.setFullYear(this.getFullYear() + years);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

Date.prototype.subtractYears = function(years) {
  var n = this.getDate();
  this.setDate(1);
  this.setFullYear(this.getFullYear() - years);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1)/7);
};

Date.prototype.getWeekDates= function(start){
  start= start || 1;
  var today= new Date(this.setHours(0, 0, 0, 0));
  var day= today.getDay() - start;
  if(day == -1){
    var date= today.getDate() - 6;
  } else {
    var date= today.getDate() - day;
  }
  var temp = new Date(today);

  var startday= new Date(temp.setDate(date));
  var endday= new Date(today.setDate(date+ 6));
  return [startday, endday];
};

Date.prototype.getDayOfTheWeekMondayStart = function(){
  var today = new Date(this.setHours(0, 0, 0, 0)),
      day = today.getDay();

  if(day == 0){
    day == 7;
  } else {
    day + 1;
  }

  return day;
};

Date.prototype.getStartWeekDaysInMonth = function(){
  var date = new Date(this.valueOf()),
      month = date.getMonth();
      returnDates = [];
  date.setDate(1);
  returnDates.push(date.getWeekDates()[0]);
  date = date.addDays(7);
  while(date.getWeekDates()[0].getMonth() == month){
    returnDates.push(date.getWeekDates()[0]);
    date = date.addDays(7);
  }
  return returnDates;
};

Date.prototype.formatYYYYMMDD = function(){
   var month, day, year, returnDate;
                    
    month = this.getMonth() + 1,
    day = this.getDate(),
    year = this.getFullYear(),
    returnDate = year;

     if(month < 10){
        month = '0'+month;
    }

    returnDate += "-" + month;

    if(day < 10){
        day = '0'+day;
    }

    returnDate += "-" +day;

    return returnDate;
};

Date.prototype.getNumberOfDaysHaveOccurredInYear = function(){
    var dayOfYear = 365,
        today = new Date();
    if(this.getFullYear() == today.getFullYear()){
      var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      var month = today.getMonth();
      var day = today.getDate();
      dayOfYear = dayCount[month] + day;
      if(month > 1 && today.isLeapYear()) {
        dayOfYear++;
      }
    }

    return dayOfYear;
};