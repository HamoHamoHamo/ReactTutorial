import axios from "axios";

function App() {
  const dataToSubmit = {
    username : "test",
    password: "tlsxoghks123",
  };
  const post = axios.post('http://127.0.0.1:8000/login/', dataToSubmit).then((response) => {
    const { access_token, refresh_token } = response.data
    console.log("ACCESS_TOKEN",access_token, "refresh token", refresh_token)
    axios.get('http://127.0.0.1:8000/accounts/user/', {
      headers: {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${access_token}`
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
