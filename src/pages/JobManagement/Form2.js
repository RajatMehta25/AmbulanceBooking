import React,{useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Paper } from '@material-ui/core';
import { Formik, Form, Field} from "formik";
import * as yup from "yup";
import KErrorMessage from "../UserManagement/KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get, set } from "lodash";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import { LOCATION_API_KEY } from '../../statics/constants';
// import './AddEditCategory.css'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Autocomplete from "react-google-autocomplete";
import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
// import './AddEditJob.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
      color:"#696969",
      backgroundColor: "#fff" 
      
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
    addNewCategory:{
display: 'flex',
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
    addNewCategoryHeading:{
textAlign:"center",
flex:1,
paddingBottom:"0 !important",
['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
  flexDirection:'column',
  width: '100%',
  gap: '1rem',
  justifyContent: 'center',
  textAlign: 'center',

}

    },
    MarginControl:{
      ['@media (max-width:780px)']: { // eslint-disable-line no-useless-computed-key
      margin: "0 !important"}
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
  

const Form2 = (props) => {


    const classes = useStyles();
   

//  data from previous page

const {
    location: { state },
  } = props;

const [displayData,setDisplayData]=useState([])
const[form2Data,setForm2Data]=useState()
const [switchtoForm3,setSwitchtoForm3]=useState(false)    
useEffect(() => {
 getForm1Data()
}, [])

const getForm1Data=async()=>{
  try {
    
const response=await axios.get(`/admin/get-job/${state}`);
console.log(response.data.data);
setDisplayData(response.data.data)
    if (response.data.data[0].job_pickup_form_2.voluntary_patient)
    {
      setSwitchtoForm3(true)
    } else {
      
  }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper style={{ minHeight: "70vh" }}>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper
                  elevation={0}
                  className={classNames(
                    classes.paperHeading,
                    classes.addNewCategory
                  )}
                >
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        // if(window.confirm('Leave without saving changes?')){
                        props.history.push({
                          pathname: "/adminPanel/job-management",
                          state: "2",
                        });

                        // }
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3
                      className={classNames(classes.MarginControl)}
                      style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}
                    >
                      {console.log(state)}
                      {!state ? `FORM 2` : `FORM 2`}
                    </h3>
                  </div>
                </Paper>

                {/* //new design */}

                {/* status end */}
                {console.log(displayData)}
                {displayData.map((forms, index) => (
                  <Paper
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ margin: "2rem 0 2rem 0" }}>
                      <Formik
                        // validationSchema={validationSchema}
                        initialValues={{
                          core_notes_or_click_record: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "core_notes_or_click_record",
                              ""
                            )
                          ),
                          core_notes_or_click_record_desc: get(
                            displayData[0].job_pickup_form_2,
                            "core_notes_or_click_record_desc",
                            ""
                          ),
                          date: get(
                            displayData[0].job_pickup_form_2,
                            "date",
                            ""
                          ),
                          departure_time: get(
                            displayData[0].job_pickup_form_2,
                            "departure_time",
                            ""
                          ),
                          handover_taken: get(
                            forms.job_pickup_form_2,
                            "handover_taken",
                            ""
                          ),
                          // job_id: "62874ab4fe6fcee8010d066c",
                          patient_name: get(
                            displayData[0].job_pickup_form_2,
                            "patient_name",
                            ""
                          ),
                          patient_sign: get(
                            displayData[0].job_pickup_form_2,
                            "patient_sign",
                            ""
                          ),
                          patient_transport_service: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "patient_transport_service",
                              ""
                            )
                          ),
                          patient_transport_service_desc: get(
                            displayData[0].job_pickup_form_2,
                            "patient_transport_service_desc",
                            ""
                          ),
                          pick_up_date: get(
                            displayData[0].job_pickup_form_2,
                            "pick_up_date",
                            ""
                          ),
                          pickup_difficulty: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "pickup_difficulty",
                              ""
                            )
                          ),
                          pickup_difficulty_desc: get(
                            displayData[0].job_pickup_form_2,
                            "pickup_difficulty_desc",
                            ""
                          ),
                          position: get(
                            displayData[0].job_pickup_form_2,
                            "position",
                            ""
                          ),
                          prescription_chart: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "prescription_chart",
                              ""
                            )
                          ),
                          prescription_chart_desc: get(
                            displayData[0].job_pickup_form_2,
                            "prescription_chart_desc",
                            ""
                          ),
                          relevant_care: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "relevant_care",
                              ""
                            )
                          ),
                          relevant_care_desc: get(
                            displayData[0].job_pickup_form_2,
                            "relevant_care_desc",
                            ""
                          ),
                          risk_assessment: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "risk_assessment",
                              ""
                            )
                          ),
                          risk_assessment_desc: get(
                            displayData[0].job_pickup_form_2,
                            "risk_assessment_desc",
                            ""
                          ),
                          signature: get(
                            displayData[0].job_pickup_form_2,
                            "signature",
                            ""
                          ),
                          staff_mem: get(
                            displayData[0].job_pickup_form_2,
                            "staff_mem",
                            ""
                          ),
                          status: String(
                            get(displayData[0].job_pickup_form_2, "status", "")
                          ),
                          supply_medication: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "supply_medication",
                              ""
                            )
                          ),
                          supply_medication_desc: get(
                            displayData[0].job_pickup_form_2,
                            "supply_medication_desc",
                            ""
                          ),
                          // user_id: "628b200a1167f561c90c4a12",
                          voluntary_patient: String(
                            get(
                              displayData[0].job_pickup_form_2,
                              "voluntary_patient",
                              ""
                            )
                          ),
                          voluntary_patient_desc: get(
                            displayData[0].job_pickup_form_2,
                            "voluntary_patient_desc",
                            ""
                          ),
                        }}
                        onSubmit={(values) => {
                          console.log(values);
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form style={{ width: "50vw" }}>
                            {/* Bootstrap */}
                            <div className="container-fluid ">
                              {/* section 1 */}
                              {/* row 1 */}
                              <div className="row my-3">
                                <div className="col-12 ">
                                  <div
                                    style={{
                                      backgroundColor: "#2765B3",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {" "}
                                    <h4 className="text-white p-1">
                                      Handover Details:
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* row 2 */}
                              <div className="row my-3">
                                {/* <div className="col-6">
                                  <h6>Handover taken from pickup point:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="handover_taken"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div> */}
                                <div className="col-12">
                                  <h6>Staff Member:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="staff_mem"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* row 3 */}
                              <div className="row my-3">
                                <div className="col-6">
                                  <h6>Position:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="position"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                                <div className="col-6">
                                  <h6>Signature:</h6>
                                  {/* <Field
                                    type="text"
                                    readOnly
                                    name="signature"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  /> */}
                                  <img
                                    readOnly
                                    style={{ width: 50, height: 50 }}
                                    src={
                                      forms.job_pickup_form_2
                                        ? forms.job_pickup_form_2.signature
                                        : ""
                                    }
                                    alt=".."
                                  />
                                </div>
                              </div>
                              {/* row 3 */}
                              <div className="row my-3">
                                <div className="col-6">
                                  <h6>Difficulty during the pickup:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-6 ">
                                  <div className="d-flex">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="pickup_difficulty"
                                        type="radio"
                                        value="true"
                                        readOnly
                                        autoComplete="off"
                                        style={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: 5,
                                          borderColor: "#d3d3d3",
                                          borderStyle: "solid",
                                          borderWidth: 1,
                                          paddingInlineStart: 10,
                                        }}
                                      />{" "}
                                      <label className="ml-1" style={{}}>
                                        Yes
                                      </label>
                                    </div>
                                    <div className="d-flex ml-2">
                                      {" "}
                                      <Field
                                        className=""
                                        name="pickup_difficulty"
                                        type="radio"
                                        value="false"
                                        readOnly
                                        autoComplete="off"
                                        style={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: 5,
                                          borderColor: "#d3d3d3",
                                          borderStyle: "solid",
                                          borderWidth: 1,
                                          paddingInlineStart: 10,
                                        }}
                                      />{" "}
                                      <label className="ml-1" style={{}}>
                                        No
                                      </label>
                                    </div>
                                  </div>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="pickup_difficulty_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* section 2 */}
                              {/* row 4 */}
                              <div className="row my-3">
                                <div className="col-12 ">
                                  <div
                                    style={{
                                      backgroundColor: "#2765B3",
                                      borderRadius: "2px",
                                    }}
                                  >
                                    {" "}
                                    <h4 className="text-white p-1">
                                      Documents Provided:
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* internal structure 1 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>
                                    Last 7 days of care notes/clinic records :
                                  </h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around align-items-center ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="core_notes_or_click_record"
                                      type="radio"
                                      value="true"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="core_notes_or_click_record"
                                      type="radio"
                                      value="false"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="core_notes_or_click_record_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 2 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>Current prescription charts :</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="prescription_chart"
                                      type="radio"
                                      value="true"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="prescription_chart"
                                      type="radio"
                                      value="false"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="prescription_chart_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 3 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>Supply of medication :</h6>
                                  <span>(State no. of days)</span>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="supply_medication"
                                      type="radio"
                                      readOnly
                                      value="true"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="supply_medication"
                                      type="radio"
                                      readOnly
                                      value="false"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="supply_medication_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 4 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>Current risk assessment :</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="risk_assessment"
                                      type="radio"
                                      value="true"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="risk_assessment"
                                      readOnly
                                      type="radio"
                                      value="false"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="risk_assessment_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 5 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>Current relevant care plans :</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="relevant_care"
                                      readOnly
                                      type="radio"
                                      value="true"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="relevant_care"
                                      type="radio"
                                      readOnly
                                      value="false"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="relevant_care_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 6 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>Voluntary patient:</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="voluntary_patient"
                                      type="radio"
                                      value="true"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="voluntary_patient"
                                      type="radio"
                                      readOnly
                                      value="false"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="voluntary_patient_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              {/* internal structure 7 */}
                              <div className="row my-2 align-items-center">
                                <div className="col-4">
                                  <h6>
                                    Consent does the patient consent to transfer
                                    by L&T Patient Transport Service:
                                  </h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around  ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="patient_transport_service"
                                      type="radio"
                                      value="true"
                                      readOnly
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex">
                                    {" "}
                                    <Field
                                      className=""
                                      name="patient_transport_service"
                                      type="radio"
                                      readOnly
                                      value="false"
                                      autoComplete="off"
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />{" "}
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="patient_transport_service_desc"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-lg-4">
                                  <h6>Patient Name:</h6>
                                </div>
                                <div className="col-lg-8">
                                  <Field
                                    type="text"
                                    readOnly
                                    name="patient_name"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                              </div>
                              <br />

                              <div className="row">
                                <div className="col-lg-4">
                                  <h6>Date:</h6>
                                </div>
                                <div className="col-lg-8">
                                  <DatePicker
                                    onChange={(e) => {
                                      setFieldValue("date", e);
                                    }}
                                    disabled={true}
                                    name="date"
                                    value={values.date}
                                    className="w-100"
                                  />
                                </div>
                              </div>
                              <br />

                              <div className="row">
                                <div className="col-lg-4">
                                  <h6>Patient Name Signature:</h6>
                                </div>
                                <div className="col-lg-8">
                                  {/* <Field type="text" readOnly name="patient_sign" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  <img
                                    readOnly
                                    style={{ width: 300, height: 150 }}
                                    src={
                                      forms.job_pickup_form_2
                                        ? forms.job_pickup_form_2.patient_sign
                                        : ""
                                    }
                                    alt=".."
                                  />
                                  {console.log(forms)}
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col-lg-4">
                                  <h6>Departure Time:</h6>
                                </div>
                                <div className="col-lg-8">
                                  <TimePicker
                                    onChange={(e) => {
                                      setFieldValue("pickupTime", e);
                                    }}
                                    value={values.departure_time}
                                    className="w-100"
                                    disabled
                                    name="departure_time"
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />
                            {/* <div style={{display:"flex",justifyContent:"center"}}><button type="submit" className="buttoncss" style={{borderRadius:"1.5rem",border:"none",fontSize:"1rem",width:"15vw",height:"5vh",backgroundColor:"#2765B3",color:"#fff"}}>SAVE</button></div> */}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Paper>
                ))}
              </div>
            </div>
            <div className="text-center">
              {switchtoForm3 ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2765B3", color: "#fff" }}
                  onClick={() => {
                    props.history.push({
                      pathname: "/adminPanel/Form4",
                      state: displayData[0],
                    });
                  }}
                >
                  NEXT
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2765B3", color: "#fff" }}
                  onClick={() => {
                    props.history.push({
                      pathname: "/adminPanel/Form3",
                      state: displayData[0],
                    });
                  }}
                >
                  NEXT
                </Button>
              )}
            </div>
            <br />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Form2;


