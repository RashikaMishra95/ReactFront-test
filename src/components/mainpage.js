import React from 'react';
import Header from './header';
import HeaderMenu from './headermenu';
 export default class Mainpage extends React.Component{
     constructor(props){
         super(props);
         this.state={
             fname:"",
             lname:"",
             state:"",
             city:"",
             email:""

         };
     }
     fnameHandle=(e)=>{
         e.preventDefault();
         this.setState({
             fname:e.target.value
         });
     };
     lnameHandle=(e)=>{
         e.preventDefault();
         this.setState({
             lname:e.target.value
         });
     };
     cityHandle=(e)=>{
         e.preventDefault();
         this.setState({
             city:e.target.value
         });
     };
     stateHandle=(e)=>{
         e.preventDefault();
         this.setState({
             state:e.target.value
         });
     };
     emailHandle=(e)=>{
         e.preventDefault();
         this.setState({
             lname:e.target.value
         });
     };



     render(){
       return(
           <section>
           <div className="modal-header bg-warning"><Header/></div>
               <div className="container">
                   <div className="row">
                       <div className="col-md-8 ">

                           <div className="wall">

                               <form className="form-signin">
                                   <table align="center" border="1" width="450">
                                       <tr align="center"> <td> <h1 className="text-center login-title" >Fill Data</h1></td></tr>
                                       <tr>
                                           <td align="center">
                                               <input type="text" className="inputtext" placeholder="First Name" required autoFocus onChange={this.fnameHandle} value={this.state.fname}/>
                                           </td>
                                       </tr>
                                        <tr>   <td align="center">
                                               <input type="text" className="inputtext" placeholder="Last Name" required  onChange={this.lnameHandle} value={this.state.lname}/>
                                               </td>
                                       </tr>
                                       <tr><td align="center">State ::
                                           <select id="selcity" onSelect={this.stateHandle}>
                                               <option value="Gujarat">Gujarat</option>
                                               <option value="Maharashtra">Maharashtra</option>
                                               <option value="Goa">Goa</option>
                                               <option value="Rajasthan">Rajasthan</option></select>
                                       </td></tr>
                                       <tr><td align="center">City ::
                                           <select id="selcity" onSelect={this.cityHandle}>
                                               <option value="Ahmedabad">Ahmedabad</option>
                                               <option value="Mumbai">Mumbai</option>
                                               <option value="Panaji">Panaji</option>
                                               <option value="Jaipur">Jaipur</option></select>
                                       </td></tr>

                                       <tr>   <td align="center">
                                           <input type="text" className="inputtext" placeholder="Email: abc@gmail.com" required  onChange={this.emailHandle} value={this.state.email}/>
                                       </td>
                                       </tr>
                                       <tr align="center"><button className="btn  btn-primary " type="button" >Save Data</button></tr>
                                       <tr align="center"><td> <a  href="#" className="text-center new-account">View Details</a></td></tr>
                                   </table>






                               </form>
                           </div>

                       </div>
                   </div>
               </div>
           </section>
       );
   }
 }