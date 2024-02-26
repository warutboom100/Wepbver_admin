import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from './Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['00.00', '04.00', '08.00', '12.00', '16.00', '20.00'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'จำนวนภารกิจ',
            data: labels.map(() => { return Math.random() * 10 + 50 }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'ระยะทางการเคลื่อนย้าย',
            data: labels.map(() => { return Math.random() * 10 + 30 }),
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
          {
            label: 'เวลาทำงาน',
            data: labels.map(() => { return Math.random() * 10 + 40 }),
            backgroundColor: 'rgba(255, 162 135, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"สถิติการทำงานรายวัน"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart