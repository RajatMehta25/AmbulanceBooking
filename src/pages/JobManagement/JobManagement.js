import React, { useState, useEffect,useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import axios from "../../axios";
import { toast } from "react-toastify";
// import Switch from '@mui/material/Switch';
// import { styled } from '@mui/material/styles';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Switch,styled, Tooltip    } from '@material-ui/core';

// import { Delete } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BlockIcon from '@material-ui/icons/Block';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RSelect from 'react-select';

// For Table
import SearchBar from "material-ui-search-bar";
import { orderBy } from "lodash";

//history
import {useHistory} from 'react-router-dom'
// import AddEditCategory from "../AccountManagement/Account_Details";
import { Formik, Form, Field} from "formik";

// import './Category_Management.css' ;
import EditIcon from '@material-ui/icons/Edit';
import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";
// import { Field } from "redux-form";
import RefreshIcon from '@material-ui/icons/Refresh';
import FilterListIcon from '@material-ui/icons/FilterList';


const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    // marginTop: '5rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
      padding: '1rem 0rem',
  },
  table: {
      minWidth: 650,
  },
  textMiddle: {
      verticalAlign: 'middle !important',
  },
  iconMargin: {
    margin: '0.5rem',
    color:"#fff",
    backgroundColor: "#696969" 
    
  },
  iconcolor:{
    margin: '0.5rem',
    color:"#fff",
    backgroundColor: "#0294b3 !important"
  },
  headingButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: "10px"
  },
  headingAlignment:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: "0 2rem 0 2rem"
    alignItems: 'center',
    flexWrap: 'wrap',
    ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      flexDirection:'column',
      width: '100%',
      gap: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },
  Marginbutton:{
    margin: "0.5rem"
  },
  container: {
    maxHeight: '58vh',
    minHeight:"30vh"
  },
  paperPaddingRightLeft: {
    padding: '0rem 1rem',
  },

}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));


export default function JobManagement(props) {
  const classes = useStyles();
  const {
    location: { state },
  } = props;
  
  // const history=useHistory(); 
 const ref=useRef(null);
 const [firstFourButtonsCheck,setFirstFourButtonsCheck]=useState(false)
//  const [filterJobsList, setfilterJobsList] = React.useState('');
const filterJobsList=[ 
  { value: '5', label: 'Not Assigned' },
  { value: '1', label: 'Assigned' },
 
{ value: '2', label: 'Accepted' },
{ value: '3', label: 'Completed' },
// { value: '4', label: 'Cancelled' }

]
const filterJobButton=["Assigned","Not Assigned","Accepted","Completed","Cancelled"];

  const [tableData, setTableData] = useState([]);
  
  const[isLoading,setIsLoading]=useState(true);
  const [Completed_Accepted,setCompleted_Accepted]=useState(true)
  const[jobDetailOnCompletion,setJobDetailOnCompletion]=useState(false)
  const[jobDetailOnAccept,setJobDetailOnAccept]=useState(false)
const [jobComplete,setJobComplete]=useState(true)
const [tabColor,setTabcolor]=useState("5")


// status switch 
// const [checked, setChecked] = useState(true);
 const [driverData,setDriverData]=useState([]);
  const[options,setOptions]=useState([]);
  

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    // console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {getCategoriesContent(state);DriverData();} , []);
  // console.log(state);
 //get content
 const getCategoriesContent = async(state)=>{
 try {                                   
   if(state!=="undefined"&&state!==null){    
  const { data } = await axios.get(`/admin/job/${state}`)



switch (state) {
  case "1":
    setTableData(data.data)
    setSearchedData(data.data)
    setCancelledTableData([])
    setJobDetailOnAccept(true)
    setFirstFourButtonsCheck(true)
    setTabcolor("1")
    break;
    case "2":
      setTableData(data.data)
      setSearchedData(data.data)
      setCancelledTableData([])
      setJobDetailOnAccept(true)
      setFirstFourButtonsCheck(true)
      setTabcolor("2")
    break;
    case "3":
      setTableData(data.data)
      setSearchedData(data.data)
      setCancelledTableData([])
      // setJobDetailOnAccept(true)
    setJobComplete(false);
    setJobDetailOnCompletion(true);
      setFirstFourButtonsCheck(true)
      setTabcolor("3")
    break;
    case "5":
      setTableData(data.data)
      setSearchedData(data.data)
      setCancelledTableData([])
      setJobDetailOnAccept(true)
      setFirstFourButtonsCheck(true)
      setTabcolor("5")
    break;

  default:
    break;
}




//       if(state==="2")
//   {   
//     const { data } = await axios.get("/admin/job/2");
//     console.log(data);
//   setTableData(data.data)
//   setSearchedData(data.data)
//   setCancelledTableData([])
//   setJobDetailOnAccept(true)
//   setFirstFourButtonsCheck(true)
//   setTabcolor("2")
//    }else {
//   const { data } = await axios.get("/admin/job/5");
//   console.log(data);
// setTableData(data.data)
// setSearchedData(data.data)
// setCancelledTableData([])
// setFirstFourButtonsCheck(true)
// setIsLoading(false)
//  }}
   }else{
      const { data } = await axios.get("/admin/job/5");
      console.log(data);
      setTableData(data.data)
      setSearchedData(data.data)
      setCancelledTableData([])
      setFirstFourButtonsCheck(true)
      setIsLoading(false)
      setTabcolor("5")
   }}
  catch (error) {
    console.log(error);
  } 

 }
 // edit category itself
 
  const EditJob=(category)=>{

    props.history.push({
      pathname: "/adminPanel/AddEditJob",
      state:[category,tabColor]
      
    });

  }

 
  

  


 // For Search 
 const [searched, setSearched] = useState("");
 const [searchedData, setSearchedData] = useState([]);
 const [reasonData,setReasonData]=useState([])
 const [openJobs,setOpenJobs]=useState([])

 const requestSearch = (searchedVal) => {
   console.log(searchedVal);
   
   const filteredRows = searchedData.filter((row) => {
     let name = row?.name;
     return name.toLowerCase().includes(searchedVal.toLowerCase()) ;
   });
  setTableData(filteredRows);
 

 }

 const requestSearch2 = (searchedVal) => {
  console.log(searchedVal);
  
  const filteredRows = searchedData.filter((row) => {
    let name = row.job_id?.name;
    return name.toLowerCase().includes(searchedVal.toLowerCase()) ;
  });
 setCancelledTableData(filteredRows);


}

 
 

 const cancelSearch = () => {

   getCategoriesContent()
   
 }
 const cancelSearch2 = () => {

   getCancelledData()
  
 }

 const sorting = () => {
  //   if(sort){
  //  let tableSortedData= sortBy(tableData, 
  //     [function(o) { console.log(o); return new Date(o.postId.createdAt).getTime(); }])
  //     console.log(tableSortedData);
  // setTableData(tableSortedData);
  //   }else {
  //  let tableSortedData= sortBy(tableData, 
  //     [function(o) { console.log(o); return new Date(o.postId.createdAt).getTime(); }],
  //     { reverse: true })
  //     setTableData(tableSortedData);
  //   }
  let sortedData= orderBy(tableData,null,"desc");
  return sortedData;
  
  }

const DriverData=async()=>{
  try {
    const { data } = await axios.get("/admin/on-duty-users");
    console.log(data);
    setDriverData(data.data)
    setOptions(data.data.map((driver)=>({value:driver.id,label:driver.first_name})))
    // setTableData(data.data)
    // setSearchedData(data.data)
    // setIsLoading(false)
  } catch (error) {
    console.log(error);
  }

}

// Job Assiging on react select
const assignJob=async(e,id)=>{
  try {
    console.log(id);
    const { data } = await axios.post("/admin/assign-job", {user_id:e.value,job_id:id}); //assigning job
    console.log(data);
    const switchToAssignedData={value:"1",label:"Assigned"}// Value for assigned job loading
    getFilteredJobData(switchToAssignedData); //refreshing data to display: ;
    DriverData(); //refreshing driver list data
    
    toast.success(`Job Assigned to ${e.label}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    if(error.response.status===400){
    toast.error("Job already in process,choose a different job to assign", {
      position: toast.POSITION.TOP_RIGHT,
    });
    console.log(error);}
  }
}


const DeleteJob=async(category,tabColor)=>{

  try {
    console.log(category);
    const { data } = await axios.delete(`/admin/job/${category.id}`);
    console.log(data);
    getCategoriesContent(tabColor);
    toast.success("Job Deleted", {
      position: toast.POSITION.TOP_RIGHT,
    })
  } catch (error) {
    console.log(error)
  }
}

const colourStyles = {
  control: (styles) => ({ ...styles }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      
     
    };
  },
  container: (styles) => ({ ...styles, minWidth: "100px !important" }),
  input: (styles) => ({ ...styles, minWidth: "100px !important" }),
};

let div1;
const JobAssignmentButton = (status,id,reason,name) => {

switch (status) {
  case "1":
    div1=<div><span style={{backgroundColor:"#ffc107",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #ffc107",display:"inline-flex"}}>{`Assigned to ${name}`}</span></div>

    return div1;
    case "2":
      div1=<span style={{backgroundColor:"mediumseagreen",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #14a73e98",display:"inline-flex"}}>{`Accepted by ${name}`}</span>
      return div1;
      case "3":
    div1=<span style={{backgroundColor:"mediumseagreen",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #14a73e98",display:"inline-flex"}}>{`Completed by ${name}`}</span>
    return div1;
        case "4":
    div1=<div>
      {/* <span><RSelect className="" style={colourStyles}  options={options} isMulti={false} 
    onChange={(e)=>{console.log(e);assignJob(e,id)}}
    />
    </span> */}
    <Tooltip title={reason?<span style={{color:"white",fontSize:"12px"}}>{`Reason: ${reason}`}</span>:""} arrow><span style={{backgroundColor:"#ff0000",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #ff0000",display:"inline-flex"}}>{`Cancelled by ${name}`}</span></Tooltip></div>
    return div1;
          case "5":
    div1=<div><span><RSelect className="" placeholder="Select Driver" style={colourStyles}  options={options} isMulti={false} 
    onChange={(e)=>{console.log(e);assignJob(e,id)}}
    /></span><br /><span style={{backgroundColor:"#ff0000",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #ff0000",display:"inline-flex"}}>Not Assigned</span></div>
           return div1;


  default:
    break;
}
}

// Fetching Data on button click
const getFilteredJobData=async(e)=>{
  try {                                       
      
      
  
    const { data } = await axios.get(`/admin/job/${e.value}`); //fetching data on button click
    console.log(data);
  setTableData(data.data)// data to display
  setSearchedData(data.data)// data to search
  setCancelledTableData([])//setting cancelled button to empty
  DriverData();//refreshing driver data
  setFirstFourButtonsCheck(true)
  if(e.value==="1"){
    setJobComplete(true) //edit button display
    setJobDetailOnAccept(false);
    setJobDetailOnCompletion(false)
    setTabcolor("1")
  }else{}
    if(e.value==="2"){
      setJobDetailOnAccept(true);
      setJobDetailOnCompletion(false);
      setJobComplete(true)//edit button display
      setTabcolor("2")

    }else{}
  if(e.value==="3"){
    setJobDetailOnCompletion(true);
    setJobDetailOnAccept(false);
    setJobComplete(false)//edit button display
    setTabcolor("3")


  }else{}
   
    if(e.value==="5"){
      setJobComplete(true) //edit button display
      setJobDetailOnAccept(false);
      setJobDetailOnCompletion(false)
      setTabcolor("5")

    }else{}

if(e.value==="2"||e.value==="3"){setCompleted_Accepted(false)} else{}

  setIsLoading(false)
  toast.success(`${e.label} Jobs`,{ position: toast.POSITION.TOP_RIGHT})
   }
    catch (error) {
      console.log(error);
    } 
}



console.log(reasonData);

const [cancelledTableData,setCancelledTableData]=useState([])

const getCancelledData=async()=>{
  setTableData([])
  setJobDetailOnAccept(false)
  setJobDetailOnCompletion(false)
  setTabcolor("4")
  try{
    const {data}=await axios.get(`/admin/cancel-job`)
    // setTableData(data.data)
    setCancelledTableData(data.data)
    setSearchedData(data.data)
    setFirstFourButtonsCheck(false)

    console.log(data);

  }catch(error){
console.log(error);
  }
}

const JobAssignmentCancelButton=(name)=>{
  div1=<div>
    
    <span style={{backgroundColor:"#ff0000",color:"white",padding:"5px 10px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #ff0000",display:"inline-flex"}}>{`Cancelled by ${name}`}</span></div>
    return div1;
}


  return (
    <React.Fragment>
      <div className="page-content">
      <div className={classes.root}>
        <Paper>
          <div className={classes.paperPaddingRightLeft}>
            <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.headingAlignment)}>
                    <h3 style={{}}>Job Management</h3>
                {   firstFourButtonsCheck? <SearchBar
                      // value={searched}
                      className="heightfix"
                      onChange={(searchVal) =>requestSearch(searchVal)}
                      onCancelSearch={() => cancelSearch()}
                      placeholder="Patient Name"
                    />
                    :
                    <SearchBar
                    // value={searched}
                    className="heightfix"
                    onChange={(searchVal) =>requestSearch2(searchVal)}
                    onCancelSearch={() => cancelSearch2()}
                    placeholder="Patient Name"
                  />
                    }
                    <Button variant="contained" className="buttoncss" style={{backgroundColor:"#2765B3",color:"#fff"}} onClick={()=>{props.history.push({
    pathname: "/adminPanel/AddEditJob",
    
  });} } > CREATE JOB</Button>
 {/* <div style={{minWidth:"200px",zIndex:99}}> <RSelect placeholder="Filter Jobs" options={filterJobsList} onChange={(e)=>{getFilteredJobData(e)}} /></div> */}
                  
                </Paper>
                <Paper className="d-flex justify-content-center py-3" elevation={0}>
                {filterJobsList.map((item,index)=>(<Button key={index} className={`${tabColor===item.value?"colorTheButton mx-3":"defaultButtonColor mx-3"}`}  variant="contained"  onClick={()=>{getFilteredJobData(item)}}>{item.label}</Button>))}
                <Button className={`${tabColor==="4"?"colorTheButton mx-3":"defaultButtonColor mx-3"}`} variant="contained" style={{backgroundColor:"#2765B3",color:"#fff"}} onClick={()=>{getCancelledData();toast.success('Cancelled Jobs',{position:toast.POSITION.TOP_RIGHT})}}>Cancelled</Button>
                  </Paper>

                 {/* //new design */}

              {/* <br /> */}


             {/* status end */}


                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                          <TableRow >
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}>Sr. No.</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Job Id</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Pickup Location</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Drop Location</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Job Status</TableCell>
                             
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}>Patient Name</TableCell>
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Assign Jobs</TableCell>
                               
                            {/* {                       reasonData.length>=1 ?    <TableCell style={{textAlign:"center",fontWeight:"bold"}}> Reason</TableCell>:false
} */}
                               {/* {Completed_Accepted&&<TableCell style={{textAlign:"center",fontWeight:"bold"}}>Job Details</TableCell>} */}
                               {jobDetailOnAccept&&<TableCell style={{textAlign:"center",fontWeight:"bold"}}>Handover Details</TableCell>}
                               {jobDetailOnCompletion&&<TableCell style={{textAlign:"center",fontWeight:"bold"}}>View All Details</TableCell>}
                              <TableCell style={{textAlign:"center",fontWeight:"bold"}}>{cancelledTableData.length>=1?"Reason":"Actions"}</TableCell>
                         
                           
                          </TableRow>
                        
                      </TableHead>
                      
                      <TableBody>
                            { 
                            tableData.length>=1
                            ?

                            tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .reverse()
                              .map((category, index) => (
                          
                               <TableRow  hover key={index}>
                
                                  <TableCell component="th" scope="row" className={classes.textMiddle} style={{textAlign:"center"}}>
                                       {index + 1+ (page)*rowsPerPage} 
                                  </TableCell>
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.unit_id}</TableCell>
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.pickup_location}</TableCell>
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.destination_location}</TableCell>
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.status==="5"||category.status==="4"?<span style={{backgroundColor:"red",color:"white",padding:"7px 20px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #EE4B2B"}}>Inactive</span>:<span style={{backgroundColor:"mediumseagreen",color:"white",padding:"7px 20px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #14a73e98" }}>Active</span>}</TableCell>
                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.name}</TableCell>

<TableCell className={classes.textMiddle} style={{textAlign:"center",minWidth:"100px !important"}}>
 
   
   
   
   {
          JobAssignmentButton(category.status,category.id,category.assign_job?.reason,category.users?.first_name)

   
   }
    

   
  
  
  
  
  </TableCell>

{/* {reasonData.length>=1?<TableCell> {category.assign_job?.reason} </TableCell>:false} */}

{jobDetailOnAccept&&<TableCell className={classes.textMiddle} style={{textAlign:"center"}} ><Button style={{border:"1.5px solid #c4c4c4",margin:"0.5rem",color:"#696969"}}><VisibilityIcon style={{color:"#2765B3"}} onClick={()=>{props.history.push({pathname:"/adminPanel/Form2",state:category.id})}}/></Button></TableCell>}
{jobDetailOnCompletion&&<TableCell className={classes.textMiddle} style={{textAlign:"center"}} ><Button style={{border:"1.5px solid #c4c4c4",margin:"0.5rem",color:"#696969"}}><VisibilityIcon style={{color:"#2765B3"}} onClick={()=>{props.history.push({pathname:"/adminPanel/V1",state:[category,"dummy"]})}} /></Button> </TableCell>}


                                  <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                    {
                                      jobComplete && <Button onClick={() => EditJob(category)} className="" style={{ border: "1.5px solid #c4c4c4", margin: "0.5rem", color: "#2765B3" }} ><Tooltip title="Edit Job" arrow ><EditIcon 
                                          
                                      /></Tooltip></Button>
                                    }

                                    <Button className="" onClick={()=>DeleteJob(category,tabColor)} style={{border:"1.5px solid #c4c4c4",margin:"0.5rem",color:"#696969"}} ><Tooltip title="Delete Job" arrow><DeleteOutline/></Tooltip></Button>


                                  </TableCell>
                                  </TableRow>))
                                  :
                                  // Table data for cancelled jobs
                               ( 
                                  
                                 
                                 cancelledTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) =>(
                          category.job_id!==null
                          ?
                                    <TableRow  hover key={index}>
                     
                                       <TableCell component="th" scope="row" className={classes.textMiddle} style={{textAlign:"center"}}>
                                            {index + 1+ (page)*rowsPerPage} 
                                       </TableCell>
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.job_id.unit_id}</TableCell>
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.job_id.pickup_location}</TableCell>
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.job_id?.destination_location}</TableCell>
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.status==="5"||category.status==="4"?<span style={{backgroundColor:"red",color:"white",padding:"7px 20px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #EE4B2B"}}>Inactive</span>:<span style={{backgroundColor:"mediumseagreen",color:"white",padding:"7px 20px",borderRadius:"100px",boxShadow:"0 0.5em 1.5em -0.5em #14a73e98" }}>Active</span>}</TableCell>
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.job_id.name}</TableCell>
     
     <TableCell className={classes.textMiddle} style={{textAlign:"center",minWidth:"100px !important"}}>
      
        
        
        
        {
     
          JobAssignmentCancelButton(category.user_id?.first_name)
        }
         
     
        
       
       
       
       
       </TableCell>
       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>{category.reason}</TableCell>
     
     {/* {reasonData.length>=1?<TableCell> {category.assign_job?.reason} </TableCell>:false} */}
     
{/*      
                                       <TableCell className={classes.textMiddle} style={{textAlign:"center"}}>
                                          <Button  onClick={()=>EditJob(category)} className="" style={{border:"1.5px solid #c4c4c4",margin:"0.5rem",color:"#2765B3"}} ><Tooltip title="Edit Job" arrow ><EditIcon 
                                               
                                               /></Tooltip></Button> 
     
                                         <Button className="" onClick={()=>DeleteJob(category)} style={{border:"1.5px solid #c4c4c4",margin:"0.5rem",color:"#696969"}} ><Tooltip title="Delete Job" arrow><DeleteOutline/></Tooltip></Button>
     
     
                                       </TableCell> */}
                                       </TableRow>
                                       :
                                       ""))
                                       )

                                  
}
                                      
                        </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
            </div>
          </div>
        </Paper>
      </div>
      </div>
    </React.Fragment>
  );
}
