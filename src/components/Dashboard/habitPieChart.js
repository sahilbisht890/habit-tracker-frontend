import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HabitCompletionChart = ({ completedCount, totalCount }) => {
  const completedPercentage = (completedCount / totalCount) * 100 || 0;
  const incompletePercentage = 100 - completedPercentage;

  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [completedPercentage, incompletePercentage],
        backgroundColor: ["#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#45a049", "#f57c00"],
        borderColor: ["#388E3C", "#F57C00"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true, 
      },
      legend: {
        position: "top", 
      },
    },
  };

  return (
    <div className="w-full sm:w-10/12 md:w-[45%] lg:w-[50%] xl:w-[32%] p-4">
    <Pie data={data} options={options} />
    </div>
  );
};

export default HabitCompletionChart;
