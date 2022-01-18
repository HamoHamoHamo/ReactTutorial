import axios from "axios";
const ACCESS_TOKEN = 0;

function App() {
  const dataToSubmit = {
    username : "test",
    password: "tlsxoghks123",
  };
  const post = axios.post('http://127.0.0.1:8000/accounts/login/', dataToSubmit).then((response) => {
    const ACCESS_TOKEN = response.data.access_token
    console.log("ACCESS_TOKEN",ACCESS_TOKEN)
    axios.get('http://127.0.0.1:8000/accounts/user/', {
      headers: {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      }
    }).then((response) => {
      console.log("RESPONSE",response.data)
    })
    .catch((response) =>{
      console.log("FAIL", response);
    });
  });


  
  


  return (
    <div>
      <span>adsfs</span>
    </div>
    
  );
}

export default App;
