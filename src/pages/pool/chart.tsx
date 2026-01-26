import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

export default function Chart({
  chartTitle,
  maxValue,
  minValue,
  yAxisLabel,
}: {
  chartTitle: string;
  maxValue: number;
  minValue: number;
  yAxisLabel: string;
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu (Jam)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Titik 1",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Titik 2",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Titik 3",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Titik 4",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
      {
        label: "Titik 5",
        data: labels.map(() =>
          faker.number.int({ min: minValue, max: maxValue })
        ),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md m-2 border border-gray-200">
      <Line options={options} data={data} />
    </div>
  );
}
