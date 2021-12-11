import React, {useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import Dashboard from "./navdashboard";
import UserProfile from './userprofile';
import Userissue from "./userissues";
import { withRouter } from "next/router";
import FormDialog from "./dialogsform";
import router from "next/router";

const UserDashboard=(props)=>{
    
    const[user,setUser]=useState([]);
    const [finishStatus, setfinishStatus] = useState(false);
    var userId = props.router.query.name;

  useEffect(()=>{
       fetch(`http://localhost:3001/userlogin/${props.router.query.name}`)
          .then(res => res.json())
          .then(res => setUser(res));
  },[]);
       
	
  const onBackButtonEvent = (e) => {
        e.preventDefault();

        if (!finishStatus) {
            if (window.confirm("Do you want to Logout ?")) {
                setfinishStatus(true)
                // your logic
                router.push("./userLogin")
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setfinishStatus(false)
            }
        }
  }
    
    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
          return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
          };
    }, []);
    
    const onBackButtonEvent3 = () =>{
        router.push("./userLogin")
      }
    return(
          <div>
            <Dashboard 
               logout={onBackButtonEvent3}
                headertext="USER DASHBOARD"
                navcontent={
                    <Typography
                          component="h1"
                          variant="h6"
                          color="inherit"
                          noWrap
                          sx={{ flexGrow: 1 }}
                      >
                        USER Dashboard
                      </Typography>
                      }
                tabbody={
                      <div className="tab-body" maxwidth="lg" sx={{ mt: 4, mb: 4 }}>
                          <div className="tab-content" id="v-pills-tabContent">
                              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                  <Userissue />
                              </div>
                              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                  <UserProfile user={user} userId={userId}/>
                              </div>
                              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                              </div>
                              <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                              </div>
                          </div>
                      </div>
                } />
          </div>  
  )
}
export default withRouter(UserDashboard);