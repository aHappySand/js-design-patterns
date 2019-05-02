/* CalendarItem interface */
var CalendarItem = new Interface('CalendarItem', ['display']);

/* CalendarYear class, a composite */
var CalendarYear = function(year, parent){
    this.year = year;
    this.element = document.createElement('div');
    this.element.display = 'none';
    parent.appendChild(this.element);

    function isLeapYear(y){
        return (y > 0) && !(y % 4) && ((y % 100)||!(y % 400));
    }

    this.months = [];
    //the number of days in each month
    this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 10, 31, 30, 31, 31, 30, 31, 30, 31];
    for(var i = 0, len = 12; i < len; i++){
        this.months[i] = new CalendarMonth(i, this.numDays[i], this.element);
    }
};
CalendarYear.prototype = {
    display: function(){
        for(var i = 0, len = this.months.length; i < len; i++){
            this.months[i].display();
        }
        this.element.style.display = 'block';
    }
};


/* CalendarMonth class, a composite */
var CalendarMonth = function(monthNum, numDays, parent){
    this.monthNum = monthNum;
    this.element = document.createElement('div');
    this.element.style.display = 'none';
    parent.appendChild(this.element);

    this.days = [];
    for(var i = 0, len = numDays; i < len; i++){
        this.days[i] = new CalendarDay(i, this.element);
    }
};

CalendarMonth.prototype = {
    display: function(){
        for(var i = 0, len = this.days.length; i < len; i++){
            this.days[i].display();
        }
        this.element.style.display = 'block';
    }
};


/* CalendarDay class, a leaf */
var CalendarDay = function(date, parent){
    this.date = date;
    this.element = document.createElement('div');
    this.element.style.display = 'none';

    parent.appendChild(this.element);
};

CalendarDay.prototype = {
    display: function(){
        this.element.style.display = 'block';
        this.element.innerHTML = this.date;
    }
};



