import React from "react"
import { Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { useFormik } from "formik"
import * as Yup from "yup"

import { AuthNavigationProps } from "../../components/base-components/Navigation"
import TextInput from "../../components/base-components/Form/TextInput"
import { Container, Box, Text, Button } from "../../components/base-components"
import Footer from "./components/Footer"
import { passwordReset } from "../../components/base-components/Firebase"

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})

const ForgotPassword = observer(function ForgotPassword() {
  const navigation = useNavigation()

  async function handlePasswordReset(values) {
    const { email } = values
    try {
      await passwordReset(email)
      navigation.navigate("PasswordChanged")
    } catch (error) {
      // setCustomError(error.message);
      console.log("Erreur de reset mot de passe")
    }
  }

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: { email: "" },
    onSubmit: (values) => handlePasswordReset(values),
  })

  const footer = (
    <Footer
      title="Not working?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  )

  return (
    <Container pattern={2} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Forgot Password?
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Enter the email address associated with your account.
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
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button variant="primary" label="Reset Password" onPress={handleSubmit} />
        </Box>
      </Box>
    </Container>
  )
})

export default ForgotPassword
