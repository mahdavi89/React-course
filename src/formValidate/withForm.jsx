import React, { useEffect, useState } from 'react'



export default function withForm(validate) {
  return function (WrappedComponnet) {
    return function (props) {


      let init = { ...validate.initial };
      let myRegex = { ...validate.regex };


      const [initial, setInitial] = useState({
        avatar: init.avatar,
        firstName: init.firstName,
        lastName: init.lastName,
        phone: init.phone,
        email: init.email,
        birthDate: init.birthDate,
        title: init.title,
        isEmailVisible: init.isEmailVisible,
        gender: init.gender,
        address: init.address,
        submitBtn: init.submitBtn,

      }
      )

      const [error, setError] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        birthDate: "",

      }
      )
      const [disableSubmit, setSubmit] = useState(true);

      const updateInitial = (name, value) => {
        setInitial({ ...initial, [name]: value })
        setError({ ...error, [name]: '' })
       
      }

      const errorName = (name, value) => {
        setInitial({ ...initial, [name]: value })
        setError({ ...error, [name]: 'Required' })
      }

      const errorPhoneEmailBirth = (name, value) => {
        setInitial({ ...initial, [name]: value })
        setError({ ...error, [name]: 'invalid' })
      }


      useEffect(() => {
        if (initial.phone != "" && initial.email != "" && initial.birthDate != "" && initial.firstName != "" && initial.lastName != "" && error.phone =='' && error.email=='' && error.birthDate=='') {
         
          setSubmit(false);
        }
        else{
          setSubmit(true)
        }
      })

      const handleChangeInput = (e) => {
        const nameOfInput = [e.target.name];
        const valueOfInput = e.target.value;

        setInitial({
          ...initial,
          [e.target.name]: e.target.value
        })

        if (nameOfInput == 'firstName' || nameOfInput == 'lastName') {
          if (!valueOfInput) {

            errorName(nameOfInput, valueOfInput);
          }
          else {
            updateInitial(nameOfInput, valueOfInput);


          }
        
        }

        else if (nameOfInput == 'phone' || nameOfInput == 'email' || nameOfInput == 'birthDate') {
          if (!valueOfInput) {
          }
          else if (valueOfInput) {
            let regex = "";

            if (nameOfInput == 'phone') {
              regex = myRegex.number;

            }

            if (nameOfInput == 'email') {
              regex = myRegex.email;
            }

            if (nameOfInput == 'birthDate') {
              regex = myRegex.birthDate
            }

            if (valueOfInput.match(regex)) {
              updateInitial(nameOfInput, valueOfInput)


            }
            else {
              errorPhoneEmailBirth(nameOfInput, valueOfInput)
            }

          }



        }

        else {
          updateInitial(nameOfInput, valueOfInput)

        }




      }

      const handleFileselected = (e) => {
        setInitial({ ...initial, avatar: URL.createObjectURL(e.target.files[0]) })
      };


      const handleChangeSwitch = (event) => {
        let isEmail = !(initial.isEmailVisible);
        setInitial({ ...initial, isEmailVisible: isEmail })
      };




      return (
        <>
          <WrappedComponnet
            handleChangeInput={handleChangeInput}
            initial={initial}
            error={error}
            handleChangeSwitch={handleChangeSwitch}
            handleFileselected={handleFileselected}
            disableSubmit={disableSubmit}
            {...props}
          />
        </>
      )
    }
  }
}