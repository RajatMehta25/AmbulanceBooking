import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import KErrorMessage from "../UserManagement/KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get, set } from "lodash";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import { LOCATION_API_KEY } from "../../statics/constants";
// import './AddEditCategory.css'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import DateTimePicker from "react-datetime-picker";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
// import './AddEditJob.css';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    // marginTop: '5rem',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paperHeading: {
    padding: "1rem 0rem",
  },
  table: {
    minWidth: 650,
  },
  textMiddle: {
    verticalAlign: "middle !important",
  },
  iconMargin: {
    margin: "0.5rem",
    color: "#696969",
    backgroundColor: "#fff",
  },
  iconcolor: {
    margin: "0.5rem",
    color: "#fff",
    backgroundColor: "#0294b3 !important",
  },
  headingButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
  },
  headingAlignment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: "0 2rem 0 2rem"
    alignItems: "center",
    flexWrap: "wrap",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  addNewCategory: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  addNewCategoryHeading: {
    textAlign: "center",
    flex: 1,
    paddingBottom: "0 !important",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column",
      width: "100%",
      gap: "1rem",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  MarginControl: {
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "0 !important",
    },
  },
  Marginbutton: {
    margin: "0.5rem",
  },
  container: {
    maxHeight: "58vh",
  },
  paperPaddingRightLeft: {
    padding: "0rem 1rem",
  },
}));

const C4 = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;

  const [displayData, setDisplayData] = useState([""]);

  console.log(state);

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
                    {state.job_pickup_form_2.voluntary_patient ? (
                      <Button
                        variant="outlined"
                        aria-label="add"
                        className={classes.iconMargin}
                        onClick={() => {
                          // if(window.confirm('Leave without saving changes?')){
                          props.history.push({
                            pathname: "/adminPanel/C2",
                            state: state._id,
                          });

                          // }
                        }}
                      >
                        <ArrowBackIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        aria-label="add"
                        className={classes.iconMargin}
                        onClick={() => {
                          // if(window.confirm('Leave without saving changes?')){
                          props.history.push({
                            pathname: "/adminPanel/C3",
                            state: state,
                          });

                          // }
                        }}
                      >
                        <ArrowBackIcon />
                      </Button>
                    )}
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3
                      className={classNames(classes.MarginControl)}
                      style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}
                    >
                      {console.log(state)}
                      {!state ? `FORM 4` : `FORM 4`}
                    </h3>
                  </div>
                </Paper>

                {/* //new design */}

                {/* status end */}
                {console.log(displayData)}
                {
                  // displayData.map((forms,index)=>(

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
                          amhp_prof_datetime: get(
                            state.job_pickup_form_4,
                            "amhp_prof_datetime",
                            ""
                          ),
                          amhp_prof_name_sign: get(
                            state.job_pickup_form_4,
                            "amhp_prof_name_sign",
                            ""
                          ),
                          checklist_sealed_custody: String(
                            get(
                              state.job_pickup_form_4,
                              "checklist_sealed_custody",
                              ""
                            )
                          ),
                          date: get(state.job_pickup_form_4, "date", ""),
                          informed_transfer_and_risk_issue: String(
                            get(
                              state.job_pickup_form_4,
                              "informed_transfer_and_risk_issue",
                              ""
                            )
                          ),
                          // job_id: "62874ab4fe6fcee8010d066c"
                          patient_searched_1: String(
                            get(
                              state.job_pickup_form_4,
                              "patient_searched_1",
                              ""
                            )
                          ),
                          property_searched: String(
                            get(
                              state.job_pickup_form_4,
                              "property_searched",
                              ""
                            )
                          ),
                          search_by_datetime_1: get(
                            state.job_pickup_form_4,
                            "search_by_datetime_1",
                            ""
                          ),
                          search_by_datetime_2: get(
                            state.job_pickup_form_4,
                            "search_by_datetime_2",
                            ""
                          ),
                          search_by_name_sign_1: get(
                            state.job_pickup_form_4,
                            "search_by_name_sign_1",
                            ""
                          ),
                          search_by_name_sign_2: get(
                            state.job_pickup_form_4,
                            "search_by_name_sign_2",
                            ""
                          ),
                          // status: false
                          travelled_abroad_last2week: String(
                            get(
                              state.job_pickup_form_4,
                              "travelled_abroad_last2week",
                              ""
                            )
                          ),
                          // user_id: "628b200a1167f561c90c4a12"
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
                                      Documents Provided:
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* row 2 */}
                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>
                                    Documentation sent online(AMHP/Allied
                                    Professionals):
                                  </h6>
                                </div>
                                <div className="col-4">
                                  <h6>Name & Signature:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="amhp_prof_name_sign"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                                <div className="col-4">
                                  <h6>Date & Time:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  <DateTimePicker
                                    onChange={(e) => {
                                      setFieldValue("datetimeofBooking", e);
                                    }}
                                    // onChange={(e)=>{console.log(JSON.stringify(e));onChangeDateTime(e)}}
                                    name="datetimeofBooking"
                                    value={values.amhp_prof_datetime}
                                    className=""
                                    disabled
                                    minDate={new Date()}
                                  />
                                </div>
                              </div>
                              {/* row 3 */}
                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>
                                    Patient belongings with checklist/sealed or
                                    not from custody:
                                  </h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-8 d-flex">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="checklist_sealed_custody"
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
                                      name="checklist_sealed_custody"
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
                              </div>
                              {/* row 4 */}
                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>Patient Searched:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-8 d-flex">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="patient_searched_1"
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
                                      name="patient_searched_1"
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
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                              </div>
                              {/* row 5 */}

                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>Searched by:</h6>
                                </div>
                                <div className="col-4">
                                  <h6>Name & Signature:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="search_by_name_sign_1"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                                <div className="col-4">
                                  <h6>Date & Time:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  <DateTimePicker
                                    onChange={(e) => {
                                      setFieldValue("datetimeofBooking", e);
                                    }}
                                    // onChange={(e)=>{console.log(JSON.stringify(e));onChangeDateTime(e)}}
                                    name="datetimeofBooking"
                                    value={values.search_by_datetime_1}
                                    className=""
                                    disabled
                                    minDate={new Date()}
                                  />
                                </div>
                              </div>

                              {/* row 6 */}
                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>Property Searched:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-8 d-flex">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="property_searched"
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
                                      name="property_searched"
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
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                              </div>
                              {/* row 7 */}

                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>Searched by:</h6>
                                </div>
                                <div className="col-4">
                                  <h6>Name & Signature:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="search_by_name_sign_2"
                                    style={{
                                      width: "100%",
                                      height: "35px",
                                      borderRadius: "5px",
                                      border: "1px solid #c4c4c4",
                                      paddingInlineStart: 10,
                                    }}
                                  />
                                </div>
                                <div className="col-4">
                                  <h6>Date & Time:</h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  <DateTimePicker
                                    onChange={(e) => {
                                      setFieldValue("datetimeofBooking", e);
                                    }}
                                    // onChange={(e)=>{console.log(JSON.stringify(e));onChangeDateTime(e)}}
                                    name="datetimeofBooking"
                                    value={values.search_by_datetime_2}
                                    className=""
                                    disabled
                                    minDate={new Date()}
                                  />
                                </div>
                              </div>

                              {/* row 8 */}
                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>
                                    Nearest relative informed of transfer and
                                    any risk issue:
                                  </h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-8 d-flex">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="informed_transfer_and_risk_issue"
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
                                      name="informed_transfer_and_risk_issue"
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
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                              </div>

                              {/* row 9 */}

                              <div className="row my-3">
                                <div className="col-4">
                                  <h6>
                                    Has the patient travelled abroad within last
                                    2 weeks:
                                  </h6>
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                </div>
                                <div className="col-8 d-flex">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="travelled_abroad_last2week"
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
                                      name="travelled_abroad_last2week"
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
                                  {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
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
                  //  ))
                }
              </div>
                      </div>
                      
            <div className="text-center">
              <Button
                variant="contained"
                style={{ backgroundColor: "#2765B3", color: "#fff" }}
                onClick={() => {
                  props.history.push({
                    pathname: "/adminPanel/C5",
                    state: state,
                  });
                }}
              >
                NEXT
              </Button>
            </div>
            <br />
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default C4;
