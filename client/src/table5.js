import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import './styles.css';

const Table5 = ()=> {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/Q5');
      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
  <>
    <div>
      <h2>
        5.Show the data of top 10 cities which have the highest number of users and their average income.
      </h2>
    </div>
    <div>
        {isLoading ? (
          <div className="job-details-loader" data-testid="loader">
            <TailSpin color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Number of Users</th>
                <th>Average_Income in Dollers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.count}</td>
                  <td>{user.avgIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>
          // <h1>Hii</h1>
        )}
      </div>
    </>
  );
}

export default Table5;
