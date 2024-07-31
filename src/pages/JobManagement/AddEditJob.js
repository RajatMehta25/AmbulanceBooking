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
import { get, set } from "lodash";
import { v4 as uuidv4 } from "uuid";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import { LOCATION_API_KEY } from "../../statics/constants";
// import './AddEditCategory.css'
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import DateTimePicker from "react-datetime-picker";
// import 'react-clock/dist/Clock.css';
import RSelect from "react-select";

import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "./AddEditJob.css";
import { FlashOffRounded } from "@material-ui/icons";

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

const AddEditJob = (props) => {
  const classes = useStyles();

  //  data from previous page

  const {
    location: { state },
  } = props;

  const [valueLocationPickup, setValueLocationPickup] = useState(null);
  const [valueLocationDestination, setValueLocationDestination] = useState(null);
  const [valueTime, onChangeTime] = useState(null);
  const [carRegistrationNumbers, setCarRegistrationNumbers] = useState([]);
  // const [phone, setPhone] = useState('');
  // console.log(phone);
  // const [DialCode,setDialCode] = useState('');
  //Validation Schema

  const [valueDateTime, onChangeDateTime] = useState(null);
  const [valueDOB, onChangeDOB] = useState(null);
  let NationalitySelect = [
    "British",
    "White British",
    "Black British",
    "Black African",
    "Chinese",
    "Black Ghanaian",
    "British Asian",
    "Mixed Race",
    "Saudi Arabian",
    "Philippines",
    "Egyptian",
    "Somalian",
    "Irish",

    "Polish",
    "others.(Alpha order)",
  ];
  let AmbulancePlateNoSelect = [
    `FJ21 HJD`,
    `YF13 XVL`,
    `OY63 MKM`,
    `SF17 LCU`,
    `NX65 KYV`,
    `WA64 FDF`,
    `FJ21 HJD`,
    `YF13 XVL`,
    `MX22 HDO`,
    `MX22 EGF`,
    `OU72 CKJ`,
  ];
  let FundingAuthoritySelect = [
    `BHFT`,
    `SABP`,
    `FHFT`,
    `Oxford Health`,
    `Oxford Health University Hospital`,
    `Ashford and St. Peters`,
    `Bracknell Forest`,
    `Surrey Heartlands`,
    `NHS Frimley CCG`,
    `NHS Portsmouth CCG`,
    `Somerset Partnership`,
  ];
  let MentalHealthSelect = [
    `Section 2`,
    `Section 3`,
    `Section 135`,
    `Section 135.1`,
    `Section 135.2`,
    `Section 136`,
    `Section 17`,
    `Informal`,
    `CTO`,
  ];
  const ReligionSelect = ["Hindu", "Muslim", "Sikh", "Christian", "Other"];
  const MobilitySelect = [
    "Walker",
    "Uses a walking stick",
    "Uses a zimmer frame",
    "Needs support from staff",
    "Needs wheelchair",
    "Needs stretcher",
    "Stretcher with use of hoist",

    "Wheelchair with use of hoist",
  ];
  const CommunicationSelect = [
    "Needs an interpreter",
    "Confused and disorientated",
    "Learning disabilities ",
    "Mutism",
    "No issue",
  ];

  const diagnosisArray = [
    "Schizophrenia",

    "Paranoid",

    "Psychosis",

    "Bipolar",

    "Dementia",

    "Suicidal",

    "EUPD",

    "Self-Harm",

    "Physical Health",

    "Substance Misuse",

    "Alcohol Misuse",

    "Alzheimer’s",

    "Delusional",

    "Self-Neglect",
  ];

  useEffect(() => {
    getcrewList();
    getCarRegistrationNumber();
    // console.log(uuidv4());
  }, []);

  const [allcrew, setAllCrew] = useState();
  const [ambulanceCrewNameSelect, setAmbulanceCrewNameSelect] = useState([{}]);

  const getcrewList = async () => {
    try {
      const { data } = await axios.get("/admin/users");
      console.log(data.data);
      //  let uid = Math.floor(new Date().valueOf() * Math.random());
      const ActiveCrewList = data.data.filter((item) => item.is_duty === true);
      console.log(ActiveCrewList);
      setAmbulanceCrewNameSelect(
        ActiveCrewList.map((item) => ({
          label: item.first_name,
          value: item.first_name,
          id: uuidv4(),
        }))
      );

      // console.log(uid)
    } catch (err) {
      console.log(err);
    }
  };
  const getCarRegistrationNumber = async () => {
    try {
      const { data } = await axios.get(`/users/car-registration-number`);
      console.log(data.data);
      setCarRegistrationNumbers(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required("Please Enter Patient Name"),
    // dob: yup.date().required("Please Enter Date of Birth"),
    Gender: yup.string().required("Select the Gender"),
    personBooking: yup.string().required("Please Enter a Name"),
    mobility: yup.string().required("Required"),
    femaleEscort: yup.string().required("Required"),
    comIssue: yup.string().required("Required"),
    ambulanceCrewName: yup.array().min(1).required("Required").nullable(),
    ambulancePlateNo: yup.string().required("Plate No. is Required"),
    nationality: yup.string().required("Nationality is Required"),
    religion: yup.string().required("Religion is Required"),
    nhsNumber: yup.string().required("Required"),
    // datetimeofBooking: yup.date().required("Select Date & Time"),
    // nameOfManager: yup.string().required("Manager's name is Required"),
    gpCode: yup.string().required("Required"),
    fundingAuthority: yup.string().required("Required"),
    describeFundingAuthority: yup.string().required("Required"),
    mentalHealthSection: yup.string().required("Required"),
    pickupLocation: yup.string().required("Pickup Location is Required"),
    // pickupTime: yup.string().required("Pickup Time is Required"),
    destinationLocation: yup.string().required("Destination is Required"),
    handover_taken: yup.string().required("Required"),
    safeguardingConcerns: yup.boolean().required("Select a Value"),
    safeguardingConcernDesc: yup.string().when("safeguardingConcerns", {
      is: (safeguardingConcerns) => safeguardingConcerns === true,
      then: yup.string().required("Description is Required"),
    }),
    safeguarding_reasons_reported_by: yup.string().when("safeguardingConcerns", {
      is: (safeguardingConcerns) => safeguardingConcerns === true,
      then: yup.string().required("Reason is Required"),
    }),
    // safeguarding_reasons_date: yup.string().when("safeguardingConcerns", {
    //   is: (safeguardingConcerns) => safeguardingConcerns === true,
    //   then: yup.string().required("date is Required"),
    // }),
    riskOfAbsconding: yup.boolean().required("Select a Value"),
    assault: yup.boolean().required("Select a Value"),
    aggressionViolence: yup.boolean().required("Select a Value"),
    selfHarmSuicidal: yup.boolean().required("Select a Value"),
    PICU_ward: yup.boolean().required("Select a Value"),
    patient_restraint: yup.boolean().required("Select a Value"),
    restraint_required: yup.boolean().required("Select a Value"),
    young_persons_14_17yrs: yup.boolean().required("Select a Value"),
    patient_injured: yup.boolean().required("Select a Value"),
    highly_infectious_disease: yup.boolean().required("Select a Value"),
    physical_health: yup.boolean().required("Select a Value"),
    any_special_conditions: yup.boolean().required("Select a Value"),
    rapid_tranquilisers_used: yup.boolean().required("Select a Value"),
    rapid_tranquilisers_used_desc: yup.string().when("rapid_tranquilisers_used", {
      is: (rapid_tranquilisers_used) => rapid_tranquilisers_used === true,
      then: yup.string().required("Reason is Required"),
    }),
    diagnosis: yup.string().required("Required"),
    // gender: yup.string().required("Gender is Required!"),
    // Rnumber: yup.string().required("Registration Number is Required!"),

    //    desc: yup
    //    .string()
    //    .min(5, "too small!")
    //    .max(500, "Too Long String!")
    //    .required("Required!"),
  });

  // ADDING NEW CATEGORY

  const addNewCategory = async (values) => {
    try {
      console.log(values);

      const { data } = await axios.post("/admin/job", {
        name: values.name,
        dob: values.dob,
        gender: values.Gender,
        person_making_booking: values.personBooking,
        mobility: values.mobility,
        female_escort: values.femaleEscort,
        communication_issue: values.comIssue,
        ambu_crew_name: values.ambulanceCrewName.filter((item) => item.value),
        ambu_plate_no: values.ambulancePlateNo,
        nationality: values.nationality,
        religion: values.religion,
        nhs_num: values.nhsNumber,
        booking_datetime: values.datetimeofBooking,
        duty_authorizing_manager: values.nameOfManager,
        gp_code: values.gpCode,
        funding_authority: values.fundingAuthority,
        describe_funding_authority: values.describeFundingAuthority,
        mental_health: values.mentalHealthSection,
        pickup_location: values.pickupLocation,
        pickup_time: values.pickupTime,

        destination_location: values.destinationLocation,
        handover_taken: values.handover_taken,
        safeguarding_concern: values.safeguardingConcerns === "true",
        safeguarding_reasons_desc: values.safeguardingConcernDesc,
        safeguarding_reasons_reported_by: values.safeguarding_reasons_reported_by,
        safeguarding_reasons_date: values.safeguarding_reasons_date,
        risk_of_absconding: values.riskOfAbsconding === "true",
        assault: values.assault === "true",

        aggression_violence: values.aggressionViolence === "true",
        self_harm_suicidal: values.selfHarmSuicidal === "true",
        pickup_lat: values.pickup_lat,
        pickup_long: values.pickup_long,
        destination_lat: values.destination_lat,
        destination_long: values.destination_long,
        PICU_ward: values.PICU_ward === "true",
        patient_restraint: values.patient_restraint === "true",
        restraint_required: values.restraint_required === "true",
        young_persons_14_17yrs: values.young_persons_14_17yrs === "true",
        patient_injured: values.patient_injured === "true",
        highly_infectious_disease: values.highly_infectious_disease === "true",
        physical_health: values.physical_health === "true",
        any_special_conditions: values.any_special_conditions === "true",
        rapid_tranquilisers_used: values.rapid_tranquilisers_used === "true",
        rapid_tranquilisers_used_desc: values.rapid_tranquilisers_used_desc,
        diagnosis: values.diagnosis,
      });
      props.history.push({
        pathname: "/adminPanel/job-management",
        state: "5",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Category . update api

  const EditCategory = async (values) => {
    try {
      console.log(values);

      const { data } = await axios.put(`/admin/job/${state[0].id}`, {
        name: values.name,
        dob: values.dob,
        gender: values.Gender,
        person_making_booking: values.personBooking,
        mobility: values.mobility,
        female_escort: values.femaleEscort,
        communication_issue: values.comIssue,
        ambu_crew_name: values.ambulanceCrewName.filter((item) => item.value),
        ambu_plate_no: values.ambulancePlateNo,
        nationality: values.nationality,
        religion: values.religion,
        nhs_num: values.nhsNumber,
        booking_datetime: values.datetimeofBooking,
        duty_authorizing_manager: values.nameOfManager,
        gp_code: values.gpCode,
        funding_authority: values.fundingAuthority,
        describe_funding_authority: values.describeFundingAuthority,
        mental_health: values.mentalHealthSection,
        pickup_location: values.pickupLocation,
        pickup_time: values.pickupTime,

        destination_location: values.destinationLocation,
        handover_taken: values.handover_taken,
        safeguarding_concern: values.safeguardingConcerns === "true",
        safeguarding_reasons_desc: values.safeguardingConcernDesc,
        safeguarding_reasons_reported_by: values.safeguarding_reasons_reported_by,
        safeguarding_reasons_date: values.safeguarding_reasons_date,
        risk_of_absconding: values.riskOfAbsconding === "true",
        assault: values.assault === "true",

        aggression_violence: values.aggressionViolence === "true",
        self_harm_suicidal: values.selfHarmSuicidal === "true",
        pickup_lat: values.pickup_lat,
        pickup_long: values.pickup_long,
        destination_lat: values.destination_lat,
        destination_long: values.destination_long,
        PICU_ward: values.PICU_ward === "true",
        patient_restraint: values.patient_restraint === "true",
        restraint_required: values.restraint_required === "true",
        young_persons_14_17yrs: values.young_persons_14_17yrs === "true",
        patient_injured: values.patient_injured === "true",
        highly_infectious_disease: values.highly_infectious_disease === "true",
        physical_health: values.physical_health === "true",
        any_special_conditions: values.any_special_conditions === "true",
        rapid_tranquilisers_used: values.rapid_tranquilisers_used === "true",
        rapid_tranquilisers_used_desc: values.rapid_tranquilisers_used_desc,
        diagnosis: values.diagnosis,
      });
      props.history.push({
        pathname: "/adminPanel/job-management",
        state: state && state[1] ? state[1] : "5",
      });
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(valueDateTime);
  console.log(valueDOB);
  console.log(valueLocationPickup);
  return (
    <React.Fragment>
      <div className="page-content">
        <div className={classes.root}>
          <Paper>
            <div className={classes.paperPaddingRightLeft}>
              <div className="py-4">
                <Paper elevation={0} className={classNames(classes.paperHeading, classes.addNewCategory)}>
                  <div className={classes.headingSellerDetails}>
                    <Button
                      variant="outlined"
                      aria-label="add"
                      className={classes.iconMargin}
                      onClick={() => {
                        if (window.confirm("Leave without saving changes?")) {
                          props.history.push({
                            pathname: "/adminPanel/job-management",
                            state: state && state[1] ? state[1] : null,
                          });
                        }
                      }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  </div>
                  <div className={classNames(classes.addNewCategoryHeading)}>
                    {" "}
                    <h3 className={classNames(classes.MarginControl)} style={{ marginBottom: "-0.5rem", marginLeft: "-135px" }}>
                      {console.log(state)}
                      {!state ? `ADD NEW JOB` : `EDIT JOB`}
                    </h3>
                  </div>
                </Paper>

                {/* //new design */}

                {/* status end */}

                <Paper
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ margin: "2rem 0 2rem 0" }}>
                    <Formik
                      validationSchema={validationSchema}
                      initialValues={{
                        name: get(state, "0.name", ""),
                        dob: !state ? "" : new Date(state[0].dob),
                        Gender: get(state, "0.gender", ""),
                        personBooking: get(state, "0.person_making_booking", ""),
                        mobility: get(state, "0.mobility", ""),
                        femaleEscort: get(state, "0.female_escort", ""),
                        comIssue: get(state, "0.communication_issue", ""),
                        ambulanceCrewName: get(state, "0.ambu_crew_name", ""),
                        ambulancePlateNo: get(state, "0.ambu_plate_no", ""),
                        nationality: get(state, "0.nationality", ""),
                        religion: get(state, "0.religion", ""),
                        nhsNumber: get(state, "0.nhs_num", ""),
                        datetimeofBooking: !state ? "" : new Date(state[0].booking_datetime),
                        nameOfManager: get(state, "0.duty_authorizing_manager", "N/A"),
                        gpCode: get(state, "0.gp_code", ""),
                        fundingAuthority: get(state, "0.funding_authority", ""),
                        mentalHealthSection: get(state, "0.mental_health", ""),
                        pickupLocation: get(state, "0.pickup_location", ""),
                        pickupTime: get(state, "0.pickup_time", ""),
                        destinationLocation: get(state, "0.destination_location", ""),
                        handover_taken: get(state, "0.handover_taken", ""),
                        safeguardingConcerns: String(get(state, "0.safeguarding_concern", "")),
                        safeguardingConcernDesc: get(state, "0.safeguarding_reasons_desc", ""),
                        safeguarding_reasons_reported_by: get(state, "0.safeguarding_reasons_reported_by", ""),
                        safeguarding_reasons_date: !state ? "" : new Date(state[0].safeguarding_reasons_date),
                        riskOfAbsconding: String(get(state, "0.risk_of_absconding", "")),
                        assault: String(get(state, "0.assault", "")),
                        aggressionViolence: String(get(state, "0.aggression_violence", "")),
                        selfHarmSuicidal: String(get(state, "0.self_harm_suicidal", "")),
                        pickup_lat: get(state, "0.pickup_lat", ""),
                        pickup_long: get(state, "0.pickup_long", ""),
                        destination_lat: get(state, "0.destination_lat", ""),
                        destination_long: get(state, "0.destination_long", ""),
                        describeFundingAuthority: get(state, "0.describe_funding_authority", ""),
                        PICU_ward: String(get(state, "0.PICU_ward", "")),
                        patient_restraint: String(get(state, "0.patient_restraint", "")),
                        restraint_required: String(get(state, "0.restraint_required", "")),
                        young_persons_14_17yrs: String(get(state, "0.young_persons_14_17yrs", "")),
                        patient_injured: String(get(state, "0.patient_injured", "")),
                        highly_infectious_disease: String(get(state, "0.highly_infectious_disease", "")),
                        physical_health: String(get(state, "0.physical_health", "")),
                        any_special_conditions: String(get(state, "0.any_special_conditions", "")),
                        rapid_tranquilisers_used: String(get(state, "0.rapid_tranquilisers_used", "")),
                        rapid_tranquilisers_used_desc: get(state, "0.rapid_tranquilisers_used_desc", ""),
                        diagnosis: get(state, "0.diagnosis", ""),
                      }}
                      onSubmit={(values) => {
                        console.log(values);
                        if (state && state !== "undefined") {
                          EditCategory(values);
                        } else {
                          addNewCategory(values);
                        }
                      }}
                    >
                      {({ values, setFieldValue }) => (
                        <Form style={{ width: "50vw" }}>
                          {/* Bootstrap */}
                          <div className="container-fluid ">
                            {/* row 1 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Name of Patient:
                                  </label>
                                  <Field
                                    className=""
                                    name="name"
                                    type="text"
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

                                  <KErrorMessage name="name" />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  {" "}
                                  <label className="" style={{}}>
                                    Date of Birth:
                                  </label>
                                  <DatePicker
                                    onChange={(e) => {
                                      onChangeDOB(e);
                                      setFieldValue("dob", e);
                                    }}
                                    name="dob"
                                    value={values.dob}
                                    className=""
                                    maxDate={new Date()}
                                    required
                                  />
                                  <KErrorMessage name="dob" />
                                </div>
                              </div>
                            </div>

                            {/* row 2 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Gender:
                                  </label>
                                  <div className="d-flex justify-content-around ">
                                    <div className="d-flex ">
                                      <Field
                                        className=""
                                        name="Gender"
                                        type="radio"
                                        value="Male"
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
                                      />
                                      <label className="ml-1" style={{}}>
                                        Male
                                      </label>
                                    </div>
                                    <div className="d-flex ">
                                      <Field
                                        className=""
                                        name="Gender"
                                        type="radio"
                                        value="Female"
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
                                        Female
                                      </label>
                                    </div>
                                    <div className="d-flex ">
                                      {" "}
                                      <Field
                                        className=""
                                        name="Gender"
                                        type="radio"
                                        value="Other"
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
                                      />
                                      <label className="ml-1" style={{}}>
                                        Other
                                      </label>
                                    </div>
                                  </div>
                                  <KErrorMessage name="Gender" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Person Making Booking:
                                  </label>
                                  <Field
                                    className=""
                                    name="personBooking"
                                    type="text"
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

                                  <KErrorMessage name="personBooking" />
                                </div>
                              </div>
                            </div>
                            {/* row 3 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{ fontSize: "" }}>
                                    Mobility:
                                  </label>
                                  <Field
                                    className=""
                                    name="mobility"
                                    as="select"
                                    style={{
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {MobilitySelect.map((item, index) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                    {/* <option value="c">c</option> */}
                                  </Field>
                                  <KErrorMessage name="mobility" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{ fontSize: "" }}>
                                    Female Escort:
                                  </label>
                                  <Field
                                    className=""
                                    name="femaleEscort"
                                    type="text"
                                    as="select"
                                    style={{
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                  </Field>

                                  <KErrorMessage name="femaleEscort" />
                                </div>
                              </div>
                            </div>
                            {/* row 4 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{ fontSize: "" }}>
                                    Communication Issue:
                                  </label>
                                  <Field
                                    className=""
                                    name="comIssue"
                                    as="select"
                                    style={{
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {CommunicationSelect.map((item, index) => (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>
                                  <KErrorMessage name="comIssue" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Ambulance Crew Name:
                                  </label>
                                  <RSelect
                                    className=""
                                    placeholder="Select Driver"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                    name="ambulanceCrewName"
                                    options={ambulanceCrewNameSelect}
                                    isMulti={true}
                                    value={values.ambulanceCrewName}
                                    onChange={(e) => {
                                      console.log(e);
                                      setFieldValue("ambulanceCrewName", e);
                                    }}
                                  />
                                  {/* <Field
                                    className=""
                                    name="ambulanceCrewName"
                                    type="text"
                                    as="select"
                                    multiple
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {ambulanceCrewNameSelect.map((item, index)=>(
                                    <option key={index} value={item}>
                                      {item}
                                    </option>
                                    )
                                    )}
                                      </Field> */}

                                  <KErrorMessage name="ambulanceCrewName" />
                                </div>
                              </div>
                            </div>
                            {/* row 5 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Ambulance Plate No.:
                                  </label>
                                  <Field
                                    className=""
                                    name="ambulancePlateNo"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {carRegistrationNumbers.map((item, index) => (
                                      <option key={index} value={item.car_Registration_number + " " + item.vehicle_name}>
                                        {item.car_Registration_number + " " + item.vehicle_name}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="ambulancePlateNo" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Nationality:
                                  </label>
                                  <Field
                                    className=""
                                    name="nationality"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {NationalitySelect.map((item, i) => (
                                      <option key={i} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="nationality" />
                                </div>
                              </div>
                            </div>

                            {/* row 6 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Religion:
                                  </label>
                                  <Field
                                    className=""
                                    name="religion"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {ReligionSelect.map((item, i) => (
                                      <option key={i} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="religion" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    NHS Number:
                                  </label>
                                  <Field
                                    className=""
                                    name="nhsNumber"
                                    type="text"
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

                                  <KErrorMessage name="nhsNumber" />
                                </div>
                              </div>
                            </div>

                            {/* row 7 */}

                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Date & Time of Booking:
                                  </label>
                                  <DateTimePicker
                                    onChange={(e) => {
                                      onChangeDateTime(e);
                                      setFieldValue("datetimeofBooking", e ? new Date(e.getTime() + 300000) : e);
                                      // console.log(new Date(e.getTime() + 300000))
                                    }}
                                    name="datetimeofBooking"
                                    value={values.datetimeofBooking}
                                    className=""
                                    minDate={new Date()}
                                    required
                                  />

                                  <KErrorMessage name="datetimeofBooking" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Duty Authorizing Manager:
                                  </label>
                                  <Field
                                    className=""
                                    name="nameOfManager"
                                    type="text"
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

                                  <KErrorMessage name="nameOfManager" />
                                </div>
                              </div>
                            </div>

                            {/* row 8 */}

                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    GP Code:
                                  </label>
                                  <Field
                                    className=""
                                    name="gpCode"
                                    type="text"
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

                                  <KErrorMessage name="gpCode" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Funding Authority:
                                  </label>
                                  <Field
                                    className=""
                                    name="fundingAuthority"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {FundingAuthoritySelect.map((item, i) => (
                                      <option key={i} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="fundingAuthority" />
                                </div>
                              </div>
                            </div>

                            <div className="row my-3">
                              <div className="col-lg-12">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Describe Funding Authority:
                                  </label>
                                  <Field
                                    className=""
                                    name="describeFundingAuthority"
                                    type="text"
                                    style={{
                                      width: "",
                                      height: 55,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  />

                                  <KErrorMessage name="describeFundingAuthority" />
                                </div>
                              </div>
                            </div>

                            {/* row 9 */}

                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Mental Health/Section:
                                  </label>
                                  <Field
                                    className=""
                                    name="mentalHealthSection"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {MentalHealthSelect.map((item, i) => (
                                      <option key={i} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="mentalHealthSection" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Pickup Location:
                                  </label>

                                  <PlacesAutocomplete
                                    value={values.pickupLocation}
                                    onChange={(e) => {
                                      setFieldValue("pickup_lat", "");
                                      setFieldValue("pickup_long", "");
                                      setFieldValue("pickupLocation", e);
                                    }}
                                    onSelect={async (value) => {
                                      console.log(value);
                                      const results = await geocodeByAddress(value);
                                      const ll = await getLatLng(results[0]);
                                      console.log(ll);
                                      setFieldValue("pickupLocation", value);
                                      setFieldValue("pickup_lat", ll.lat);
                                      setFieldValue("pickup_long", ll.lng);
                                    }}
                                  >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                      <div style={{ width: "100%" }}>
                                        <input
                                          {...getInputProps({
                                            placeholder: "Enter Pickup Location ...",
                                            className: "location-search-input",
                                          })}
                                          className="form-control"
                                        />
                                        <div
                                          className="autocomplete-dropdown-container location-dropdown "
                                          style={{
                                            border: "1px solid #c4c4c4",
                                            position: "absolute",
                                            zIndex: 99,
                                            borderRadius: "5px",
                                          }}
                                        >
                                          {loading && <div>Loading...</div>}
                                          {suggestions.map((suggestion, i) => {
                                            const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                              ? {
                                                  backgroundColor: "#fafafa",
                                                  cursor: "pointer",
                                                }
                                              : {
                                                  backgroundColor: "#ffffff",
                                                  cursor: "pointer",
                                                };
                                            return (
                                              <div
                                                key={i}
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                  style,
                                                })}
                                              >
                                                <span>{suggestion.description}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </PlacesAutocomplete>

                                  <KErrorMessage name="pickupLocation" />
                                </div>
                              </div>
                            </div>
                            {/* row 10 */}

                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Pickup Time:
                                  </label>
                                  <TimePicker
                                    onChange={(e) => {
                                      onChangeTime(e);
                                      setFieldValue("pickupTime", e);
                                    }}
                                    value={values.pickupTime}
                                    required
                                  />

                                  <KErrorMessage name="pickupTime" />
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Destination Location:
                                  </label>

                                  <PlacesAutocomplete
                                    value={values.destinationLocation}
                                    onChange={(e) => {
                                      // console.log(e);
                                      setFieldValue("destination_lat", "");
                                      setFieldValue("destination_long", "");
                                      setFieldValue("destinationLocation", e);
                                    }}
                                    onSelect={async (value) => {
                                      console.log(value);
                                      const results = await geocodeByAddress(value);
                                      const ll = await getLatLng(results[0]);
                                      console.log(ll);
                                      setFieldValue("destinationLocation", value);
                                      setFieldValue("destination_lat", ll.lat);
                                      setFieldValue("destination_long", ll.lng);
                                      // setCoordinates(ll)
                                    }}
                                  >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                      <div style={{ width: "100%" }}>
                                        <input
                                          {...getInputProps({
                                            placeholder: "Enter Destination Location ...",
                                            className: "location-search-input",
                                          })}
                                          className="form-control"
                                        />
                                        <div
                                          className="autocomplete-dropdown-container location-dropdown "
                                          style={{
                                            border: "1px solid #c4c4c4",
                                            position: "absolute",
                                            zIndex: 99,
                                            borderRadius: "5px",
                                          }}
                                        >
                                          {loading && <div>Loading...</div>}
                                          {suggestions.map((suggestion, i) => {
                                            const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                              ? {
                                                  backgroundColor: "#fafafa",
                                                  cursor: "pointer",
                                                }
                                              : {
                                                  backgroundColor: "#ffffff",
                                                  cursor: "pointer",
                                                };
                                            return (
                                              <div
                                                key={i}
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                  style,
                                                })}
                                              >
                                                <span>{suggestion.description}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}
                                  </PlacesAutocomplete>

                                  <KErrorMessage name="destinationLocation" />
                                </div>
                              </div>
                            </div>
                            {/* handover */}
                            <div className="row my-3">
                              <div className="col-lg-12">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Handover taken from pickup point:
                                  </label>
                                  <Field
                                    className=""
                                    name="handover_taken"
                                    type="text"
                                    style={{
                                      width: "",
                                      height: 55,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  />

                                  <KErrorMessage name="handover_taken" />
                                </div>
                              </div>
                            </div>
                            {/* new diagnosis */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <div className="d-flex flex-column">
                                  <label className="" style={{}}>
                                    Diagnosis:
                                  </label>
                                  <Field
                                    className=""
                                    name="diagnosis"
                                    type="text"
                                    as="select"
                                    style={{
                                      width: "",
                                      height: 35,
                                      borderRadius: 5,
                                      borderColor: "#d3d3d3",
                                      borderStyle: "solid",
                                      borderWidth: 1,
                                      paddingInlineStart: 10,
                                    }}
                                  >
                                    <option value="">Select</option>
                                    {diagnosisArray.map((item, i) => (
                                      <option key={i} value={item}>
                                        {item}
                                      </option>
                                    ))}
                                  </Field>

                                  <KErrorMessage name="diagnosis" />
                                </div>
                              </div>

                              <div className="col-lg-6"></div>
                            </div>
                            {/* row 11 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Safeguarding Concerns: </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="safeguardingConcerns"
                                      type="radio"
                                      value="true"
                                      autoComplete="off"
                                      // onClick={setvalidationchange}
                                      style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="safeguardingConcerns"
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                  <KErrorMessage name="safeguardingConcerns" />{" "}
                                </div>
                              </div>
                            </div>
                            {values.safeguardingConcerns == "true" ? (
                              <div className="row my-3">
                                <div className="col-lg-12">
                                  <div className="d-flex flex-column">
                                    <label className="" style={{}}>
                                      Safeguarding Concerns Description:
                                    </label>
                                    <Field
                                      className=""
                                      name="safeguardingConcernDesc"
                                      type="text"
                                      style={{
                                        width: "",
                                        height: 55,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />

                                    <KErrorMessage name="safeguardingConcernDesc" />
                                  </div>
                                  <div className="d-flex flex-column my-2">
                                    <label className="" style={{}}>
                                      Safeguarding reasons reported by:
                                    </label>
                                    <Field
                                      className=""
                                      name="safeguarding_reasons_reported_by"
                                      type="text"
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

                                    <KErrorMessage name="safeguarding_reasons_reported_by" />
                                  </div>
                                  {values.safeguardingConcerns == "true" ? (
                                    <div className="d-flex flex-column my-2">
                                      <label className="" style={{}}>
                                        Safeguarding reasons date:
                                      </label>
                                      <DatePicker
                                        onChange={(e) => {
                                          // onChangeDOB(e);
                                          setFieldValue("safeguarding_reasons_date", e);
                                        }}
                                        name="safeguarding_reasons_date"
                                        value={values.safeguarding_reasons_date}
                                        className=""
                                        minDate={new Date()}
                                        required
                                      />

                                      <KErrorMessage name="safeguarding_reasons_date" />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {console.log(values.safeguardingConcerns)}
                            {/* row 12 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Risk of Absconding: </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="riskOfAbsconding"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="riskOfAbsconding"
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
                                  <KErrorMessage name="riskOfAbsconding" />
                                </div>
                              </div>
                            </div>
                            {/* new part 1 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>To or from a PICU Ward? </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="PICU_ward"
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="PICU_ward"
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                  <KErrorMessage name="PICU_ward" />
                                </div>
                              </div>
                            </div>
                            {/* new part 2 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Has the Patient been restraint in the last 48hrs </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="patient_restraint"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="patient_restraint"
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
                                  <KErrorMessage name="patient_restraint" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 3 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Restraint Required </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="restraint_required"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="restraint_required"
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
                                  <KErrorMessage name="restraint_required" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 4 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Young Persons 14-17yrs </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="young_persons_14_17yrs"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="young_persons_14_17yrs"
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
                                  <KErrorMessage name="young_persons_14_17yrs" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 5 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Patient Injured </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="patient_injured"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="patient_injured"
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
                                  <KErrorMessage name="patient_injured" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 6 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Highly Infectious Disease </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="highly_infectious_disease"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="highly_infectious_disease"
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
                                  <KErrorMessage name="highly_infectious_disease" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 7 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Physical Health </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="physical_health"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="physical_health"
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
                                  <KErrorMessage name="physical_health" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 8 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Any Special Conditions </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="any_special_conditions"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="any_special_conditions"
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
                                  <KErrorMessage name="any_special_conditions" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 9 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Rapid Tranquilisers USED? </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="rapid_tranquilisers_used"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="rapid_tranquilisers_used"
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
                                  <KErrorMessage name="rapid_tranquilisers_used" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* new part 10 */}
                            {values.rapid_tranquilisers_used == "true" ? (
                              <div className="row my-3">
                                <div className="col-lg-12">
                                  <div className="d-flex flex-column">
                                    <label className="" style={{}}>
                                      If Yes, Time Administered?
                                    </label>
                                    <Field
                                      className=""
                                      name="rapid_tranquilisers_used_desc"
                                      type="text"
                                      style={{
                                        width: "",
                                        height: 55,
                                        borderRadius: 5,
                                        borderColor: "#d3d3d3",
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        paddingInlineStart: 10,
                                      }}
                                    />

                                    <KErrorMessage name="rapid_tranquilisers_used_desc" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              false
                            )}
                            {/* row 13 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Assault: </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="assault"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="assault"
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
                                  <KErrorMessage name="assault" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* row 14 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Aggression/Violence: </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="aggressionViolence"
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
                                  <div className="d-flex ">
                                    {" "}
                                    <Field
                                      className=""
                                      name="aggressionViolence"
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                  <KErrorMessage name="aggressionViolence" />{" "}
                                </div>
                              </div>
                            </div>
                            {/* row 15 */}
                            <div className="row my-3">
                              <div className="col-lg-6">
                                <label>Self-Harm/Suicidal: </label>
                              </div>
                              <div className="col-lg-6">
                                <div className="d-flex flex-row justify-content-around">
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="selfHarmSuicidal"
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      Yes
                                    </label>
                                  </div>
                                  <div className="d-flex ">
                                    <Field
                                      className=""
                                      name="selfHarmSuicidal"
                                      type="radio"
                                      value="false"
                                      // checked={!state?(state.self_harm_suicidal?true:false):false}
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
                                    />
                                    <label className="ml-1" style={{}}>
                                      No
                                    </label>
                                  </div>
                                  <KErrorMessage name="selfHarmSuicidal" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
                          <br />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              type="submit"
                              className="buttoncss"
                              style={{
                                borderRadius: "1.5rem",
                                border: "none",
                                fontSize: "1rem",
                                width: "15vw",
                                height: "5vh",
                                backgroundColor: "#2765B3",
                                color: "#fff",
                              }}
                            >
                              SAVE
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddEditJob;
