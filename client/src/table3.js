import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./url_controller";
import { TailSpin } from 'react-loader-spinner';

const Table3 = ()=> {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_URL}/Q3`);
      setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
  <>
    <div>
      <h2>
        3.Users whose last name starts with "M" and has a quote character length greater than 15 and email includes his/her last name.
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

export default Table3;
