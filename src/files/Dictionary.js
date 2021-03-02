import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import '../App.css'
import Speech from 'react-speech';

function Dictionary() {
  const buttonVariants={
    hover:{
      // scale:[1.1,1,1.1,1,1.1], //keyframes
      scale:1.1,
      color:'white',
          //x y z color
      textShadow:"0px 0px 8px rgb(255,255,255)",
      boxShadow:" 0px 0px 8px rgb(255,255,255)" ,
      transition:{
        // yoyo:10 //10 times or 5
        duration:0.3,
        yoyo:Infinity
      }      
    }
  }
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  
  const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "200px", 
      opacity: 1,
      transition: { delay: 0.5 }
    },
  }

  const speakIt=()=>{
    <Speech text="Welcome nicky " />
  }

  const [words, setWords] = useState([]);
  const [example, setExample] = useState([]);
  const [number, setNumber] = useState(0);
  const [find, setFind] = useState("");
  const [id, setId] = useState("");
  const textInput = useRef();
  const [shouldShow,setShouldShow]=useState(false)
  useEffect(() => {
    fetch(
      `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "095f20fea4msh3c59f3a15a4c116p16ded2jsn1ec7807c32e4",
          "x-rapidapi-host":
            "mashape-community-urban-dictionary.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.list[number].definition);
        setWords(response.list[number].definition);
        setExample(response.list[number].example);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [find, number, id]);
  const handleChange = () => {
    setId(textInput.current.value);
  };
  return (
    <>
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
        delay: 0.5,
      }}
      style={{display:'flex',alignItems:'center',justifyContent:'center' ,flex: 1,height:'120vh',width:'100%',flexDirection:'column',padding:'30px 6rem'}}
    >
      {/* <div style={{position:'absolute',top:'0%',left:'0%',width:'100%'}}>
        <button className='aboutButton' onClick={()=>{
          if(shouldShow){
            setShouldShow(false)
          }else{
            setShouldShow(true)
          }
        }}>About</button>
      </div> */}
      {/* First Section start */}
      <div style={{display:'flex',flex:1,background:'linear-gradient(to right,#6bd7f2,#6b86f2)',height:'50vh',width:'100%',flexDirection:'column',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}>
        <div style={{display:'flex',height:'20vh',width:'100%',alignItems:'flex-start',justifyContent:'center'}}>
          <motion.p style={{textAlign:'center',fontSize:'2rem',color:'white',paddingTop:'10px',textShadow:'lightgray'}}
          initial={{
            x:'-100vw'
          }}
          animate={{
            x:0
          }}
          transition={{
            ease:'easeIn',
            delay:1,
            type:'spring',
            duration:1
          }}
          >Welcome to Dictionary</motion.p>
        </div>
        <div style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <motion.input
          ref={textInput}
          autoCorrect
          className='input'
          placeholder="What would you like to search?"
          spellCheck={false}
          value={find}
          onChange={(e) => setFind(e.target.val)}
        />
        <motion.button onClick={handleChange} className="btn"
        variants={buttonVariants}
        whileHover='hover'
        >
          Search
        </motion.button>
        </div>
      </div>
      {/* Second Section start */}
      {/* border: '1px solid gray', */}
      <div style={{display:'flex',flex:1, height:'90vh',width:'100%',boxShadow: "-10px 30px 70px lightgray",borderBottomRightRadius:'50px',borderBottomLeftRadius:'50px',padding:'20px'}}>

        <div style={{display:'flex',height:'50vh',width:'100%',alignItems:'flex',justifyContent:'center',paddingTop:'20px'}}>
          <div style={{display:'flex',width:'50%',height:'100%',alignItems:'center',justifyContent:'flex-start',flexDirection:'column',overflow:'scroll'}}>
        <h3 style={{ textAlign: "center",color:'#42b3f5' }}>Definition</h3>
          <p style={{ textAlign: "center",color:'gray' }}>{words}</p>
          <Speech text={words} />
          </div>
          <div style={{display:'flex',width:'50%',alignItems:'center',justifyContent:'flex-start',flexDirection:'column',overflow:'scroll'}}>
        <h3 style={{ textAlign: "center",color:'#42b3f5' }}>Example</h3>
          <p style={{ textAlign: "center",color:'gray' }}>{example}</p>
          <Speech text={example} />

          </div>

        </div>

      </div>
      
    </motion.div>
    <div style={{ display:'flex',width:'100%',alignItems:'center',justifyContent:'center',height:'10vh'}}>
      <div style={{display:'flex',width:'50%',alignItems:'center',justifyContent:'center'}}>
    <motion.button 
    whileTap={{
      backgroundColor:'black'
    }}
          className='arrowBtn'
          onClick={() => {
            if (number==0) {
              setNumber(9)
            } else {
              setNumber(number-1)
            }
          }}
          >Previous</motion.button>
    </div>
    <div style={{display:'flex',width:'50%',alignItems:'center',justifyContent:'center'}}>
    <motion.button 
    whileTap={{
      backgroundColor:'black'
    }}
          className='arrowBtn' 
          onClick={() => {
            if (number==9) {
              setNumber(0)
            } else {
              setNumber(number+1)
            }
          }}
    >Next</motion.button>
    </div>
    </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    {shouldShow &&(
    <motion.div className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          drag
        >
          <motion.div className="modal"
            variants={modal}
          >
            <p>Want to make another Pizza?</p>
          </motion.div>
        </motion.div>)
}
</div>
    </>
  );
}

export default Dictionary;
