import React from 'react'
import { useEffect,useState } from 'react'
const FetchApi = () =>{
    const [records,setRecords] = useState([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    },[])

  return (
    <div>
         <h2>User Records</h2>
         <table>
            <thead>
                 <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                </tr>
            </thead>

            <tbody>
            {records.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.company.name}</td>
                        </tr>
                    ))}
            </tbody>
         </table>
        {/* <ul>
            {records.map((item,index)=>(
                <li key={index}>
                    {item.id} |{item.name}
                    
                </li>
            ))}
        </ul> */}

        
    </div>
  )
}

export default FetchApi