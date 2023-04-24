import { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';

const Table2 = ()=> {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/Q2');
      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
  <>
    <div>
      <h2>
        2.Male Users which have phone price greater than 10,000.
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
                <th>ID</th>
                <th>Fast_Name</th>
                <th>Last_Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Income</th>
                <th>City</th>
                <th>Car</th>
                <th>Quote</th>
                <th>Phone_Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.income}</td>
                  <td>{user.city}</td>
                  <td>{user.car}</td>
                  <td>{user.quote}</td>
                  <td>{user.phone_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Table2;
