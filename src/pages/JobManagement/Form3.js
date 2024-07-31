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
  

const Form3 = (props) => {


    const classes = useStyles();
   

//  data from previous page

const {
    location: { state },
  } = props;

  console.log(state)

const [displayData,setDisplayData]=useState([])
    
// useEffect(() => {
//  setDisplayData(...state)
//  console.log(displayData);
// }, [])





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
                          pathname: "/adminPanel/Form2",
                          state: state._id,
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
                      {!state ? `FORM 3` : `FORM 3`}
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
                          date: get(state.job_pickup_form_3, "date", ""),
                          // job_id: "62874ab4fe6fcee8010d066c"
                          s1_amhp_app_s2: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_amhp_app_s2",
                              ""
                            )
                          ),
                          s1_amhp_report: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_amhp_report",
                              ""
                            )
                          ),
                          s1_authority_convey: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_authority_convey",
                              ""
                            )
                          ),
                          s1_authority_transfer_form: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_authority_transfer_form",
                              ""
                            )
                          ),
                          s1_first_medical_recomm_f4: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_first_medical_recomm_f4",
                              ""
                            )
                          ),
                          s1_join_medical_recomm_fA3: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_join_medical_recomm_fA3",
                              ""
                            )
                          ),
                          s1_sec_medical_recomm_f4: String(
                            get(
                              state.job_pickup_form_3.section_1,
                              "s1_sec_medical_recomm_f4",
                              ""
                            )
                          ),
                          s2_amhp_app_fA6: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_amhp_app_fA6",
                              ""
                            )
                          ),
                          s2_amhp_report: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_amhp_report",
                              ""
                            )
                          ),
                          s2_authority_convey: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_authority_convey",
                              ""
                            )
                          ),
                          s2_authority_transfer_form: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_authority_transfer_form",
                              ""
                            )
                          ),
                          s2_first_medical_recomm_fA8: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_first_medical_recomm_fA8",
                              ""
                            )
                          ),
                          s2_join_medical_recomm_fA7: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_join_medical_recomm_fA7",
                              ""
                            )
                          ),
                          s2_sec_medical_recomm_f4: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_sec_medical_recomm_f4",
                              ""
                            )
                          ),
                          s2_sec_medical_recomm_fA8: String(
                            get(
                              state.job_pickup_form_3.section_2,
                              "s2_sec_medical_recomm_fA8",
                              ""
                            )
                          ),
                          s3_amhp_app_fA10: String(
                            get(
                              state.job_pickup_form_3.section_3,
                              "s3_amhp_app_fA10",
                              ""
                            )
                          ),
                          s3_authority_convey: String(
                            get(
                              state.job_pickup_form_3.section_3,
                              "s3_authority_convey",
                              ""
                            )
                          ),
                          s3_one_medical_recomm_fA11: String(
                            get(
                              state.job_pickup_form_3.section_3,
                              "s3_one_medical_recomm_fA11",
                              ""
                            )
                          ),
                          s4_authority_convey: String(
                            get(
                              state.job_pickup_form_3.section_4,
                              "s4_authority_convey",
                              ""
                            )
                          ),
                          s4_section_17: String(
                            get(
                              state.job_pickup_form_3.section_4,
                              "s4_section_17",
                              ""
                            )
                          ),
                          s4_warrant_by_police_officer: String(
                            get(
                              state.job_pickup_form_3.section_4,
                              "s4_warrant_by_police_officer",
                              ""
                            )
                          ),
                          s5_authority_convey: String(
                            get(
                              state.job_pickup_form_3.section_5,
                              "s5_authority_convey",
                              ""
                            )
                          ),
                          s5_cto_form: String(
                            get(
                              state.job_pickup_form_3.section_5,
                              "s5_cto_form",
                              ""
                            )
                          ),
                          s5_doc_handed_over: String(
                            get(
                              state.job_pickup_form_3.section_5,
                              "s5_doc_handed_over",
                              ""
                            )
                          ),
                          s5_mental_health_act_doc: String(
                            get(
                              state.job_pickup_form_3.section_5,
                              "s5_mental_health_act_doc",
                              ""
                            )
                          ),
                          status: String(
                            get(state.job_pickup_form_3, "status", "")
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

                              {state.job_pickup_form_3.section_1 ? (
                                <>
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
                                          Section Two:
                                        </h4>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>AMHP Application s2 :</h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_amhp_app_s2"
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
                                          name="s1_amhp_app_s2"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Authority to convey(check address is
                                        correct):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_authority_convey"
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
                                          name="s1_authority_convey"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>AMHP Outline Report:</h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_amhp_report"
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
                                          name="s1_amhp_report"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        1st Medical Recommendation s2(form4):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_first_medical_recomm_f4"
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
                                          name="s1_first_medical_recomm_f4"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        2nd Medical Recommendation s2(form4):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_sec_medical_recomm_f4"
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
                                          name="s1_sec_medical_recomm_f4"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Authority for Transfer Form(H4 S19):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_authority_transfer_form"
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
                                          name="s1_authority_transfer_form"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Joint Medical Recommendation s2(Form
                                        A3):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s1_join_medical_recomm_fA3"
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
                                          name="s1_join_medical_recomm_fA3"
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
                                </>
                              ) : (
                                ""
                              )}

                              {/* section 2 */}
                              {/* row 3 */}
                              {state.job_pickup_form_3.section_2 ? (
                                <>
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
                                          Section Three(Hard copy or online):
                                        </h4>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>AMHP Application s3(Form A6) :</h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_amhp_app_fA6"
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
                                        />
                                        <label className="ml-1" style={{}}>
                                          Yes
                                        </label>
                                      </div>
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_amhp_app_fA6"
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
                                        />
                                        <label className="ml-1" style={{}}>
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Authority to convey(check address if
                                        correct) :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_authority_convey"
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
                                        <Field
                                          className=""
                                          name="s2_authority_convey"
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
                                        />
                                        <label className="ml-1" style={{}}>
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>AMHP Outline Report :</h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_amhp_report"
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
                                        />
                                        <label className="ml-1" style={{}}>
                                          Yes
                                        </label>
                                      </div>
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_amhp_report"
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
                                        />
                                        <label className="ml-1" style={{}}>
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        1st Medical Recommendation s2(Form A8) :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_first_medical_recomm_fA8"
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
                                          name="s2_first_medical_recomm_fA8"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        2nd Medical Recommendation s2(Form A8) :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_sec_medical_recomm_fA8"
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
                                          name="s2_sec_medical_recomm_fA8"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Authority for Tranfer Form (H4 S19) :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_authority_transfer_form"
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
                                          name="s2_authority_transfer_form"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Joint Medical Recommendation s2(Form
                                        A7):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_join_medical_recomm_fA7"
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
                                          name="s2_join_medical_recomm_fA7"
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

                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        2nd Medical Recommendation s2(Form 4):
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s2_sec_medical_recomm_f4"
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
                                          name="s2_sec_medical_recomm_f4"
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
                                </>
                              ) : (
                                ""
                              )}

                              {/* section 3 */}
                              {/* row 5 */}
                              {state.job_pickup_form_3.section_3 ? (
                                <>
                                  {" "}
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
                                          Section Four(Hard copy or online):
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>AMHP Application s4(Form A10) :</h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s3_amhp_app_fA10"
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
                                          name="s3_amhp_app_fA10"
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
                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        One Medical Recommendation s4(Form A11)
                                        :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s3_one_medical_recomm_fA11"
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
                                          name="s3_one_medical_recomm_fA11"
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
                                  <div className="row my-2 align-items-center">
                                    <div className="col-8">
                                      <h6>
                                        Authority to convey(check address if
                                        correct) :
                                      </h6>
                                    </div>
                                    <div className="col-4 d-flex justify-content-around align-items-center ">
                                      <div className="d-flex">
                                        <Field
                                          className=""
                                          name="s3_authority_convey"
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
                                          name="s3_authority_convey"
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
                                </>
                              ) : (
                                ""
                              )}
                              {/* section 4 */}
                              {/* row 7 */}
                              {state.job_pickup_form_3.section_4 ? <>
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
                                        Section 135.1&135.2(usually will be hard
                                        copy):
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                            
                              
                                <div className="row my-2 align-items-center">
                                  <div className="col-8">
                                    <h6>
                                      Copy of Executed warrant by police officer :
                                    </h6>
                                  </div>
                                  <div className="col-4 d-flex justify-content-around align-items-center ">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="s4_warrant_by_police_officer"
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
                                        name="s4_warrant_by_police_officer"
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
                            
                                <div className="row my-2 align-items-center">
                                  <div className="col-8">
                                    <h6>
                                      Authority to convey(check address if
                                      correct) :
                                    </h6>
                                  </div>
                                  <div className="col-4 d-flex justify-content-around align-items-center ">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="s4_authority_convey"
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
                                        name="s4_authority_convey"
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
                           
                                <div className="row my-2 align-items-center">
                                  <div className="col-8">
                                    <h6>Section 17(hard copy recieved) :</h6>
                                  </div>
                                  <div className="col-4 d-flex justify-content-around align-items-center ">
                                    <div className="d-flex">
                                      <Field
                                        className=""
                                        name="s4_section_17"
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
                                        name="s4_section_17"
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
                              </> : ""}
                              {/* section 5*/}
                              {/* row 9 */}
                              {state.job_pickup_form_3.section_5?<>
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
                                      Community Treatment Recall(usually will be
                                      hard copy):
                                    </h4>
                                  </div>
                                </div>
                              </div>
                             
                              <div className="row my-2 align-items-center">
                                <div className="col-8">
                                  <h6>CTO Form :</h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around align-items-center ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="s5_cto_form"
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
                                      name="s5_cto_form"
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
                            
                              <div className="row my-2 align-items-center">
                                <div className="col-8">
                                  <h6>
                                    Authority to convey(check address if
                                    correct) :
                                  </h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around align-items-center ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="s5_authority_convey"
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
                                      name="s5_authority_convey"
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
                             
                              <div className="row my-2 align-items-center">
                                <div className="col-8">
                                  <h6>
                                    Documentation handed over to L&T staff :
                                  </h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around align-items-center ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="s5_doc_handed_over"
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
                                      name="s5_doc_handed_over"
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
                             
                              <div className="row my-2 align-items-center">
                                <div className="col-8">
                                  <h6>
                                    Mental Health act Documentation sent via
                                    email :
                                  </h6>
                                </div>
                                <div className="col-4 d-flex justify-content-around align-items-center ">
                                  <div className="d-flex">
                                    <Field
                                      className=""
                                      name="s5_mental_health_act_doc"
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
                                      name="s5_mental_health_act_doc"
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
                        </>:""}
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
                    pathname: "/adminPanel/Form4",
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
}

export default Form3;


