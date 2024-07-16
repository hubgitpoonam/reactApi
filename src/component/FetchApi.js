import React from 'react'
import { useEffect,useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import "./FetchApi.css";

 

const FetchApi = () =>{
    const [records,setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [sortDirection, setSortDirection] = useState(0);
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
   
    
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


    //Date 
    const getDateFromID = (id) => {
        const day = id.toString(); 
        return `${month}-${day}-${year}`;
    };

      const handleSortChange = (e) => {
        setSortDirection(e.target.value);
        const sortDirection=setSortDirection(e.target.value);
        const sortId = [...filteredRecords]; 

        sortId.sort((a, b) => {
        return sortDirection === "0" ? a.id - b.id : b.id - a.id;
        });
        setRecords(sortId);
        
      };

      const ascendingId = (e) => {
        setSortDirection(e.target.value);
        const sortDirection=setSortDirection(e.target.value);
        const sortId = [...filteredRecords]; 

        sortId.sort((a, b) => {
        return sortDirection === "0" ? b.id - a.id : a.id - b.id;
        });
        setRecords(sortId);

        
      };
    
    
    const ascendingEvent = () =>{
        let data =[...filteredRecords]
        if(data.length>0){
            let result = data.sort((a,b) => a.name.localeCompare(b.name))
            
            setRecords(result)
        }
    }

    const descendingEvent = () =>{
        let data =[...filteredRecords]
        if(data.length>0){
            let result = data.sort((a,b) => b.name.localeCompare(a.name))
            
            setRecords(result)
        }
    }
    
    const filteredRecords = records.filter(i =>{
        
        const formattedDate = getDateFromID(i.id);
        if (search.trim() === '') {
            return true; 
        }
        return(
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.id.toString().includes(search.toLowerCase())||
            formattedDate.includes(search)
         )
});


    
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

        
         <button defaultValue={sortDirection} onClick={ascendingId}>Ascending</button>
         <button onClick={handleSortChange}>Descending</button>
         {/* {records.length===0 ? (<p>No data in api</p>):( */}

         <table className="tables" >

            
            <thead>
                 <tr className='row'>
                    <th>Id</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Company</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody className='table-body'>
            {/* <select defaultValue={sortDirection} onChange={handleSortChange} >
            <option value={0} onChange={ascendingId}>Asscending</option>
            <option value={1}>Descending</option>
            </select> */}
            
            
            {filteredRecords && filteredRecords.length>0 && filteredRecords !== undefined ? filteredRecords
            //.sort((a,b)=>a.id>b.id ? 1:-1)
            .map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name ? item.name : '-'}</td>
                            <td>{item.address.city ? item.address.city:'-'}</td>
                            <td>{item.address.zipcode ? item.address.zipcode:'-'}</td>
                            <td>{item.company.name ? item.company.name:'-'}</td>
                            <td>{getDateFromID(item.id)}</td>
                        </tr>
                    )):(
                        <tr>
                          <td colSpan="6">No data</td>
                        </tr>
                      )}
            </tbody>
         </table>

         
         {/* )} */}
        

        <button onClick={ascendingEvent}>Sort Ascending</button>
        <button onClick={descendingEvent}>Sort Descending</button>

    </div>
    
  )
}

export default FetchApi