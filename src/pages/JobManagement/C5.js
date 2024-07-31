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

const C5 = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    getForm5Data();
  }, []);

  const getForm5Data = async () => {
    try {
      const response = await axios.get(`/admin/get-job/${state._id}`);
      console.log(response);
      console.log(response.data.data);
      setDisplayData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                          pathname: "/adminPanel/C4",
                          state: state,
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
                      {!state ? `Drop Off Form` : `Drop Off Form`}
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
                          // "_id": "628ca31e182cf5edca2ec196",
                          patient_risk: get(
                            displayData[0].job_drop_offs,
                            "patient_risk",
                            ""
                          ),
                          patient_initials: get(
                            displayData[0].job_drop_offs,
                            "patient_initials",
                            ""
                          ),
                          instructions_for_bathroom_toilet: get(
                            displayData[0].job_drop_offs,
                            "instructions_for_bathroom_toilet",
                            ""
                          ),
                          instruction_sleep: get(
                            displayData[0].job_drop_offs,
                            "instruction_sleep",
                            ""
                          ),
                          cad_urn_num: get(
                            displayData[0].job_drop_offs,
                            "cad_urn_num",
                            ""
                          ),
                          have_handcuffs: String(
                            get(
                              displayData[0].job_drop_offs,
                              "have_handcuffs",
                              ""
                            )
                          ),
                          handcuffs_reason: get(
                            displayData[0].job_drop_offs,
                            "handcuffs_reason",
                            ""
                          ),
                          has_the_cell_been_cleaned: String(
                            get(
                              displayData[0].job_drop_offs,
                              "has_the_cell_been_cleaned",
                              ""
                            )
                          ),
                          if_yes: get(
                            displayData[0].job_drop_offs,
                            "if_yes",
                            ""
                          ),
                          staff_mem__receiving_handover_detail: get(
                            displayData[0].job_drop_offs,
                            "staff_mem__receiving_handover_detail",
                            ""
                          ),
                          receiving_staff_mem_sign: get(
                            displayData[0].job_drop_offs,
                            "receiving_staff_mem_sign",
                            ""
                          ),
                          position: get(
                            displayData[0].job_drop_offs,
                            "position",
                            ""
                          ),
                          patient_transport_service_staff_name: get(
                            displayData[0].job_drop_offs,
                            "patient_transport_service_staff",
                            [
                              { name: "check", sign: "ddfsf" },
                              { name: "check", sign: "ddfsf" },
                            ]
                          ),
                          ambu_crew_staff: get(
                            displayData[0].job_drop_offs,
                            "ambu_crew_staff",
                            [
                              { name: "check2", sign: "ddfsf" },
                              { name: "check2", sign: "ddfsf" },
                            ]
                          ),

                          arrival_time: get(
                            displayData[0].job_drop_offs,
                            "arrival_time",
                            ""
                          ),
                          // user_id: "628b200a1167f561c90c4a12",
                          // job_id: "62874ab4fe6fcee8010d066c",
                          // status: false,
                          drop_off_date: get(
                            displayData[0].job_drop_offs,
                            "drop_off_date",
                            ""
                          ),
                          date: get(displayData[0].job_drop_offs, "date", ""),
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
                                      Patient Information:
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* row 2 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>Patient Risk:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="patient_risk"
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
                                <div className="col-12">
                                  <h6>Patient Initials:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="patient_initials"
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
                              {/* row 4 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>Instructions for bathroom/toilet:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="instructions_for_bathroom_toilet"
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
                              {/* row 5 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>Instructions for sleep:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="instruction_sleep"
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
                              {/* row 6 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>CAD/URN Number:</h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="cad_urn_num"
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
                              {/* row 7 */}
                              <div className="row my-3">
                                <div className="col-6">
                                  <h6>Have Handcuffs been used?</h6>
                                  <div className="d-flex">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="have_handcuffs"
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
                                        name="have_handcuffs"
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

                                    {/* <Field type="text" readOnly  name="" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <h6>Has the cell been cleaned:</h6>
                                  <div className="d-flex">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="has_the_cell_been_cleaned"
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
                                        name="has_the_cell_been_cleaned"
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
                              {/* handcuff reason */}
                              {values.have_handcuffs == "true" ? (
                                <div className="row my-3">
                                  <div className="col-12">
                                    <h6>Handcuffs Reason</h6>
                                    <Field
                                      className="w-100"
                                      // name="handcuffs_reason"
                                      name="if_yes"
                                      // variant="outlined"
                                      type="text"
                                      // as="select"
                                      // inputProps={{name: "name"}}
                                      readOnly
                                      style={{
                                        width: "",
                                        height: 35,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {/* row 8 */}
                              {/* <div className="row my-3">
                                <div className="col-12">
                                  <h6>If Yes</h6>
                                  <Field
                                    className="w-100"
                                    name="if_yes"
                                    // variant="outlined"
                                    type="text"
                                    // as="select"
                                    // inputProps={{name: "name"}}
                                    readOnly
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  />
                               
                                </div>
                              </div> */}
                              {/* row 9 */}

                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>
                                    Details of staff member recieving handover
                                    details name:
                                  </h6>
                                  <Field
                                    type="text"
                                    readOnly
                                    name="staff_mem__receiving_handover_detail"
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
                              {/* row 10 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>
                                    Recieving staff member signature(Confirming
                                    the information is correct):
                                  </h6>
                                  {/* <Field type="text" readOnly  name="receiving_staff_mem_sign" style={{width:"100%",height:"35px",borderRadius:"5px",border:"1px solid #c4c4c4",paddingInlineStart:10}}/> */}
                                  <img
                                    readOnly
                                    style={{ width: 50, height: 50 }}
                                    src={
                                      forms.job_drop_offs
                                        ? forms.job_drop_offs
                                            .receiving_staff_mem_sign
                                        : ""
                                    }
                                    alt=".."
                                  />
                                </div>
                              </div>
                              {/* row 11 */}
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
                                  <h6>Date&Time:</h6>
                                  <DateTimePicker
                                    className="w-100"
                                    onChange={(e) => {
                                      setFieldValue("drop_off_date", e);
                                    }}
                                    // onChange={(e)=>{console.log(JSON.stringify(e));onChangeDateTime(e)}}
                                    name="drop_off_date"
                                    value={values.drop_off_date}
                                    disabled
                                    // minDate={new Date()}
                                  />
                                </div>
                              </div>
                              {/* row 12 */}

                              <div className="row my-3">
                                <div className="col-6">
                                  <h6>
                                    L&T Patient Transport Service Staff Name
                                  </h6>
                                </div>
                                <div className="col-6">
                                  <h6>L&T Patient Transport Service Sign:</h6>
                                </div>
                              </div>
                              <div className="row my-3">
                                {values.ambu_crew_staff.map((item, index) => (
                                  <>
                                    <div className="col-6">
                                      <Field
                                        className="my-2"
                                        key={index}
                                        value={item.name}
                                        type="text"
                                        readOnly
                                        // name="patient_transport_service_staff_name"
                                        style={{
                                          width: "60%",
                                          height: "35px",
                                          borderRadius: "5px",
                                          border: "1px solid #c4c4c4",
                                          paddingInlineStart: 10,
                                        }}
                                      />
                                    </div>
                                    <div className="col-6 ">
                                      <img
                                        className="my-2"
                                        readOnly
                                        style={{ width: 50, height: 50 }}
                                        src={item.sign ? item.sign : ""}
                                        alt=".."
                                      />
                                    </div>
                                  </>
                                ))}
                              </div>

                              {/* row 13 */}
                              <div className="row my-3">
                                <div className="col-12">
                                  <h6>Arrival Time:</h6>
                                  <TimePicker
                                    className="w-100"
                                    onChange={(e) => {
                                      setFieldValue("pickupTime", e);
                                    }}
                                    value={values.arrival_time}
                                    disabled
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
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default C5;
