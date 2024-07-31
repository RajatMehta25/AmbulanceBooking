import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import KErrorMessage from "./KErrorMessage";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "../../axios";
import { toast } from "react-toastify";
import { get, set, sortBy } from "lodash";
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

const ViewInspectionForm = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;

  console.log(state[1]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    startDate !== null && endDate !== null ? getFilteredData() : filterDates(state[0]);
  }, [startDate, endDate]);

  useEffect(() => {
    if (state[0] === null) {
      toast.error("No Data Found", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
    }
  }, []);

  const filterDates = (date1) => {
    // if(startDate!==null&&endDate!==null)
    // {date1.filter((item) => (
    //  (new window.Date(item.date) >= startDate && new window.Date(item.date)<= endDate)? item:alert("no data found")
    // console.log(item.date)
    // console.log(new window.Date(item.date))
    // ))}
    // else{
    // return date1
    // }
    if (date1 !== null && date1 !== undefined) {
      // return date1.filter((item) => (
      //   (new window.Date(item.date) >= startDate && new window.Date(item.date)<= endDate)? item:alert("no data found")
      // ))
      // console.log(date1);
      setDisplayData(date1);
    } else {
      toast.info("Please Select Dates", {
        position: toast.POSITION.TOP_RIGHT,
      });

      console.log(startDate);
      console.log(endDate);

      // console.log(state);
    }
  };
  const getFilteredData = async () => {
    let newData = new Date(startDate);
    let newData1 = new Date(endDate);
    try {
      const { data } = await axios.post(`/admin/inspection-filter`, {
        user_id: state[1],
        from_date: newData.getMonth() + 1 + "/" + newData.getDate() + "/" + newData.getFullYear(),
        to_date: newData1.getMonth() + 1 + "/" + newData1.getDate() + "/" + newData1.getFullYear(),
      });
      console.log(data);
      console.log(newData.getMonth() + 1 + "/" + newData.getDate() + "/" + newData.getFullYear());
      console.log(newData1.getMonth() + 1 + "/" + newData1.getDate() + "/" + newData1.getFullYear());
      console.log(newData1.toLocaleDateString());
      if (data.data !== null) {
        setDisplayData(data.data);
      } else {
        setDisplayData([]);
        toast.error("No Data Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper style={{ minHeight: "70vh" }}>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.addNewCategory)}>
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        // if(window.confirm('Leave without saving changes?')){
                        props.history.push({
                          pathname: "/adminPanel/user-management",
                        });

                        // }
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3 className={classNames(classes.MarginControl)} style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}>
                      {console.log(state)}
                      {!state ? `INSPECTION FORM` : `INSPECTION FORM`}
                    </h3>
                  </div>

                  <div>
                    {" "}
                    <Button
                      variant="contained"
                      className="buttoncss"
                      style={{ backgroundColor: "#2765B3", color: "#fff" }}
                      onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                      }}
                    >
                      {" "}
                      RESET DATES
                    </Button>
                  </div>
                </Paper>
                <Paper elevation={0} className="my-3">
                  <div className="d-flex justify-content-center text-center align-items-baseline">
                    <h5>Start Date:</h5> &nbsp;
                    <DatePicker
                      value={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                    />
                    &emsp;<h5>End Date:&nbsp;</h5>
                    <DatePicker
                      onChange={(date) => {
                        setEndDate(date);
                      }}
                      minDate={startDate}
                      value={endDate}
                    />
                  </div>
                </Paper>
                {/* //new design */}

                {/* status end */}
                {console.log("disp", displayData)}
                {
                  // displayData
                  sortBy(displayData, "Date_of_inspection")
                    .reverse()
                    .map((forms, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                          <Typography className={classes.heading}>{`Inspection Form ${index + 1} , Dated:${new Date(
                            get(forms, "Date_of_inspection", "")
                          ).toLocaleDateString()}`}</Typography>
                          &emsp;
                          {/* <Typography className={classes.secondaryHeading}>Date:{new window.Date(forms.date).toDateString() }</Typography> */}
                        </AccordionSummary>
                        <AccordionDetails style={{ justifyContent: "center" }}>
                          {console.log(forms)}
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
                                  reg_num_or_make_model: get(forms, "reg_num_or_make_model", ""),
                                  // make_model_inspected: get(
                                  //   forms,
                                  //   "make_model_inspected",
                                  //   ""
                                  // ),
                                  // reg_num: get(forms, "reg_num", ""),
                                  Date_of_inspection: get(forms, "Date_of_inspection", ""),
                                  body_work: String(get(forms.evc, "body_work", "")),
                                  body_work_comment: get(forms.evc, "body_work_comment", ""),
                                  windscreen_wipes: String(get(forms.evc, "windscreen_wipes", "")),
                                  windscreen_wipes_comment: get(forms.evc, "windscreen_wipes_comment", ""),
                                  front_light: String(get(forms.evc, "front_light", "")),
                                  front_light_comment: get(forms.evc, "front_light_comment", ""),
                                  rear_light: String(get(forms.evc, "rear_light", "")),
                                  rear_light_comment: get(forms.evc, "rear_light_comment", ""),
                                  spare_wheel_and_jack: String(get(forms.evc, "spare_wheel_and_jack", "")),
                                  spare_wheel_and_jack_comment: get(forms.evc, "spare_wheel_and_jack_comment", ""),
                                  tyre_wear_and_pressure: String(get(forms.evc, "tyre_wear_and_pressure", "")),
                                  tyre_wear_and_pressure_comment: get(forms.evc, "tyre_wear_and_pressure_comment", ""),

                                  door_mirror: String(get(forms.ivc, "door_mirror", "")),
                                  door_mirror_comment: get(forms.ivc, "door_mirror_comment", ""),
                                  extinguisher: String(get(forms.ivc, "extinguisher", "")),
                                  extinguisher_comment: get(forms.ivc, "extinguisher_comment", ""),
                                  first_aid_kit: String(get(forms.ivc, "first_aid_kit", "")),
                                  first_aid_kit_comment: get(forms.ivc, "first_aid_kit_comment", ""),
                                  lookable_cupboards: String(get(forms.ivc, "lookable_cupboards", "")),
                                  lookable_cupboards_comment: get(forms.ivc, "lookable_cupboards_comment", ""),
                                  real_view_mirror: String(get(forms.ivc, "real_view_mirror", "")),
                                  real_view_mirror_comment: get(forms.ivc, "real_view_mirror_comment", ""),
                                  seat_adjustment: String(get(forms.ivc, "seat_adjustment", "")),
                                  seat_adjustment_comment: get(forms.ivc, "seat_adjustment_comment", ""),
                                  seat_bealt: String(get(forms.ivc, "seat_bealt", "")),
                                  seat_bealt_comment: get(forms.ivc, "seat_bealt_comment", ""),
                                  stretcher: String(get(forms.ivc, "stretcher", "")),
                                  stretcher_comment: get(forms.ivc, "stretcher_comment", ""),
                                  wheelchair: String(get(forms.ivc, "wheelchair", "")),
                                  wheelchair_comment: get(forms.ivc, "wheelchair_comment", ""),

                                  brake_fluid: String(get(forms.fluid_check, "brake_fluid", "")),
                                  brake_fluid_comment: get(forms.fluid_check, "brake_fluid_comment", ""),
                                  clutch_fluid: String(get(forms.fluid_check, "clutch_fluid", "")),
                                  clutch_fluid_comment: get(forms.fluid_check, "clutch_fluid_comment", ""),
                                  coolant_level: String(get(forms.fluid_check, "coolant_level", "")),
                                  coolant_level_comment: get(forms.fluid_check, "coolant_level_comment", ""),
                                  oil_level: String(get(forms.fluid_check, "oil_level", "")),
                                  oil_level_comment: get(forms.fluid_check, "oil_level_comment", ""),
                                  power_steering_fluid: String(get(forms.fluid_check, "power_steering_fluid", "")),
                                  power_steering_fluid_comment: get(forms.fluid_check, "power_steering_fluid_comment", ""),
                                  washer_fluid_level: String(get(forms.fluid_check, "washer_fluid_level", "")),
                                  washer_fluid_level_comment: get(forms.fluid_check, "washer_fluid_level_comment", ""),

                                  all_light: String(get(forms.function_check, "all_light", "")),
                                  all_light_comment: get(forms.function_check, "all_light_comment", ""),
                                  broke: String(get(forms.function_check, "broke", "")),
                                  broke_comment: get(forms.function_check, "broke_comment", ""),
                                  condition_vehicle: String(get(forms.function_check, "condition_vehicle", "")),
                                  description: get(forms.function_check, "description", ""),
                                  fuel_level: String(get(forms.function_check, "fuel_level", "")),
                                  fuel_level_comment: get(forms.function_check, "fuel_level_comment", ""),
                                  horn: String(get(forms.function_check, "horn", "")),
                                  horn_comment: get(forms.function_check, "horn_comment", ""),
                                  ramp_toll_kit: String(get(forms.function_check, "ramp_toll_kit", "")),
                                  ramp_toll_kit_comment: get(forms.function_check, "ramp_toll_kit_comment", ""),
                                  steering: String(get(forms.function_check, "steering", "")),
                                  steering_comment: get(forms.function_check, "steering_comment", ""),
                                  whipper_washer: String(get(forms.function_check, "whipper_washer", "")),
                                  whipper_washer_comment: get(forms.function_check, "whipper_washer_comment", ""),

                                  name: get(forms.sign_off.name, "first_name", ""),
                                  signature: get(forms.sign_off, "signature", ""),
                                  date: get(forms, "date", ""),
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
                                            <h4 className="text-white p-1">Basic Details:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 2 */}
                                      <div className="row">
                                        <div className="col-12">
                                          <h6>Registration Number or Make/Model :</h6>
                                          <Field
                                            type="text"
                                            readOnly
                                            name="reg_num_or_make_model"
                                            style={{
                                              width: "100%",
                                              height: "35px",
                                              borderRadius: "5px",
                                              border: "1px solid #c4c4c4",
                                              paddingInlineStart: 10,
                                            }}
                                          />
                                          {/* <h6>Register Number :</h6>
                                          <Field
                                            type="text"
                                            readOnly
                                            name="reg_num"
                                            style={{
                                              width: "100%",
                                              height: "35px",
                                              borderRadius: "5px",
                                              border: "1px solid #c4c4c4",
                                              paddingInlineStart: 10,
                                            }}
                                          /> */}
                                          <h6>Date of Inspection :</h6>
                                          <DatePicker
                                            onChange={(e) => {
                                              setFieldValue("Date_of_inspection", e);
                                            }}
                                            disabled={true}
                                            name="Date_of_inspection"
                                            value={values.Date_of_inspection}
                                            className="w-100"
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
                                            <h4 className="text-white p-1">External Vehicle Condition:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 5*/}
                                      {/* internal structure 1 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Body Work :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around align-items-center ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="body_work"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="body_work"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="body_work_comment"
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
                                          <h6>Windscreen/Wipes :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="windscreen_wipes"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="windscreen_wipes"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="windscreen_wipes_comment"
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
                                          <h6>Front Light :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="front_light"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="front_light"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="front_light_comment"
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
                                          <h6>Rear Light :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="rear_light"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="rear_light"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="rear_light_comment"
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
                                          <h6>Tyre wear & Pressure :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="tyre_wear_and_pressure"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="tyre_wear_and_pressure"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="tyre_wear_and_pressure_comment"
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
                                          <h6>Spare wheel & Jack:</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="spare_wheel_and_jack"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="spare_wheel_and_jack"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="spare_wheel_and_jack_comment"
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

                                      {/* section 3 */}
                                      {/* row 5 */}
                                      <div className="row my-1">
                                        <div className="col-12 ">
                                          <div
                                            style={{
                                              backgroundColor: "#2765B3",
                                              borderRadius: "2px",
                                            }}
                                          >
                                            {" "}
                                            <h4 className="text-white p-1">Internal Vehicle Condition:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 6*/}
                                      {/* internal structure 7 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Seat Belt :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="seat_bealt"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="seat_bealt"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="seat_bealt_comment"
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
                                      {/* internal structure 8 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Door Mirror :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="door_mirror"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="door_mirror"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="door_mirror_comment"
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
                                      {/* internal structure 9 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Rear View Mirror :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="real_view_mirror"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="real_view_mirror"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="real_view_mirror_comment"
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
                                      {/* internal structure 10 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Seat Adjustment :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="seat_adjustment"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="seat_adjustment"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="seat_adjustment_comment"
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
                                      {/* internal structure 11 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>First Aid Kit(if fitted) :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="first_aid_kit"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              readOnly
                                              name="first_aid_kit"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="first_aid_kit_comment"
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
                                      {/* internal structure 12 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Locakable Cupboards(if fitted) :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="lookable_cupboards"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="lookable_cupboards"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="lookable_cupboards_comment"
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

                                      {/* internal structure 12.1 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Extinguisher(if fitted) :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="extinguisher"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="extinguisher"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="extinguisher_comment"
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

                                      {/* internal structure 12.2 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Stretcher :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="stretcher"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="stretcher"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="stretcher_comment"
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

                                      {/* internal structure 12.3 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Wheelchair :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="wheelchair"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="wheelchair"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="wheelchair_comment"
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

                                      {/* section 4 */}
                                      {/* row 7 */}
                                      <div className="row my-1">
                                        <div className="col-12 ">
                                          <div
                                            style={{
                                              backgroundColor: "#2765B3",
                                              borderRadius: "2px",
                                            }}
                                          >
                                            {" "}
                                            <h4 className="text-white p-1">Fluid Checks:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 8*/}
                                      {/* internal structure 13 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Oil Level :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="oil_level"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="oil_level"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="oil_level_comment"
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
                                      {/* internal structure 14 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Coolant Level :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="coolant_level"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="coolant_level"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="coolant_level_comment"
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
                                      {/* internal structure 15 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Washer Fluid Level :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="washer_fluid_level"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="washer_fluid_level"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="washer_fluid_level_comment"
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
                                      {/* internal structure 16 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Power Steering Fluid :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="power_steering_fluid"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="power_steering_fluid"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="power_steering_fluid_comment"
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
                                      {/* internal structure 17 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Break Fluid:</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="brake_fluid"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="brake_fluid"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="brake_fluid_comment"
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
                                      {/* internal structure 18 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Clutch Fluid :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="clutch_fluid"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="clutch_fluid"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="clutch_fluid_comment"
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

                                      {/* section 5 */}
                                      {/* row 8 */}
                                      <div className="row my-1">
                                        <div className="col-12 ">
                                          <div
                                            style={{
                                              backgroundColor: "#2765B3",
                                              borderRadius: "2px",
                                            }}
                                          >
                                            {" "}
                                            <h4 className="text-white p-1">Function Checks:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 9*/}
                                      {/* internal structure 19 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>All Lights :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="all_light"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="all_light"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="all_light_comment"
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
                                      {/* internal structure 20 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Horn :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="horn"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="horn"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="horn_comment"
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
                                      {/* internal structure 21 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Whipper & Washer :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="whipper_washer"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="whipper_washer"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="whipper_washer_comment"
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
                                      {/* internal structure 22 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Steering :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="steering"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="steering"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="steering_comment"
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
                                      {/* internal structure 23 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Brake :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="broke"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="broke"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="broke_comment"
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
                                      {/* internal structure 24 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Fuel Level :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="fuel_level"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="fuel_level"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="fuel_level_comment"
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

                                      {/* internal structure 24.1 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Ramp/Tail Kit :</h6>
                                        </div>
                                        <div className="col-4 d-flex justify-content-around  ">
                                          <div className="d-flex">
                                            <Field
                                              className=""
                                              name="ramp_toll_kit"
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
                                              Ok
                                            </label>
                                          </div>
                                          <div className="d-flex">
                                            {" "}
                                            <Field
                                              className=""
                                              name="ramp_toll_kit"
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
                                              Fault
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="ramp_toll_kit_comment"
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
                                      {/* internal structure 24.2 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-12">
                                          <h5>Details of any faulty Items(if none,type none) :</h5>
                                          <Field
                                            type="text"
                                            readOnly
                                            name="description"
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
                                      {/* internal structure 25 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-12">
                                          <h5>Condition of Vehicle :</h5>
                                          <Field
                                            type="text"
                                            readOnly
                                            name="condition_vehicle"
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

                                      {/* section 6 */}
                                      {/* row 10*/}
                                      <div className="row my-1">
                                        <div className="col-12 ">
                                          <div
                                            style={{
                                              backgroundColor: "#2765B3",
                                              borderRadius: "2px",
                                            }}
                                          >
                                            {" "}
                                            <h4 className="text-white p-1">Inspection Form sign-off:</h4>
                                          </div>
                                        </div>
                                      </div>
                                      {/* row 11*/}
                                      {/* internal structure 25 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Name :</h6>
                                        </div>
                                        <div className="col-8 ">
                                          <Field
                                            type="text"
                                            readOnly
                                            name="name"
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
                                      {/* internal structure 26 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Date :</h6>
                                        </div>
                                        <div className="col-8 ">
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
                                      {/* internal structure 27 */}
                                      <div className="row my-2 align-items-center">
                                        <div className="col-4">
                                          <h6>Signature :</h6>
                                        </div>
                                        <div className="col-8 ">
                                          <img
                                            name="signature"
                                            readOnly
                                            style={{ width: 300, height: 150 }}
                                            src={values.signature}
                                            alt=".."
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
                        </AccordionDetails>
                      </Accordion>
                    ))
                }
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewInspectionForm;
