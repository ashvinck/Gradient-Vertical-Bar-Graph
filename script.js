// Retrieving the user input from the input field
document.getElementById('InputValue').addEventListener('blur', updateGraph);
document.getElementById('MaxValue').addEventListener('blur', updateGraph);

// Main Function to show the graph and percentage
function updateGraph() {
  const inputValue = parseFloat(document.getElementById('InputValue').value);
  const maxValue = parseFloat(document.getElementById('MaxValue').value);

  const userInputPercent = (inputValue / maxValue) * 100;

  // Validating input
  if (!validateInput(inputValue, maxValue)) {
    return;
  }
  //  show the graph if both inputs are valid
  if (inputValue && maxValue) {
    plotGraph(userInputPercent);
    updatePercentage(userInputPercent);
  }
}

function validateInput(inputValue, maxValue) {
  if (inputValue > maxValue) {
    alert('Input value cannot be greater than Max value');
    return false;
  }
  return true;
}

// Plot the graph
function plotGraph(userInputPercent) {
  let ctx = document.getElementById('myChart').getContext('2d');
  let gradient = ctx.createLinearGradient(0, 0, 0, 300);

  const stopPosition = userInputPercent / 100;
  gradient.addColorStop(1 - stopPosition, '#c2e3ff');
  gradient.addColorStop(1, '#008cff');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Input Value'],
      datasets: [
        {
          data: [userInputPercent],
          backgroundColor: gradient,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          max: [userInputPercent],
          display: false,
        },
        x: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// To update the percentage text under the chart
function updatePercentage(userInputPercent) {
  const percentElement = document.querySelector('.percent');
  percentElement.textContent = userInputPercent + '%';
}
