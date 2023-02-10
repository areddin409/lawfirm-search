//Andrew Reddin
import React from "react"
import { useFormik } from "formik"
import AsyncCreatableSelect from "react-select/async-creatable"
import { Col, Row } from "react-bootstrap"

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

function SignupForm() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      lawFirm: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  const handleChange = (inputValue, actionMeta) => {
    console.log(formik.values.lawFirm)
    if (actionMeta.action === "create-option") {
      formik.values.lawFirm = inputValue.label
      alert("Creating " + inputValue.label)
    }
    console.log("handleChange", inputValue, actionMeta)
    if (actionMeta.action === "select-option") {
      formik.values.lawFirm = inputValue.label
    }
  }

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: data.__isNew__ ? "#000" : data.color
      }
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#fff"
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff"
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "#fff",
      cursor: "pointer",
      ":hover": {
        color: "#fff"
      }
    })
  }

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
