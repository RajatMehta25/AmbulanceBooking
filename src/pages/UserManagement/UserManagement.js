import React, { useState, useEffect } from "react";
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


// For Table
import SearchBar from "material-ui-search-bar";
import { sortBy } from "lodash";

//history
import {useHistory} from 'react-router-dom'
// import AddEditCategory from "../AccountManagement/Account_Details";

// import './Category_Management.css' ;
import EditIcon from '@material-ui/icons/Edit';
import { DeleteOutline, WidgetsOutlined } from "@material-ui/icons";
import ModalVideo from 'react-modal-video'
// import 'node_modules/react-modal-video/scss/modal-video.scss';
import VideocamIcon from '@material-ui/icons/Videocam';

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


export default function UserManagement(props) {
  const classes = useStyles();

  
  // const history=useHistory(); 
 

  const [tableData, setTableData] = useState([]);
  
  const[isLoading,setIsLoading]=useState(true);
  const [isOpen, setOpen] = useState(false)
// status switch 
// const [checked, setChecked] = useState(true);
 
  
  

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

  useEffect(() => {getCategoriesContent()} , []);
  
 //get content
 const getCategoriesContent = async()=>{
 try {                                       
      
      
  
  const { data } = await axios.get("/admin/users");
  console.log(data);
setTableData(data.data)
setSearchedData(data.data)
setIsLoading(false)
 }
  catch (error) {
    console.log(error);
  } 
 }
 // edit user
 
  const EditUser=(category)=>{

    props.history.push({
      pathname: "/adminPanel/AddEditUser",
      state:category
      
    });

  }


  

  

// useEffect(() => {
//    window.localStorage.setItem('query',JSON.stringify([]))
  
// }, [])

 // For Search 
 const [searched, setSearched] = useState("");
 const [searchedData, setSearchedData] = useState([]);

 const requestSearch = (searchedVal) => {
   console.log(searchedVal);
   
   const filteredRows = searchedData.filter((row) => {
     let name = row.first_name;
     let email = row.email;
     return name.toLowerCase().includes(searchedVal.toLowerCase()) || email.toLowerCase().includes(searchedVal.toLowerCase());
   });
  setTableData(filteredRows);
 

 }

 
 ;

 const cancelSearch = () => {
   getCategoriesContent()
   // setSearched("");
//  console.log(searchedData); 
//  requestSearch()
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
  let sortedData= sortBy(tableData,[function(o) { console.log(o); return new Date(o.date).getTime(); }]).reverse();
  return sortedData;
  
  }

  const BlockUser=async(category)=>{

    try {
      console.log(category);
      const { data } = await axios.get(`/admin/users-block/${category.id}`);
      console.log(data);
      getCategoriesContent();
      toast.error("User Blocked", {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const UnblockUser=async(category)=>{

    try {
      console.log(category);
      const { data } = await axios.get(`/admin/users-unblock/${category.id}`);
      console.log(data);
      getCategoriesContent();
      toast.success("User Unblocked", {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteUser=async(category)=>{

    try {
      console.log(category);
      const { data } = await axios.delete(`/admin/users/${category.id}`);
      console.log(data);
      getCategoriesContent();
      toast.success("User Deleted", {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      console.log(error)
    }
  }

  // const [inspectionFormData, setInspectionformData] = useState([]);
  const getInspectionFormData = async(id) => {
    try {
        const response = await axios.get(`/admin/inspection/${id}`);
        console.log(response);
        // setInspectionformData(response.data.data);

        props.history.push({
          pathname: "/adminPanel/ViewInspectionForm",
        state:[response.data.data,id]
          
        });
    }
    catch (error) {
        console.log(error);
    }
}

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.headingAlignment
                  )}
                >
                  <h3 style={{}}>User Management</h3>
                  <SearchBar
                    // value={searched}
                    className="heightfix"
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="User Name,Email"
                  />
                  <Button
                    variant="contained"
                    className="buttoncss"
                    style={{ backgroundColor: "#2765B3", color: "#fff" }}
                    onClick={() => {
                      props.history.push({
                        pathname: "/adminPanel/AddEditUser",
                      });
                    }}
                  >
                    {" "}
                    ADD USER
                  </Button>
                </Paper>

                {/* //new design */}

                {/* <br /> */}

                {/* status end */}

                <Paper>
                  <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Sr. No.
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {" "}
                            User Name
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Profile Image
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {" "}
                            Phone Number
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {" "}
                            Email
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            {" "}
                            Video
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Inspection Form
                          </TableCell>
                          {/* <TableCell style={{textAlign:"center",fontWeight:"bold"}} >Doc</TableCell> */}
                          <TableCell
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Actions
                          </TableCell>
                          {/* <TableCell>User Type</TableCell>
                              <TableCell>Status</TableCell> */}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {/* {isLoading?<TableRow ><Skeleton style={{width:"70vw",borderRadius:"20px"}} highlightColor="#fff" height="1rem" count={2} baseColor="#ebebeb"/></TableRow>:false} */}
                        {sorting()
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((category, index) => (
                            <TableRow hover key={index}>
                              <TableCell
                                component="th"
                                scope="row"
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {index + 1 + page * rowsPerPage}
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {category.first_name}
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {category.profile_picture ? (
                                  <img
                                    src={category.profile_picture}
                                    alt="profile"
                                    style={{ width: "35px", height: "35px" }}
                                  />
                                ) : (
                                  <img
                                    src={require("../../assets/images/logo/ambulance.png")}
                                    alt="profile"
                                    style={{ width: "35px", height: "35px" }}
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {category.country_code + category.phone_number}
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {category.email}
                              </TableCell>
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                {
                                  // category.insp[0].video?<video   style={{width:"50px",height:"50px"}}>  <source src={category.insp[0].video==="undefined"?"":category.insp[0].video} type="video/mp4"></source></video>:"No Video"
                                  // console.log(category.insp[0]?.video)
                                  category.insp?.video ? (
                                    <Tooltip title="Click to Play" arrow>
                                      <a
                                        href={category.insp?.video}
                                        target="blank"
                                      >
                                        <VideocamIcon
                                          className=""
                                          style={{ cursor: "pointer" }}
                                        />
                                      </a>
                                    </Tooltip>
                                  ) : (
                                    "No Video"
                                  )
                                }
                                {/* {category.insp?.video&& <ModalVideo channel="custom" controls={true} autoplay={false} isOpen={isOpen} url={category.insp?.video} allowFullScreen={true} onClose={() => setOpen(false)} />}

                                      <VideocamIcon className="" style={{cursor:"pointer"}} onClick={()=> setOpen(true)}/> */}
                              </TableCell>

                              <TableCell style={{ textAlign: "center" }}>
                                {/* <Android12Switch onChange={(e)=>{statusSwitch(e,category._id)}} checked={category.status} />
                                 */}
                                {category.is_duty ? (
                                  <span
                                    style={{
                                      backgroundColor: "mediumseagreen",
                                      color: "white",
                                      padding: "7px 20px",
                                      borderRadius: "100px",
                                      boxShadow:
                                        "0 0.5em 1.5em -0.5em #14a73e98",
                                    }}
                                  >
                                    Active
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "7px 20px",
                                      borderRadius: "100px",
                                      boxShadow: "0 0.5em 1.5em -0.5em #EE4B2B",
                                    }}
                                  >
                                    Inactive
                                  </span>
                                )}
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                {" "}
                                <Button
                                  onClick={() => {
                                    getInspectionFormData(category.id);
                                  }}
                                  className=""
                                  style={{
                                    border: "1.5px solid #c4c4c4",
                                    margin: "0.5rem",
                                    color: "#2765B3",
                                  }}
                                >
                                  {" "}
                                  <Tooltip title="View " arrow>
                                    <VisibilityIcon />
                                  </Tooltip>
                                </Button>
                              </TableCell>
                              {/* <TableCell style={{textAlign:"center"}}>{category.doc?<img src={category.doc} alt="doc" style={{width:"50px",height:"50px"}}/>:"No Doc"}</TableCell> */}
                              <TableCell
                                className={classes.textMiddle}
                                style={{ textAlign: "center" }}
                              >
                                <Button
                                  onClick={() => EditUser(category)}
                                  className=""
                                  style={{
                                    border: "1.5px solid #c4c4c4",
                                    margin: "0.5rem",
                                    color: "#2765B3",
                                  }}
                                >
                                  <Tooltip title="Edit User" arrow>
                                    <EditIcon />
                                  </Tooltip>
                                </Button>
                                {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                                {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}

                                <Button
                                  className=""
                                  onClick={() =>
                                    category.status
                                      ? UnblockUser(category)
                                      : BlockUser(category)
                                  }
                                  style={{
                                    border: "1.5px solid #c4c4c4",
                                    margin: "0.5rem",
                                    color: category.status ? "red" : "#696969",
                                  }}
                                >
                                  <Tooltip title="Block User" arrow>
                                    <BlockIcon />
                                  </Tooltip>{" "}
                                </Button>
                                {/* <Button onClick={()=>BlockCategory} style={{backgroundColor:"#696969"}} >Manage</Button> */}
                                <Button
                                  className=""
                                  onClick={() => DeleteUser(category)}
                                  style={{
                                    border: "1.5px solid #c4c4c4",
                                    margin: "0.5rem",
                                    color: "#696969",
                                  }}
                                >
                                  <Tooltip title="Delete User" arrow>
                                    <DeleteOutline />
                                  </Tooltip>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
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
