import React from 'react';
import Header from './header';
import '../bootstrap/pagination.css';
const axios =require('axios');

var sid="",obj={};

export default class Mainpage1 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //  editdata:[],
            fname:"",
            lname:"",
            state:"",
            city:"",
            email:"",
            data1:[],
            curr:1,
            isEditing: false,
            statedata:[],
            citydata:[],
            obj:{}

        };
        axios.get('http://localhost:2222/list').then((success)=>{
            console.log("Data : ",success.data);
            if(!success)
            {
                console.log("No Record Found");
            }
            this.setState({data1:success.data});
            console.log(`Data : ${this.state.data1}`);
        }).catch((e)=>{
            console.log(`Error : ${e.messagee}`);
        });


    }
    componentDidMount(){
        this.getState();
    }

    sortData=()=>{
        axios.get('http://localhost:2222/sortfetch').then((success)=>{
            console.log("Data : ",success.data);
            if(!success)
            {
                console.log("No Record Found");
            }
            this.setState({data1:success.data});
            console.log(`Data : ${this.state.data1}`);
        }).catch((e)=>{
            console.log(`Error : ${e.messagee}`);
        });
    }

    getState=()=>{
        axios.get('http://localhost:2222/getstate').then((state)=>{
            this.setState({statedata:state.data})
        }).catch();

    }

    getCity=(event)=>{
        console.log(event.target.selectedOptions[0].id);
        axios.get(`http://localhost:2222/getcity/${event.target.selectedOptions[0].id}`).then((citynm)=>{
            console.log("City :"+citynm.data);
            this.setState({citydata:citynm.data})
        }).catch();
    }

    saveData=()=>{
        console.log("In save data");
        var f1={
            fname:this.state.fname,
            lname:this.state.lname,
            state:this.state.state,
            city:this.state.city,
            email:this.state.email
        };
        axios.post(
            'http://localhost:2222/add',f1
        ).then((res)=>{
            debugger;
            console.log(`Response ${res.data}`);
            if(!res)
            { console.log("No Record Added");
            }
        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
        console.log("Form Data ::"+this.state.fname,this.state.lname,this.state.state,this.state.city,this.state.email);
    };

    deleteData=(sid)=>{
        console.log(" Data",sid);
        axios.post(
            'http://localhost:2222/del',
            {
                id:sid
            }).then((res)=>{
            console.log(`Response ${res.data}`);

        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
    };

    handleclick=(e)=>{
        this.setState({
           curr:e.target.id

        });
    }

    editdata=()=>{
        axios.post(
            `http://localhost:2222/edit/${this.state.obj.id}`,{
                "fname":document.getElementById('txtfname').value,
                "lname":document.getElementById('txtlname').value,
                "state":document.getElementById('selstate').value,
                "city":document.getElementById('selcity').value,
                "email":document.getElementById('txtemail').value

            }).then((res)=>{
            console.log(`Response ${res.data}`);

        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
    }

    updateData=(e)=>{
        var obj={};
        this.state.data1.map((val)=>{
            if(val._id==e.target.id){
                obj={id:val._id,fname:val.fname,lname:val.lname,state:val.state,city:val.city,email:val.email};
                this.setState({
                    obj:obj
                },()=>{
                    console.log(this.state.obj);
                })
            }
        });

        document.getElementById('txtfname').value=obj.fname;
        document.getElementById('txtlname').value=obj.lname;
        document.getElementById('selstate').value=obj.state;
        document.getElementById('selcity').value=obj.city;
        document.getElementById('txtemail').value=obj.email;

    }

    render(){

        var lastrec=this.state.curr*4;
        var firstrec=lastrec-4;
        var totrec=this.state.data1.slice(firstrec,lastrec);
        var totpg=[];
        for(var i=1;i<=Math.ceil(this.state.data1.length/4);i++){
            totpg.push(i);
        }
        var pageList=totpg.map((p,ind)=>{
            return(
                <li className="page" id={ind+1} key={ind} onClick={this.handleclick}>{p}</li>
            );

        });
        return(
            <section>
                <center>
                <div className="modal-header bg-warning"><Header/></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">

                            <div className="wall">

                                <form className="form-signin" onSubmit={(event)=>{event.preventDefault();}}>
                                    <table align="center" border="1" width="300"  className="table table-striped">
                                        <tbody>
                                        <tr><td><h1 className="text-center login-title" >Fill Data</h1></td></tr>
                                        <tr>
                                            <td>
                                                <input type="text" name="fname" id="txtfname" className="inputtext form-control is-valid" placeholder="First Name" required autoFocus  onChange={this.myhandler}/>
                                            </td>
                                        </tr>
                                        <tr><td>
                                            <input type="text" name="lname" id="txtlname"  className="inputtext form-control is-valid" placeholder="Last Name" required  onChange={this.myhandler}/>
                                        </td>
                                        </tr>
                                        <tr><td>State ::
                                            <select id="selstate" onChange={this.getCity} name="state" className="form-control is-valid">

                                                <option>Select State</option>
                                                {
                                                    this.state.statedata.map((val,ind)=>{
                                                        return (<option key={val._id} id={val._id} value={val.name}>{val.name}</option>)
                                                    })
                                                }</select>
                                        </td></tr>
                                        <tr><td>City ::
                                            <select id="selcity"  name="city" className="form-control is-valid">
                                                <option>Select city</option>
                                                {
                                                    this.state.citydata.map((val,ind)=>{
                                                        return (<option key={val._id}  value={val.name}>{val.name}</option>)
                                                    })
                                                }
                                            </select>
                                        </td></tr>

                                        <tr><td>
                                            <input type="text"  name="email" id="txtemail" className="inputtext form-control is-valid" placeholder="Email: abc@gmail.com" required  onChange={this.myhandler}/>
                                        </td>
                                        </tr>
                                        <tr><td><button className="btn  btn-primary " type="button" onClick={()=>{
                                            this.setState({
                                                fname:document.getElementById('txtfname').value,
                                                lname:document.getElementById('txtfname').value,
                                                state:document.getElementById('selstate').value,
                                                city:document.getElementById('selcity').value,
                                                email:document.getElementById('txtemail').value

                                            },()=>{
                                                this.saveData();
                                            })
                                        }}

                                        >Save Data</button><button className="btn  btn-primary " type="button" onClick={this.editdata}>Edit</button></td></tr>
                                        <tr><td> <a  href="#" className="text-center new-account">View Details</a></td></tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <table border="1" align="center"  cellPadding="10" className="table table-striped">
                        <tbody>
                        <tr><th>FirstName</th><th>LastName</th><th>State</th><th>City</th><th>Email</th><th>Action</th></tr>
                        {
                            totrec.map((val,index)=>{
                                return <tr>
                                    <td>{val.fname}</td>
                                    <td>{val.lname}</td>
                                    <td>{val.state}</td>
                                    <td>{val.city}</td>
                                    <td>{val.email}</td>
                                    <td><button type="button" onClick={()=>{
                                        sid=val._id;
                                        this.deleteData(sid);
                                    }}>Delete</button>
                                        <button id={val._id} type="button" onClick={this.updateData}>Update</button></td>

                                </tr>

                            })
                        }
                        </tbody>
                    </table>

                </div>
                <button type="button" onClick={
                    this.sortData
                }>Sort</button>
                <div>{pageList}</div>
                </center>
            </section>
        );
    }
}