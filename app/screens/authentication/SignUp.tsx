import React, { useRef } from "react"
import { TextInput as RNTextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Container, Button, Text, Box } from "../../components/base-components"
import TextInput from "../../components/base-components/Form/TextInput"
import Footer from "./components/Footer"
import { registerWithEmail } from "../../components/base-components/Firebase"

/*
Fixed a bug when Password input is selected :
"currentlyFocusedField is deprecated and will be removed in a future release. Use currentlyFocusedInput"
FILE line 372: node_modules/react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC.js
Fix: const currentlyFocusedField = TextInput.State.currentlyFocusedInput ? findNodeHandle(TextInput.State.currentlyFocusedInput()) : TextInput.State.currentlyFocusedField();
*/

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")
    .required("Required"),
})

const SignUp = observer(function SignUp() {
  const navigation = useNavigation()

  async function handleOnSignUp(values) {
    const { email, password } = values
    try {
      await registerWithEmail(email, password)
      navigation.navigate("Home")
    } catch (error) {
      // setRegisterError(error.message)
      console.log("Erreur de création de compte Firebase")
    }
  }

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: (values) => handleOnSignUp(values),
  })
  const password = useRef<RNTextInput>(null)
  const confirmPassword = useRef<RNTextInput>(null)
  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  )

  return (
    <Container pattern={1} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Create account
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Let us know your email and password.
      </Text>
      <Box>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            returnKeyType="next"
            returnKeyLabel="next"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => confirmPassword.current?.focus()}
            secureTextEntry
          />
        </Box>
        <TextInput
          ref={confirmPassword}
          icon="lock"
          placeholder="Confirm your password"
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          autoCompleteType="password"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
          secureTextEntry
        />
        <Box alignItems="center" marginTop="m">
          <Button variant="primary" label="Create your account" onPress={handleSubmit} />
        </Box>
      </Box>
    </Container>
  )
})

export default SignUp
