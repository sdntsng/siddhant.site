/**
 * Define data for each year
 */
var chartData = { "2003": [
    { "sector": "Tiger numbers are low  ", "size": 19.04761905},
    { "sector": "Blame/ responsibility", "size": 23.80952381},
    { "sector": "Action frame", "size": 23.80952381},
    { "sector": "Political frame", "size": 9.523809524},
    { "sector": "Tiger and man conflict", "size": 4.761904762},
    { "sector": "Tigers are causing their own downfall", "size": 0},
    { "sector": "Others", "size": 19.04761905},
 ],
 "2004": [
    { "sector": "Tiger numbers are low  ", "size": 11.76470588},
    { "sector": "Blame/ responsibility", "size": 23.52941176},
    { "sector": "Action frame", "size": 29.41176471},
    { "sector": "Political frame", "size": 11.76470588},
    { "sector": "Tiger and man conflict", "size": 5.882352941},
    { "sector": "Tigers are causing their own downfall", "size": 0},
    { "sector": "Others", "size": 17.64705882},
 ],
 "2005": [
    { "sector": "Tiger numbers are low  ", "size": 18.81188119},
    { "sector": "Blame/ responsibility", "size": 18.81188119},
    { "sector": "Action frame", "size": 21.78217822},
    { "sector": "Political frame", "size": 17.82178218},
    { "sector": "Tiger and man conflict", "size": 0.99009901},
    { "sector": "Tigers are causing their own downfall", "size": 3.96039604},
    { "sector": "Others", "size": 17.82178218},
 ],
 "2006": [
    { "sector": "Tiger numbers are low  ", "size": 21.05263158},
    { "sector": "Blame/ responsibility", "size": 19.29824561},
    { "sector": "Action frame", "size": 21.05263158},
    { "sector": "Political frame", "size": 17.54385965},
    { "sector": "Tiger and man conflict", "size": 3.50877193},
    { "sector": "Tigers are causing their own downfall", "size": 0},
    { "sector": "Others", "size": 17.54385965},
 ],
 "2007": [
    { "sector": "Tiger numbers are low  ", "size": 17.5},
    { "sector": "Blame/ responsibility", "size": 17.5},
    { "sector": "Action frame", "size": 21.25},
    { "sector": "Political frame", "size": 13.75},
    { "sector": "Tiger and man conflict", "size": 11.25},
    { "sector": "Tigers are causing their own downfall", "size": 5},
    { "sector": "Others", "size": 13.75},
 ],
 "2008": [
    { "sector": "Tiger numbers are low  ", "size": 18.47826087},
    { "sector": "Blame/ responsibility", "size": 16.30434783},
    { "sector": "Action frame", "size": 22.82608696},
    { "sector": "Political frame", "size": 16.30434783},
    { "sector": "Tiger and man conflict", "size": 4.347826087},
    { "sector": "Tigers are causing their own downfall", "size": 3.260869565},
    { "sector": "Others", "size": 18.47826087},
 ],
 "2009": [
    { "sector": "Tiger numbers are low  ", "size": 16.25},
    { "sector": "Blame/ responsibility", "size": 18.75},
    { "sector": "Action frame", "size": 21.875},
    { "sector": "Political frame", "size": 13.75},
    { "sector": "Tiger and man conflict", "size": 8.125},
    { "sector": "Tigers are causing their own downfall", "size": 7.5},
    { "sector": "Others", "size": 13.75},
 ],
 "2010": [
    { "sector": "Tiger numbers are low  ", "size": 14.85714286},
    { "sector": "Blame/ responsibility", "size": 17.14285714},
    { "sector": "Action frame", "size": 20},
    { "sector": "Political frame", "size": 14.85714286},
    { "sector": "Tiger and man conflict", "size": 12},
    { "sector": "Tigers are causing their own downfall", "size": 6.857142857},
    { "sector": "Others", "size": 14.28571429},
 ],
 "2011": [
    { "sector": "Tiger numbers are low  ", "size": 17.89473684},
    { "sector": "Blame/ responsibility", "size": 15.78947368},
    { "sector": "Action frame", "size": 22.63157895},
    { "sector": "Political frame", "size": 10.52631579},
    { "sector": "Tiger and man conflict", "size": 11.05263158},
    { "sector": "Tigers are causing their own downfall", "size": 8.421052632},
    { "sector": "Others", "size": 13.68421053},
 ],
 "2012": [
    { "sector": "Tiger numbers are low  ", "size": 14.77987421},
    { "sector": "Blame/ responsibility", "size": 16.35220126},
    { "sector": "Action frame", "size": 21.69811321},
    { "sector": "Political frame", "size": 13.52201258},
    { "sector": "Tiger and man conflict", "size": 8.490566038},
    { "sector": "Tigers are causing their own downfall", "size": 10.06289308},
    { "sector": "Others", "size": 15.09433962},
 ],
 "2013": [
    { "sector": "Tiger numbers are low  ", "size": 15.40229885},
    { "sector": "Blame/ responsibility", "size": 16.55172414},
    { "sector": "Action frame", "size": 17.93103448},
    { "sector": "Political frame", "size": 13.10344828},
    { "sector": "Tiger and man conflict", "size": 11.49425287},
    { "sector": "Tigers are causing their own downfall", "size": 11.72413793},
    { "sector": "Others", "size": 13.79310345},
 ],
};


/**
 * Create the chart
 */
var currentYear = 2003;
var chart = AmCharts.makeChart( "chartdiv", {
  "type": "pie",
  "theme": "light",
  "dataProvider": [],
  "valueField": "size",
  "titleField": "sector",
  "startDuration": 0,
  "innerRadius": 80,
  "pullOutRadius": 20,
  "marginTop": 30,
  "titles": [{
    "text": "Leading Frame of Story"
  }],
  "allLabels": [{
    "y": "54%",
    "align": "center",
    "size": 25,
    "bold": true,
    "text": "2003",
    "color": "#555"
  }, {
    "y": "49%",
    "align": "center",
    "size": 15,
    "text": "Year",
    "color": "#555"
  }],
  "listeners": [ {
    "event": "init",
    "method": function( e ) {
      var chart = e.chart;

      function getCurrentData() {
        var data = chartData[currentYear];
        currentYear++;
        if (currentYear > 2013)
          currentYear = 2003;
        return data;
      }

      function loop() {
        chart.allLabels[0].text = currentYear;
        var data = getCurrentData();
        chart.animateData( data, {
          duration: 1000,
          complete: function() {
            setTimeout( loop, 3000 );
          }
        } );
      }

      loop();
    }
  } ],
   "export": {
   "enabled": true
  }
} );