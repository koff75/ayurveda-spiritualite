import React, { useRef } from "react"
import { TextInput as RNTextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Container, Button, Text, Box } from "../../components/base-components"
import TextInput from "../../components/base-components/Form/TextInput"
import Checkbox from "../../components/base-components/Form/Checkbox"
import Footer from "./components/Footer"
import { loginWithEmail } from "../../components/base-components/Firebase"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .max(50, "Too Long!")
    .required("Required"),
})

const Login = observer(function Login() {
  const navigation = useNavigation()

  async function handleOnLogin(values) {
    const { email, password } = values

    try {
      await loginWithEmail(email, password)
    } catch (error) {
      // setLoginError(error.message)
      console.log("Erreur loginWithEmail")
    }
  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", remember: true },
    onSubmit: (values) => {
      handleOnLogin(values)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        }),
      )
    },
  })
  const password = useRef<RNTextInput>(null)
  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  )

  return (
    <Container pattern={0} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Welcome Back
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Use your credentials below and login to your account.
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
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
          secureTextEntry
        />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginVertical="s"
          alignItems="center"
        >
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue("remember", !values.remember)}
          />
          <BorderlessButton onPress={() => navigation.navigate("ForgotPassword")}>
            <Text variant="button" color="primary">
              Forgot Password
            </Text>
          </BorderlessButton>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button variant="primary" label="Log into your account" onPress={handleSubmit} />
        </Box>
      </Box>
    </Container>
  )
})

export default Login
