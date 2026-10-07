import { useState } from 'react';
export default function ImePrezime(){
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [fullName,setFullName]=useState('');

    function handleFirstNameChange(e){
        setFirstName(e.target.value);
        setFullName(e.target.value + ' ' +lastName)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value);
        setFullName( firstName  + '' + e.target.value )
    }
    return(
        <>
        <h2>Lets check you in</h2>
        <label>
            First Name:{' '}
            <input value={firstName} onChange={handleFirstNameChange}/>

        </label>
        <label>
            Last Name:{' '}
            <input value={lastName} onChange={handleLastNameChange} />‚
        </label>   
        <p>
            Your ticket will be issued to:
            <b>{fullName}</b>
        </p>     
        
        
        
        
        <Meni />
        </>
    )
    
}
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export function Meni(){
      const [items, setItems] = useState(initialItems);
      const [selectedItem, setSelectedItem] = useState(
        items[0]
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}