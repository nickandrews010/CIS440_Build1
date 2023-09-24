proteingoal = 100; 

let progressChart;
const ormData = {
  protein: [],
  carbs: [],
  fat: [],
};

document.getElementById('orm-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const week = event.target.week.value;
  const macro = event.target.macro.value;
  const amount = event.target.amount.value;

  if (!ormData[macro][week]) {
    ormData[macro][week] = amount;
  } else {
    alert('You already have a record on this week.');
    return;
  }

  updateChart();
});


function updateChart() {
  const ctx = document.getElementById('progressChart').getContext('2d');

  if (progressChart) {
    progressChart.destroy();
  }

  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(ormData.protein).map(Number).sort((a, b) => a - b),
      datasets: [ {
        label: 'protein',
        data: Object.values(ormData.protein),
        Color: 'rgba(255, 99, 132, 1)',
      }, {
        label: 'carbs',
        data: Object.values(ormData.carbs),
        Color: 'rgba(255, 206, 86, 1)',
      }, {
        label: 'fat',
        data: Object.values(ormData.fat),
        Color: 'rgba(153, 102, 255, 1)',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  calculatePercentage(); 
}

updateChart();




function calculatePercentage() {
  const totalProtein = Object.values(ormData.protein).reduce((acc, value) => acc + parseFloat(value) || 0, 0);
  const totalCarbs = Object.values(ormData.carbs).reduce((acc, value) => acc + parseFloat(value) || 0, 0);
  const totalFat = Object.values(ormData.fat).reduce((acc, value) => acc + parseFloat(value) || 0, 0);

  const totalMacro = totalProtein + totalCarbs + totalFat;

  const proteinPercentage = (totalProtein / totalMacro) * 100;
  const carbsPercentage = (totalCarbs / totalMacro) * 100;
  const fatPercentage = (totalFat / totalMacro) * 100;

  document.getElementById('proteinPercentage').textContent = `Protein: ${proteinPercentage.toFixed(2)}%`;
  document.getElementById('carbsPercentage').textContent = `Carbs: ${carbsPercentage.toFixed(2)}%`;
  document.getElementById('fatPercentage').textContent = `Fat: ${fatPercentage.toFixed(2)}%`;
}


calculatePercentage();


