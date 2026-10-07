import {sculptureList} from './data'
import { useState } from 'react';
import './App.css'
import Gallery from './image'
import { createRoot } from 'react-dom/client';
import ImePrezime from './fullname';
import {initialTravelPlan} from './places'
import { foods, filterItems } from './set.jsx';


const root = createRoot(document.getElementById('root'))
root.render(<Image />);

function Toolbar ({onPLayMovie,onUploadImage}){
  return(
    <div>
      <Button onClick={onPLayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload image
      </Button>
      
    </div>
    
  )
}
function Button({onClick,children}){
  return(
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default function App() {
  const [index,setIndex]=useState(0);
  const[showMore,setShowMore]=useState(false)
  const hasNext = index<sculptureList.length-1;
  function handleNextClick(){
    if(hasNext){
      setIndex(index+1);

    }else{
      setIndex(0);
    }
  }
  function handleMoreClick(){
    setShowMore(!showMore)
  }
  let sculpture=sculptureList[index]
  return (
    <>
    <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    <Counter />
    <br />
     <Toolbar
      onPLayMovie={() => alert('playing')}
      onUploadImage={() => alert('uploading')}
    />
    <br />
    <Form/>
    <Counter2/>
    <Forma />
     <Dugme />
     <Apps />
     <Signup />
     <Gallery />
     <br />
     <Formm />
     <Brojac />
     <Requst/>
     <br />
     <Polja />
     <Prijava />
     <ImePrezime />
     <FilterableList />
     
    
    </>
   
  );
}

function Counter() {
  
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Trenutni broj: {count}</p>
      <button onClick={() => setCount(count + 1)}>Povećaj</button>
    </div>
  );
}
export function Form(){
  const[to,setTo]=useState('alice');
  const [message,setMessage]=useState("hello");
  function handleSubmite(e){
      e.preventDefault();
      setTimeout(()=>{
        alert(`You said ${message} to ${to}`);

      },5000)
  }
  return(
    <form onSubmit={handleSubmite}>
      <label>
        to:{' '}
        <select value={to}
        onChange={e=>setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <br />
      <textarea placeholder='Message' value={message}
      onChange={e=>setMessage(e.target.value)}>
        
      </textarea>
      <br />
      <button type="submit">Send</button>

    </form>

  )
}
export function Counter2(){
  const[score,setScore]=useState(0);
  function increment(){
     setScore(s => s + 1);

  }
  return(
    <>
    <button onClick={()=>increment()}>+1</button>
    <button onClick={()=> {
      increment();
      increment();
      increment();

    }

    }>+3</button>
    <h1>Score:{score}</h1>
    </>
  )
}
export  function Forma() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
// export function Dugme(){

//   return(
//     <button onClick={()=> {
//       alert("klinuo si me");
//     }}>
//       click me
//     </button>
//   )
// }
export function Dugme() {
  return (
    <button onClick={() => {
      alert("klinuo si me");
    }}>
      click me
    </button>
  );
}
function Button2({onSmash,children}){
  return(
    <button onClick={onSmash}>
      {children}
    </button>
  )
}
export function Apps(){
  return(
    <div>
      <Button2 onSmash={()=>alert('playing')}>Play Movie</Button2>
       <Button2 onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button2>
    </div>
  )
}
export  function Signup() {
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      alert('submitting');
    }}>
    
    
    
      <input />
      <button>Send</button>
    </form>
  );
}
export function Formm(){
  const[isSent,setIsSent]=useState(false);
  const[message,setMessage]=useState("Hi");
  if(isSent){
    return <h1>Your message is on the way</h1>
  }
  return(
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      senndMessage(message);

    }}>
      <textarea
      placeholder='Message'
      value={message}
      onChange={e=> setMessage(e.target.value)}>

      </textarea>
    
    <button type='submit'>Send</button>

    </form>
  )
  

}
function senndMessage(message){

}
export  function Brojac(){
  const[number,setNumber]=useState(0);
  return(
    <>
    <h1>{number}</h1>
    <button onClick={()=>{
      setNumber(number+5);
      setNumber(n=>n+1)
    }}>Increase the number by 6</button>

    
    
    
    </>



  )
}
export function Requst(){
  const [pendign,setPending]=useState(0);
  const [completed,setCompleted]=useState(0);

  async function handleClick(){
    setPending(p=> p+1);
    await delay(3000);
    setPending(p=> p-1);
    setCompleted(c=> c+1);
  }
  return(
    <>
    <h3>
      pending:{pendign}
    </h3>
    <h3>
      completed:{completed}
    </h3>
    <button onClick={handleClick}>
      Buy
    </button>
    
    
    
    </>
  )


}
function delay(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  })
}

export function Polja(){
  const[person,setPerson]=useState({
    firstName:"Barbara",
    lastName:"Hepworth",
    email:'barbaraluk@gmail.com'
  });
  function handleFirstNameChange(e){
    setPerson({
      ... person,
      firstName:e.target.value
    })
  }
  function handleLastNameChange(e){
    setPerson({
      ... person,
      lastName:e.target.value
    })
  }
  function handleEmailChange(e){
    setPerson({
      ... person,
      email:e.target.value
    })
  }
  return(
    <>
    <label>
      First name:
      <input 
      onChange={handleFirstNameChange}/>
    </label>
    <label>
      Last name:
      <input value={person.lastName}
      onChange={handleLastNameChange}/>
    </label>
    <label>
      email:
      <input value={person.email}
      onChange={handleEmailChange}/>

    </label>
    <br />
       <div>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </div>

    
    </>
  )
}
export  function Prijava({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
       <form>
      
<textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];
export  function FilterableList() {
  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody> 
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


