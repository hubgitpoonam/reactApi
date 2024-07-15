import React from 'react'
import { useEffect,useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import "./FetchApi.css"
const FetchApi = () =>{
    const [records,setRecords] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if(!response.ok){
                console.log("API's response is not working")
            }
            return response.json()
        })
        .then(data=>{

            if(data.length === 0){
                console.log("No data")
            }
            else{
                setRecords(data);
            }
        })
        
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
         <div className='input-wrapper'>
            <FaSearch id="search-icon"/>
         <input
            onChange={handleChange}
            type="search"
            placeholder="Search..."
            value={search}
        />
         </div>
         {records.length===0 ? (<p>No data in api</p>):(

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
            {filteredRecords.map((item) => (
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
         )}
        
    </div>
    
  )
}

export default FetchApi