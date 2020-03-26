import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default ()=>{
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
        axios.get('https://randomuser.me/api/?results=200&nat=us').then(res=>{setFilteredData(res.data.results); setData(res.data.results)})
    }, [])

    const handleFilter =(val)=>{
        const lowVal = val.toLowerCase();
        const filtered = data.filter(user=> user.name.first.toLowerCase().includes(lowVal)||
        user.name.last.toLowerCase().includes(lowVal))
        setFilteredData(filtered)
    }

    return(
        <>
        <input onChange={(e)=>handleFilter(e.target.value)}/>
        <h4>Employees</h4>
        <table>
        <thead>
          <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
          </tr>
        </thead>
        <tbody>
            {filteredData.map(user=>
            <tr key={user.id.value}>
            <td><img src={user.picture.thumbnail}/></td>
            <td>{user.name.first} {user.name.last}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
          )}
        </tbody>
      </table>
        </>
    )
}