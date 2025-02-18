import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("API Response:", response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error: Could not fetch the list');
      }
    } catch (error) {
      toast.error('Error: Network or server issue');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        setList((prevList) => prevList.filter(item => item._id !== foodId)); // Filter out the removed item
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Error: Unable to remove food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      {list.length === 0 ? (
        <p>No food items available</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div key={item._id} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs.{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
