import React, { useState, useEffect } from 'react';
import { collection, getDocs, db } from '../Config/C';

function CollapsibleExample() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'blog'));
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(data);
            setOptions(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
     
   return(
    <div>
      <h1>jhgh</h1>
 <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <ul key={options.id}>
          <option key={option.id} value={option.id}>
            {option.cat} {/* Replace "name" with the field you want to display */}
          </option>
          </ul>
        ))}
      </select>
    </div>
   )
}

export default CollapsibleExample;




// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';

// function MyComponent() {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//     console.log('Selected Option:', e.target.value);
//   };

//   return (
//     <div className="form-group">
//       <label htmlFor="">Select</label>
//       <div className="input-group">
//         <Form.Select
//           value={selectedOption}
//           onChange={handleOptionChange}
//           className="form-control m-3"
//         >
//           <option>Food blogs.</option>
//           <option>Travel blogs.</option>
//           <option>Health and fitness blogs.</option>
//           <option>Lifestyle blogs.</option>
//           <option>Personal blogs.</option>
//         </Form.Select>
//       </div>
//     </div>
//   );
// }

// export default MyComponent;
