import React, { useState ,useEffect} from 'react';
import Axios from "axios";
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router'
const schema = yup.object().shape({
    Companyname: yup.string().required(),
    Clientname:yup.string().required(),
    Email: yup.string().required().email(),
    Phonenumber: yup.string().required().max(10),
    Username: yup.string().required(),
    Password: yup.string().required(), 
});
function Addcustomer(props) {
    var [addmember, setAddmember] = useState('');
    var [addteam, setAddteam] = useState('');
    const Router = useRouter();
    var [showlogo, setShowlogo] = useState('');
    const [show, setShow] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [Logo, setLogo] = useState();
    const[uploadLogo,setUploadLogo] = useState();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;
    const[Adminname,setAdminname]=useState([])
    useEffect(()=>{
        setAdminname(window.localStorage.getItem('user'));
    },[])
    const [Createdby,setCreatedby]=useState()
    useEffect(()=>{
        setCreatedby(Adminname.slice(3, 20));
    })
     console.log(Createdby) 
     var [showlogo, setShowlogo] = useState('');
     const [logovalidate,setLogovalidate]=useState()
     function handleScreenshot(e) {
         console.log(e.target.files[0]);
         setLogovalidate(e.target.files[0]);
         setLogo(e.target.files[0])
         setUploadLogo(URL.createObjectURL(e.target.files[0]))
     }
    const addUser = ({ Companyname,Clientname,Email,Phonenumber,Username,Password }) => {
        if(logovalidate===undefined){
            setShowlogo("images is required")
            console.log("logo is empty")
        }else {
        var today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var fullDate, TimeType, hour, minutes, seconds, fullTime;
    fullDate = new Date();
    hour = fullDate.getHours();
    if (hour <= 11) {
        TimeType = 'AM';
    }
    else {
        TimeType = 'PM';
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour == 0) {
        hour = 12;
    }
    minutes = fullDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes.toString();
    }
    seconds = fullDate.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString()
    console.log(fullTime)
    console.log(date)
    console.log(Logo)
        const data = new FormData();
        data.append("Companyname", Companyname);
        data.append("Clientname", Clientname);
        data.append("Email", Email);
        data.append("Phonenumber", Phonenumber);
        data.append("Username", Username);
        data.append("Password", Password);
        data.append("file", Logo);
        data.append("Createdon",date + ' ' + fullTime);
        data.append("Createdby",Createdby)
        Axios.post(`https://mindmadetech.in/api/customer/new`,data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
                if (response.data.statusCode===400) {
                    setShow(response.data.message)
                } else {
                    setShow("Registered Successfully");
                    Router.reload(window.location.pathname)
                }
            })
        }
    }
    const[login,setLogin]=useState()
    useEffect(() => {
        setLogin(window.localStorage.getItem('loggedin'))
        console.log(login)
        if (login === "false") {
            Router.push("/")
        } else if (login === null) {
            Router.push("/")
        }
      })
return (
        <div>
            <div className="container mainbody">
                <div className="addform">
                    <form>
                        <div className="form-group upload">
                                <label htmlFor="contained-button-file">
                                    <input accept="image/*" id="contained-button-file" className="upload-input-button" multiple type="file" onChange={(e) => handleScreenshot(e)} />
                                    <p className="text-danger mt-3 ml-2">{showlogo}</p>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={uploadLogo}
                                        sx={{ width: 65, height: 65 }}
                                    />                      
                                </label>
                            </div>
                        <div className="form-group">
                            <label className="label">Company Name</label>
                            <input className="form-input" name="Companyname" type="text" {...register('Companyname')} />
                            <p className="me-2 text-danger">{errors.Companyname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="label"> Client Name</label>
                            <input className="form-input" name="Clientname" type="text" {...register('Clientname')} />
                            <p className="me-2 text-danger">{errors.Clientname?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">EMail ID</label>
                            <input className="form-input" name="Email" type="text" {...register('Email')} />
                            <p className="me-2 text-danger">{errors.Email?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Phone Number</label>
                            <input className="form-input" name="Phonenumber" type="text" {...register('Phonenumber')} />
                            <p className="me-2 text-danger">{errors.Phonenumber?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="label">Username</label>
                            <input className="form-input" name="Username" type="text" {...register('Username')} />
                            <p className="me-2 text-danger">{errors.Username?.message}</p>
                        </div>
                        <div className="form-group">
                            <label className="col label">Password</label>
                            <input className="form-input" name="Password" type="password" {...register('Password')} />
                            <p className="me-2 text-danger">{errors.Password?.message}</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className='bottom-area'>
                                <button type="submit" onClick={handleSubmit(addUser)} className="btn2 float-end"> Add {addmember}</button>
                            </div>
                        </div>
                    </form>
                    <h4 className="alert1 text-center">{show}</h4>
                </div>
            </div>
        </div>
    );
}
export default Addcustomer;