import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import LinearLogo from "./assets/logo.png";

interface LoginCodeProps {
  code?: string;
}

export const LoginCode = ({ code }: LoginCodeProps) => (
  <Html>
    <Head />
    <Preview>Your login code</Preview>
    <Body style={mainStyle}>
      <Container>
        <Img src={LinearLogo} width="33" height="25" alt="Remix Mailer" />
        <Heading style={headingStyle}>Your verification code.</Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraphStyle}>
          Your verification code will expire in 5 minutes. Head back to the
          login page and enter the verification code shown above. Please do not
          share this code with anyone.
        </Text>
        <Hr style={hrStyle} />
        <Text style={footerStyle}>
          If you didn&#39;t request this verification code, please ignore this
          message.
        </Text>
      </Container>
    </Body>
  </Html>
);

LoginCode.PreviewProps = {
  code: "3937727",
} as LoginCodeProps;

export default LoginCode;

const mainStyle = {
  padding: "20px 14px",
  backgroundColor: "white",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const headingStyle = {
  paddingTop: "20px",
  fontSize: "22px",
};

const codeStyle = {
  fontFamily: "monospace",
  fontSize: "16px",
  width: "100%",
  letterSpacing: 16,
};

const paragraphStyle = {
  paddingTop: "14px",
};

const hrStyle = {
  marginTop: "80px",
  borderColor: "black",
};

const footerStyle = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#ababab",
};
