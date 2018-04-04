var Calendar = function(divId) {

      //Store div id
      this.divId = divId;

      // Days of week, starting on Sunday
      this.DaysOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ];

      // Months, stating on January
      this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];

      // Set the current month, year, date
      var d = new Date();

      this.CurrentMonth = d.getMonth();
      this.CurrentYear = d.getFullYear();
      this.CurrentDate = d.getDate();

    };

    // Goes to next month
    Calendar.prototype.nextMonth = function() {
      if ( this.CurrentMonth == 11 ) {
        this.CurrentMonth = 0;
        this.CurrentYear = this.CurrentYear + 1;
      }
      else {
        this.CurrentMonth = this.CurrentMonth + 1;
      }
      this.showCurrent();
    };

    // Goes to previous month
    Calendar.prototype.previousMonth = function() {
      if ( this.CurrentMonth == 0 ) {
        this.CurrentMonth = 11;
        this.CurrentYear = this.CurrentYear - 1;
      }
      else {
        this.CurrentMonth = this.CurrentMonth - 1;
      }
      this.showCurrent();
    };

    // Show current month
    Calendar.prototype.showCurrent = function() {
      this.showMonth(this.CurrentYear, this.CurrentMonth);
    };

    // Show month (year, month)
    Calendar.prototype.showMonth = function(y, m) {

      var d = new Date()
        // First day of the week in the selected month
        , firstDayOfMonth = new Date(y, m, 1).getDay()
        // Last day of the selected month
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

      // Write selected month and year
      var currentMonth = '' + this.Months[m] + ' ' + y + '';


      // Create table
      var html = '<table>';

      // Write the header of the days of the week
      html += '<tr>';
      for(var i=0; i < this.DaysOfWeek.length;i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
      }
      html += '</tr>';

      // Write the days
      var i=1;
      do {

        var dow = new Date(y, m, i).getDay();

        // If Sunday, start new row
        if ( dow == 0 ) {
          html += '<tr>';
        }
        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if ( i == 1 ) {
          html += '<tr>';
          var k = lastDayOfLastMonth - firstDayOfMonth+1;
          for(var j=0; j < firstDayOfMonth; j++) {
            html += '<td class="not-current">' + k + '</td>';
            k++;
          }
        }

        // Write the current day in the loop and add class to current day
        if (i === this.CurrentDate) {
          html += '<td class="current">' + i + '</td>';
        } else if( i == 13) {
          html += '<td class="event">' + i + '<p class="event-name">Напиться!</p>' + '<p class="event-members">Витя Костин, Пётр Михайлов</p>'+ '</td>';
        } else if( i == 16) {
          html += '<td class="event">' + i + '<p class="event-name">ДР!</p>' + '<p class="event-members">Дима Молодцов</p>'+ '</td>';
        } else {
          html += '<td>' + i + '</td>';
        }
        // html += '<td class="current">' + this.CurrentDate + '</td>';

        // If Saturday, closes the row
        if ( dow == 6 ) {
          html += '</tr>';
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if ( i == lastDateOfMonth ) {
          var k=1;
          for(dow; dow < 6; dow++) {
            html += '<td class="not-current">' + k + '</td>';
            k++;
          }
        }

        i++;
      }while(i <= lastDateOfMonth);

      // Closes table
      html += '</table>';

      // Write HTML to the div
      document.getElementById(this.divId).innerHTML = html;
      document.getElementById('date').innerHTML = currentMonth;
    };

    // On Load of the window
    window.onload = function() {

      // Start calendar
      var c = new Calendar("divCalendar");
      c.showCurrent();

      // Bind next and previous button clicks
      getId('btnNext').onclick = function() {
        c.nextMonth();
      };
      getId('btnPrev').onclick = function() {
        c.previousMonth();
      };
    }

    // Get element by id
    function getId(id) {
      return document.getElementById(id);
    }