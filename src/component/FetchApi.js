import React from 'react'
import { useEffect,useState } from 'react'
const FetchApi = () =>{
    const [records,setRecords] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setRecords(data))
        
        .catch(err => console.log(err))
    },[])


    const handleChange = (e) => {
        setSearch(e.target.value);
      };

    
    const filteredRecords = records.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toString().includes(search.toLowerCase())
    );
    
  return (
    <div>
         <h2>User Records</h2>
         <input
            onChange={handleChange}
            type="search"
            placeholder="Search..."
            value={search}
        />

         <table>
            
            <thead>
                 <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Company</th>
                </tr>
            </thead>

            <tbody>
            {filteredRecords.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address.city}</td>
                            <td>{item.address.zipcode}</td>
                            <td>{item.company.name}</td>
                        </tr>
                    ))}
            </tbody>
         </table>
       
        
    </div>
  )
}

export default FetchApi