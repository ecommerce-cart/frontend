// import { Dispatch, SetStateAction, useState } from 'react'

import { useState } from 'react'
import { AnySchema, ValidationError, object } from 'yup'

// // export const setInForm =
// //   <T, U extends keyof T>(setForm: Dispatch<SetStateAction<T>>) =>
// //   (key: U, value: T[U]) =>
// //     setForm((oldForm) => ({ ...oldForm, [key]: value }))

// const setInForm =
//   <T, U extends keyof T>(setState: Dispatch<SetStateAction<T>>) =>
//   (key: U, value: T[U]) => {
//     setState((prevForm) => ({
//       ...prevForm,
//       [key]: value,
//     }))
//   }

// export const useForm = <T>(initialObject: T) => {
//   const [form, setForm] = useState<T>(initialObject)

//   return [form, setInForm(setForm)] as const
// }

// const validate = React.useCallback(async () => {
//   if (validationSchema) {
//     const schema = yupObject(validationSchema);
//     await schema.validate(values, { abortEarly: false });
//   }
// }, [validationSchema, values]);

// import React from 'react'
// import { AnySchema, ValidationError, object as yupObject } from 'yup'

// export type InputTypes =
//   | HTMLInputElement
//   | HTMLTextAreaElement
//   | HTMLSelectElement
// export type ErrorFields<T> = Partial<Record<keyof T, string>>
// export type TouchedFields<T> = Partial<Record<keyof T, boolean>>
// export type YupSchemaObject<T> = Record<keyof T, AnySchema>

// function isValidationError(err: any): err is ValidationError {
//   return 'inner' in err
// }

// function serializeYupErrors<T>(
//   err: ValidationError,
//   touchedFields?: TouchedFields<T>
// ) {
//   return err.inner.reduce((acc: ErrorFields<T>, val: ValidationError) => {
//     const fieldName = val.path as keyof T | undefined

//     if (touchedFields) {
//       if (fieldName && touchedFields[fieldName]) acc[fieldName] = val.message
//     } else {
//       if (fieldName) acc[fieldName] = val.message
//     }

//     return acc
//   }, {})
// }

// function getInputValue(input: EventTarget & HTMLInputElement) {
//   switch (input.type) {
//     case 'file':
//       return input.files
//     case 'checkbox':
//       return input.checked
//     default:
//       return input.value
//   }
// }

// function useForm<Values extends Record<string, unknown>>(
//   initialValues: Values,
//   submitHandler: (data: Values) => Promise<void>,
//   validationSchema?: YupSchemaObject<Values>
// ) {
//   const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
//   const [values, setValues] = React.useState<Values>(initialValues)
//   const [errors, setErrors] = React.useState<ErrorFields<Values>>({})
//   const [touched, setTouched] = React.useState<TouchedFields<Values>>({})

//   const validate = React.useCallback(async () => {
//     if (validationSchema) {
//       const schema = yupObject(validationSchema)
//       await schema.validate(values, { abortEarly: false })
//     }
//   }, [validationSchema, values])

//   const handleChange = React.useCallback(
//     (event: React.ChangeEvent<InputTypes>) => {
//       const { currentTarget } = event

//       const input = currentTarget as EventTarget & HTMLInputElement

//       setValues((prevValues) => ({
//         ...prevValues,
//         [input.name]: getInputValue(input),
//       }))
//     },
//     []
//   )

//   const handleBlur = React.useCallback(
//     (event: React.FocusEvent<InputTypes, Element>) => {
//       const { currentTarget: input } = event

//       if (!touched[input.name]) {
//         setTouched((prevValues) => ({
//           ...prevValues,
//           [input.name]: true,
//         }))
//       }

//       const touchedFields = { ...touched, [input.name]: true }

//       validate()
//         .then(() => {
//           setErrors({})
//         })
//         .catch((err: ValidationError) => {
//           const validationErrors = serializeYupErrors<Values>(
//             err,
//             touchedFields
//           )
//           setErrors(validationErrors)
//         })
//     },
//     [touched, validate]
//   )

//   const handleFocused = React.useCallback(
//     (event: React.FocusEvent<InputTypes>) => {
//       event.preventDefault()

//       const { currentTarget: input } = event

//       setErrors((oldErrors) => ({
//         ...oldErrors,
//         [input.name]: undefined,
//       }))
//     },
//     [setErrors]
//   )

//   const handleSubmit = React.useCallback(
//     async (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault()

//       try {
//         await validate()

//         setIsSubmitting(true)

//         await submitHandler(values)

//         setIsSubmitting(false)
//       } catch (err) {
//         setIsSubmitting(false)

//         const validationErrors = isValidationError(err)
//           ? serializeYupErrors<Values>(err)
//           : {}

//         setErrors(validationErrors)

//         const touchedFields: TouchedFields<Values> = {}

//         Object.keys(initialValues).forEach((item: keyof Values) => {
//           touchedFields[item] = true
//         })

//         setTouched(touchedFields)
//       }
//     },
//     [initialValues, validate, values, submitHandler]
//   )

//   const setMultiValues = React.useCallback((values: Partial<Values>) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       ...values,
//     }))
//   }, [])

//   const setMultiErrors = React.useCallback((errors: ErrorFields<Values>) => {
//     const touchedFields = Object.keys(errors).map((item) => ({
//       [item]: true,
//     }))

//     setTouched((prevValues) => ({
//       ...prevValues,
//       ...touchedFields,
//     }))

//     setErrors((prevValues) => ({
//       ...prevValues,
//       ...errors,
//     }))
//   }, [])

//   const setValue = React.useCallback((name: string, value: unknown) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }))
//   }, [])

//   const setError = React.useCallback((name: string, value: string) => {
//     setTouched((prevValues) => ({
//       ...prevValues,
//       [name]: true,
//     }))

//     setErrors((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }))
//   }, [])

//   return {
//     values,
//     errors,
//     handleSubmit,
//     handleChange,
//     handleBlur,
//     handleFocused,
//     setMultiValues,
//     setMultiErrors,
//     setValue,
//     setError,
//     isSubmitting,
//   }
// }

// export default useForm

type InputTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const getInputValue = (input: EventTarget & HTMLInputElement) => {
  switch (input.type) {
    case 'file':
      return input.files
    case 'checkbox':
      return input.checked
    default:
      return input.value
  }
}

type TouchedInputs<Data> = Partial<Record<keyof Data, boolean>>
type Errors<Data> = Partial<Record<keyof Data, string>>
type YupValidationObject<Data> = Record<keyof Data, AnySchema>

const validate = async <Data>(
  data: Data,
  schemaObject: YupValidationObject<Data>
) => {
  const schema = object(schemaObject)
  await schema.validate(data, { abortEarly: false })
}

const structureYupError = <Data>(
  errors: ValidationError,
  touchedInputs?: TouchedInputs<Data>
) => {
  return errors.inner.reduce(
    (structuredError: Errors<Data>, error: ValidationError) => {
      const path = error.path as keyof Data | undefined

      if (touchedInputs) {
        if (path && touchedInputs[path]) structuredError[path] = error.message
      } else {
        if (path) structuredError[path] = error.message
      }

      return structuredError
    },
    {}
  )
}

const isValidationError = (error: any): error is ValidationError => {
  return 'inner' in error
}

function useForm<Data extends Record<string, unknown>>(
  data: Data,
  submitHandler: (values: Data) => Promise<void>,
  validationSchema?: YupValidationObject<Data>
) {
  const [values, setValues] = useState<Data>(data)
  const [touched, setTouched] = useState<TouchedInputs<Data>>({})
  const [errors, setErrors] = useState<Errors<Data>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<InputTypes>) => {
    const { currentTarget } = e

    const input = currentTarget as EventTarget & HTMLInputElement

    setValues((oldValues) => ({
      ...oldValues,
      [input.name]: getInputValue(input),
    }))
  }

  const handleBlur = (e: React.FocusEvent<InputTypes>) => {
    let newTouched = { ...touched }

    if (!touched[e.currentTarget.name]) {
      newTouched = { ...touched, [e.currentTarget.name]: true }
      setTouched(newTouched)
    }

    if (validationSchema) {
      validate(values, validationSchema)
        .then(() => setErrors({}))
        .catch((e: ValidationError) => {
          setErrors(structureYupError(e, newTouched))
        })
    }
  }

  const handleFocus = (event: React.FocusEvent<InputTypes>) => {
    event.preventDefault()

    const { currentTarget: input } = event

    setErrors((oldErrors) => ({
      ...oldErrors,
      [input.name]: undefined,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)

    if (validationSchema) {
      try {
        await validate(values, validationSchema)
        await submitHandler(values)
        setIsSubmitting(false)
      } catch (error) {
        if (isValidationError(error)) {
          setErrors(structureYupError(error))
        }
        setIsSubmitting(false)
      }
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    isSubmitting,
    setValues
  }
}

export default useForm
