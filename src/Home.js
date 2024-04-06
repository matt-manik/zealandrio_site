import BlogList from './BlogList';
import profilePic from './images/profile.png';
import useFetch from './useFetch';


const Home = () => {
//grab the data and call it blogs
   const {data:blogs,isPending,error} = useFetch('http://localhost:8000/blogs');


   return (
       <div className="home">
           <img src={profilePic} width={250} height={230}/>
           {error && <div>{error}</div>}
           {isPending && <div>Loading...</div>}
           {blogs && <BlogList blogs={blogs} title= "All Blogs" /> }
       </div>
    );
}

export default Home;