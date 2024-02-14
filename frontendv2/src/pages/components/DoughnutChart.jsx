import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from './Cards/TitleCard';
import Subtitle from './Typography/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend,
    Tooltip,
    Filler,
    Legend);

    function DoughnutChart({ Donut }) {
      if (!Donut || typeof Donut !== 'object') {
        // Handle the case where Donut is undefined or not an object
        return null;
      }
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      };
    
      const allKeys = Donut.flatMap((obj) => Object.keys(obj));
      const allValues = Donut.flatMap((obj) => Object.values(obj));
    
      if (!allKeys.length || !allValues.length) {
        // Handle the case where allKeys or allValues is empty
        return null;
      }
    
      const backgroundColors = Array.from(
        { length: allKeys.length },
        () =>
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.8)`
      );
    
      const data = {
        labels: allKeys, // Use allKeys as labels
        datasets: [
          {
            label: '# of Orders',
            data: allValues,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map((color) =>
              color.replace('0.8', '1')
            ),
            borderWidth: 1,
          },
        ],
      };
    
      return (
        <TitleCard title={'Orders by Location'}>
          <Doughnut options={options} data={data} />
        </TitleCard>
      );
    }
    
    export default DoughnutChart;