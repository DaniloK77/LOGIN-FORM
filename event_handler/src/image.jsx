import { useState } from 'react';
import {useImmer} from 'use-immer'

function Image(){
    return(
        <>
         <img src="https://i.imgur.com/ZF6s192.jpg"
             alt="Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower 
             sculpture with reflective petals"   
        
        />
      
        
    
        
        
        </>
    )
       
}
export default function Gallery(){
    return (
        <section>
           {/* <h1>Inspiring Sculptures</h1>  
           <Image />
           <Image />
           <Image />
           <Form />
           <br />
            <Scoreboard />
            <Lista />
            <Lista2 />
            <Formular/> */}
            <Krug />
            <Accordion />



        </section>
        



    )
}
export  function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(x => {
      x.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(x => {
      x.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(x => {
      x.artwork.image = e.target.value;
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
export function Scoreboard(){
    const[player,setPlayer]=useState({
        firstName:"Danilo",
        lastName:"Kovacevic",
        score: 5,
    });

function handlePlusClick(){
    setPlayer({
        ...player,
        score:player.score +1
    })
}
function handleFirstName(){
    setPlayer({
        ...player,
        firstName:e.target.value,
    })
}
function handleLastName(){
    setPlayer({
        ...player,
        lastName:e.target.value
    })
}
return(
    <>
    <label>
        Score:<b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>+1</button>
    </label>
    <label>
        First name:
        <input value={player.firstName} 
        onChange={handleFirstName}></input>

    </label>
    <label>
        Last name:
        <input value={player.lastName} 
        onChange={handleLastName}></input>

    </label>
    
    </>
)
}
let nextid=0;
export function Lista(){
    const [name,setName]=useState(' ');
    const [artists,setArtists]=useState([]);

    return(
        <>
        <h1>Lista skulptura</h1>
        <input value={name}
            onChange={e=> setName(e.target.value)}/>
       <button onClick={() => {
  setArtists([
    ...artists,
    {
      id: nextid++,
      name: name,
    }
  ]);
}}>
  Add
</button>
            <ul>
      {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
            ))}

            </ul>    
        
        
        
        </>
    )
}
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export  function Lista2() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Formular(){
  const [answer,setAnswer]=useState('');
  const [error,setError]=useState(null);
  const [status,setStatus]=useState('typing');

if(status === 'success'){
  return <h1>Thats good answer</h1>
}
async function HandleSubmit(e){
  e.preventDefault();
  setStatus('submitting');
  try{
    await submitForm(answer);
    setStatus('success');

  }catch(err){
    setStatus('typing');
    setError(err)
  }
}
function handleTextAreaChange(e){
  setAnswer(e.target.value);
}
return(
  <>
  <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
  <form
  onSubmit={HandleSubmit}>
    <textarea value={answer}
              onChange={handleTextAreaChange}
              disabled={status === 'submitting'}></textarea>
    <br />
    <button disabled={
      answer.length === 0 || status === 'submitting'
    }>Submit</button>
    {error !=null && <p className="Error"> {error.message}</p>}
  </form>
  

  </>
)
}
function submitForm(answer){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let greska=answer.toLowerCase() !== 'lima'
      if(greska){
        reject(new Error('goood guess but a wrong answer,Try again pls!'));

      }else{
        resolve()
      }
    },1500);
  })
}
export function Krug(){
  const[position,setPosition]=useState({
    x:0,
    y:0
  });
  return(
    <div onPointerMove={e=> {
      setPosition({
        x:e.clientX,
        y:e.clientY
      });
    }}
    style={{
      position:'relative',
      width:'100vw',
      height:'100vh'
    }}>
    <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
      </div>

  )
}
function Panel({title,children}){
  const [isActive,setIsActive]=useState(false);
  return(
    <section className='panel'>
      <h3>{title}</h3>
      {isActive ? (<p>{children}</p>):(<button onClick={()=> setIsActive(true)}>
      Show
      </button>
    )}

    </section>
  )

  
}
export function Accordion(){
    return (
      <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
      
      
      </>
    )
    
  }