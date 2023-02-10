//Andrew Reddin
import React from "react"
import { useFormik } from "formik"
import AsyncCreatableSelect from "react-select/async-creatable"
import { Col, Row } from "react-bootstrap"

// Array of options for the React-Select component to use as a data source
const options = [
  {
    value: "Peter Parker & Associates",
    label: "Peter Parker & Associates",
    color: "#333"
  },
  { value: "Tony, Cap, & Thor", label: "Tony, Cap, & Thor", color: "#333" },
  { value: "The Avengers", label: "The Avengers", color: "#333" },
  { value: "Law Firm A", label: "Law Firm A", color: "#333" },
  { value: "Law Firm B", label: "Law Firm B", color: "#333" },
  { value: "Law Firm C", label: "Law Firm C", color: "#333" },
  { value: "Law Firm D", label: "Law Firm D", color: "#333" }
]

// Function to create the sign-up form using Formik and React-Select
function SignupForm() {
  // Use the useFormik hook to handle form data
  const formik = useFormik({
    // Initial values for the form fields
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      lawFirm: ""
    },
    onSubmit: (values) => {
      // Show a JSON representation of the form values in an alert
      // This is just for testing purposes, this should be replaced with a call to the API
      alert(JSON.stringify(values, null, 2))
    }
  })

  // Function to handle changes to the React-Select component
  const handleChange = (inputValue, actionMeta) => {
    console.log(formik.values.lawFirm)
    if (actionMeta.action === "create-option") {
      // If the user creates a new option, show an alert with the new value
      // This is just for testing purposes, this should be replaced with a call to the API
      alert("Creating " + inputValue.label)
      // Set the value of the form field to the new value
      formik.values.lawFirm = inputValue.label
    }
    console.log("handleChange", inputValue, actionMeta)
    if (actionMeta.action === "select-option") {
      // If the user selects an option, set the value of the form field to the selected value
      formik.values.lawFirm = inputValue.label
    }
  }

  // Styles for the React-Select component
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // you have access to the data of the option here and different states of the option
      // Set the color of the options to the color of the option
      return {
        ...styles,
        color: data.__isNew__ ? "#000" : data.color // If the option is new, use black text instead of white
      }
    },

    // Set the color of the selected text option to the color of the option
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff"
      }
    },
    // Set the color of the selected text option to the color of the option AKA text to white so it's visible
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff"
    }),

    // set the color of the remove button to white so it's visible
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        color: "#fff"
      }
    })
  }

  // Function to handle loading options for the React-Select component
  const loadOptions = (searchValue, callback) => {
    if (searchValue.length >= 3) {
      setTimeout(() => {
        const filteredOptions = options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
        console.log("loadOptions", searchValue, filteredOptions)
        callback(filteredOptions)
      }, 1000)
    }
  }

  return (
    <Col xs={12} lg={6}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        {/* React-Select Dropdown that will create new entry in one does not exist */}
        <label htmlFor="email">Law Firm</label>
        <AsyncCreatableSelect
          loadOptions={loadOptions}
          isClearable
          defaultOptions
          styles={colorStyles}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </Col>
  )
}

export default SignupForm
