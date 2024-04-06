import {useState,useEffect} from 'react';

const useFetch = (url) => {
   const [data, setData] = useState(null);
   const [isPending,setIsPending] = useState(true);
   const [error,setError]= useState(null);

   // Fires a function after every render
   // You can use a dependency array, to run any time the dependency value changes
   useEffect(() => {
    const abortCont = new AbortController();


    setTimeout(() =>{
            // once we have data back from fetch, then we get response object
        fetch(url, {signal: abortCont.signal})
            .then(res => {
                // parses json into js object
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            // then method to get data
            .then(data => {
                // update data state with that array
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError'){
                    console.log('fetch aborted')
                } else {
                    setIsPending(false);
                    setError(err.message);
                }                  
            })
    },1000);

    return () => abortCont.abort();
},  [url]);
// render depends on url changing or not
// url is dependency value

    return{data, isPending, error}
}

export default useFetch;