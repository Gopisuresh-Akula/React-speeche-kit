import React, { useState,useEffect,useContext } from "react";
import { Input, Select, Radio, Spin, Icon, Button } from "antd";
import axios from 'axios'
import "./FormPage.css";
import { Appcontext } from "../Context/ContextProvider";

const REACT_APP_MAPBOX_API_KEY = 'pk.eyJ1IjoibWMxMDBzIiwiYSI6ImNqb2E2ZTF3ODBxa3czd2xldHp1Z2FxbGYifQ.U4oatm5RsTXXHQLz5w66dQ';
const { Option } = Select;
const initialFormState = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Gender: '',
  DateofBirth: '',
  Unit: '',
  City: '',
  State: '',
  ZipCode: '',
  search: '',
  results: [],
  isLoading: false,
  MobilePhone: '',
  EmailAddress: '',
  confirmEmail: '',
  radioquestion1: '',
  radioquestion2: ''
};
const Form = (props) => {
  const [form, setForm] = useState(initialFormState);
  const {command } = useContext(Appcontext);
  const [errors, seterrors] = useState({})
  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };
  const onDropdownChange = (e, key) => {
    console.log("e", e)
    setForm({
      ...form,
      [key]: e
    });
  }
  const onRadioChange = (e, key) => {
    setForm({
      ...form,
      [key]: e.target.value
    });
  }
  const DateofBirthformatter = (value, previousValue) => {
    console.log("object", previousValue)
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `${currentValue.slice(0, 2)}/${currentValue.slice(2)}`;
      return `${currentValue.slice(0, 2)}/${currentValue.slice(2, 4)}/${currentValue.slice(4, 8)}`;
    }
  };
  const dobhandleChange = (event) => {
    event.persist();
    const value = event.target.value;
    console.log("value", value)
    setForm(prevState => ({
      ...form, [event.target.name]: DateofBirthformatter(value, prevState.DateofBirth)
    }))
  };
  const MobilePhoneformatter = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  const phonehandleChange = (event) => {
    event.persist();
    const value = event.target.value;
    console.log("value", value)
    setForm(prevState => ({
      ...form, [event.target.name]: MobilePhoneformatter(value, prevState.MobilePhone)
    }))
  };
  const handleSearchChange = (e) => {
    setForm({
      ...form, search: e.target.value, isLoading: true
    })
    // Stop the previous setTimeout if there is one in progress
    setTimeout(() => {
      performSearch()
    }, 1000)
  }
  const performSearch = () => {
    if (!form.search) {
      setForm({
        ...form, results: [], isLoading: false
      })
      return
    }
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${form.search}.json?access_token=${REACT_APP_MAPBOX_API_KEY}`)
      .then(response => {
        setForm({
          ...form, results: response.data.features, isLoading: false
        })
      })
  }
  const handleItemClicked = (place) => {
    setForm({
      ...form, search: place.place_name,
      results: [], isLoading: false
    })
  }
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const validate = (form) => {
    const errors = {};
    if (!form.FirstName) errors.FirstName = "FirstName field can't be blank";
    if (!form.MiddleName) errors.MiddleName = "MiddleName field can't be blank";
    if (!form.LastName) errors.LastName = "LastName field can't be blank";
    if (!form.Gender) errors.Gender = "Gender field can't be blank";
    if (!form.DateofBirth) errors.DateofBirth = "DateofBirth field can't be blank";
    if (!form.search) errors.search = "search field can't be blank";
    if (!form.Unit) errors.Unit = "Unit field can't be blank";
    if (!form.City) errors.City = "City field can't be blank";
    if (!form.State) errors.State = "State field can't be blank";
    if (!form.ZipCode) errors.ZipCode = "ZipCode field can't be blank";
    if (!form.MobilePhone) errors.MobilePhone = "MobilePhone field can't be blank";
    if (!form.EmailAddress) errors.EmailAddress = "EmailAddress field can't be blank";
    if (!form.confirmEmail) errors.confirmEmail = "confirmEmail field can't be blank";
    if (!form.radioquestion1) errors.radioquestion1 = "radioquestion1 field can't be blank";
    if (!form.radioquestion2) errors.radioquestion2 = "radioquestion2 field can't be blank";

    return errors;
  }




  const handleSubmit = event => {
    event.preventDefault();
    console.log("fsdfsd")
    const errors = validate(form)
    seterrors(errors);
    if (Object.keys(errors).length === 0) {
      setForm(initialFormState);
      console.log(form)
    }

  }


  useEffect(() => {
    voiceCommands()
  }, [command])

  const voiceCommands=()=>{


    switch (command) {
   
      case "homepage":
        props.history.push("/");
        break;
     

     
      
  
      default:
        break;
    }
  }


  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2>Register</h2>
      <form
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="First Name"
          name="FirstName"
          onChange={handleChange}
          value={form.FirstName}
        />
        {errors.FirstName &&
          <p style={{ color: 'red' }}>{errors.FirstName}</p>
        }
        <Input
          placeholder="Middle Name"
          name="MiddleName"
          onChange={handleChange}
          value={form.MiddleName}
        />
        {errors.MiddleName &&
          <p style={{ color: 'red' }}>{errors.MiddleName}</p>
        }
        <Input
          placeholder="Last Name"
          name="LastName"
          onChange={handleChange}
          value={form.LastName}
        />
        {errors.LastName &&
          <p style={{ color: 'red' }}>{errors.LastName}</p>
        }
        <Select
          value={form.Gender || undefined}
          onChange={(e) => onDropdownChange(e, 'Gender')}
          placeholder="Gender"
        >
          <Option value="Yes">Male</Option>
          <Option value="No">FeMale</Option>
        </Select>
        {errors.Gender &&
          <p style={{ color: 'red' }}>{errors.Gender}</p>
        }
        <Input
          type="text"
          value={form.search}
          onChange={handleSearchChange}
          placeholder="Location"
        />
        {errors.search &&
          <p style={{ color: 'red' }}>{errors.search}</p>
        }
        <ul className="AutocompletePlace-results" style={{ zIndex: '1' }} >
          {form.results.map(place => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => handleItemClicked(place)}
              style={{ padding: "5px", textDecoration: '' }}
            >
              {place.place_name}
            </li>
          ))}
          {form.isLoading && <Spin indicator={antIcon} />}
        </ul>

        <Input
          placeholder="Date of Birth "
          name="DateofBirth"
          onChange={dobhandleChange}
          value={form.DateofBirth}
        />
        {errors.DateofBirth &&
          <p style={{ color: 'red' }}>{errors.DateofBirth}</p>
        }
        <Input
          placeholder="Unit"
          name="Unit"
          onChange={handleChange}
          value={form.Unit}
        />
        {errors.Unit &&
          <p style={{ color: 'red' }}>{errors.Unit}</p>
        }
        <Input
          placeholder="City"
          name="City"
          onChange={handleChange}
          value={form.City}
        />
        {errors.City &&
          <p style={{ color: 'red' }}>{errors.City}</p>
        }
        <Select
          value={form.State || undefined}
          onChange={(e) => onDropdownChange(e, 'State')}
          placeholder="State"
        >
          <Option value="AL">AL</Option>
          <Option value="AR">AR</Option>
        </Select>
        {errors.State &&
          <p style={{ color: 'red' }}>{errors.State}</p>
        }
        <Input
          placeholder="Zip Code"
          name="ZipCode"
          onChange={handleChange}
          value={form.ZipCode}
        />
        {errors.ZipCode &&
          <p style={{ color: 'red' }}>{errors.ZipCode}</p>
        }
        <Input
          placeholder="Mobile Phone"
          name="MobilePhone"
          onChange={phonehandleChange}
          value={form.MobilePhone}
        />
        {errors.MobilePhone &&
          <p style={{ color: 'red' }}>{errors.MobilePhone}</p>
        }
        <Input
          placeholder="EmailAddress"
          name="EmailAddress"
          onChange={handleChange}
          value={form.EmailAddress}
        />
        {errors.EmailAddress &&
          <p style={{ color: 'red' }}>{errors.EmailAddress}</p>
        }
        <Input
          placeholder="confirmEmail"
          name="confirmEmail"
          onChange={handleChange}
          value={form.confirmEmail}
        />

        {errors.confirmEmail &&
          <p style={{ color: 'red' }}>{errors.confirmEmail}</p>
        }
        <div>
          <Radio.Group onChange={(e) => onRadioChange(e, "radioquestion1")} value={form.radioquestion1}>
            <h1>question1</h1>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group><br />
          {errors.radioquestion1 &&
            <p style={{ color: 'red' }}>{errors.radioquestion1}</p>
          }
          <Radio.Group onChange={(e) => onRadioChange(e, "radioquestion2")} value={form.radioquestion2}>
            <h1>question2</h1>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
          {errors.radioquestion2 &&
            <p style={{ color: 'red' }}>{errors.radioquestion2}</p>
          }
        </div>
<div>

</div>
        
        <Button type="primary" htmlType="submit">Submit</Button>
      </form>
    </div>
  );
}
export default Form;