import React from 'react';
import Header from './header';

import HeaderMenu from './headermenu';

const axios =require('axios');
var sid="";
export default class Mainpage extends React.Component{
    constructor(props){
        super(props);
        this.state={
          //  editdata:[],
            fname:"",
            lname:"",
            state:"",
            city:"",
            email:"",
            data1:[]

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
    // submitHandler=()=>{
    //
    //     this.setState({
    //         fname:document.getElementById('txtfname').value,
    //         lname:document.getElementById('txtfname').value,
    //         state:document.getElementById('selstate').value,
    //         city:document.getElementById('selcity').value,
    //         email:document.getElementById('txtemail').value
    //
    //     });
    //     console.log(this.state.fname,this.state.lname,this.state.state,this.state.city,this.state.email);
    // }
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
            {
                console.log("No Record Added");

            }

        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        });
        console.log(this.state.fname,this.state.lname,this.state.state,this.state.city,this.state.email);
    };
    // myhandler=(event)=>{
    //     const {value, name} = event.target;
    //     const editData = this.state.editData;
    //     editData[name] = value;
    //     this.setState({editData}, () => {
    //         console.log(this.state.editData);
    //     });
    // }
    // UpdateData=(sid)=>{
    //     console.log(" Data",sid);
    //     axios.post(
    //         'http://localhost:2222/edit',
    //         {
    //             id:sid
    //         }).then((res)=>{
    //         console.log(`Response ${res.data}`);
    //
    //     }).catch((e)=>{
    //         console.log(`Error : ${e.message}`);
    //     });
    // }
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
    render(){
    //    const editdata=this.state.editdata;
        return(
            <section>
                <div className="modal-header bg-warning"><Header/></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">

                            <div className="wall">

                                <form className="form-signin">
                                    <table align="center" border="2" width="450">
                                    <tbody>
                                        <tr><td><h1 className="text-center login-title" >Fill Data</h1></td></tr>
                                        <tr>
                                            <td>
                                                <input type="text" name="fname" id="txtfname" className="inputtext form-control is-valid" placeholder="First Name" required autoFocus  onChange={this.myhandler} />
                                            </td>
                                        </tr>
                                        <tr><td>
                                            <input type="text" name="lname" id="txtlname"  className="inputtext form-control is-valid" placeholder="Last Name" required  onChange={this.myhandler}/>
                                        </td>
                                        </tr>
                                        <tr><td>State ::
                                            <select id="selstate" onChange={this.myhandler} name="state" className="form-control is-valid">
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Rajasthan">Rajasthan</option></select>
                                        </td></tr>
                                        <tr><td>City ::
                                            <select id="selcity" onChange={this.myhandler} name="city" className="form-control is-valid">
                                                <option value="Ahmedabad">Ahmedabad</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Panaji">Panaji</option>
                                                <option value="Jaipur">Jaipur</option></select>
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

                                        >Save Data</button></td></tr>
                                        <tr><td> <a  href="#" className="text-center new-account">View Details</a></td></tr>
</tbody>
                                    </table>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <table border="1" align="center" width="779" cellPadding="10">
                        <tr><th>FirstName</th><th>LastName</th><th>State</th><th>City</th><th>Email</th><th>Action</th></tr>
                        {
                            this.state.data1.map((val,index)=>{
                                return <tr>
                                    <td>{val.fname}</td>
                                    <td>{val.lname}</td>
                                    <td>{val.state}</td>
                                    <td>{val.city}</td>
                                    <td>{val.email}</td>
                                    <td><button type="button" onClick={()=>{
                                        sid=val._id;
                                        this.deleteData(sid);
                                    }}>Delete</button><button type="button" onClick={()=>{
                                        sid=val._id;

                                        //this.UpdateData(sid);
                                    }}>Update</button></td>

                                </tr>

                           })
                        }
                    </table>

                </div>
            </section>
        );
    }
}