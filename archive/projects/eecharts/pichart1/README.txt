A Pen created at CodePen.io. You can find this one at https://codepen.io/anon/pen/mxrwYO.

 This demo shows how you can use JavaScript's <code>setTimeout</code> function to update the chart's data dynamically without user intervention, by cycling through sets of data.

It also makes use of our <a href="https://github.com/amcharts/animate">Animate plugin</a>, which makes the transition between data sets smooth and eye-pleasing.

Normally, to update the chart data dynamically, you would update <code>dataProvider</code> and call chart's <code>validateData()</code> method.

Animate plugin introduces a new method <code><a href="https://github.com/amcharts/animate#usage">animateData()</a></code> which takes in new data set and makes a smooth transition between current and new data.

It not only animates values, though. It will also transition colors, opacity and label radius parameter smoothly, if those are in use.