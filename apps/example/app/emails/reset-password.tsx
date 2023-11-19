import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import LinearLogo from "./assets/logo.png";

interface ResetPasswordProps {
  resetLink?: string;
}

export const ResetPassword = ({ resetLink }: ResetPasswordProps) => (
  <Html>
    <Head />
    <Preview>Your login code</Preview>
    <Body style={mainStyle}>
      <Container>
        <Img src={LinearLogo} width="33" height="25" alt="Remix Mailer" />
        <Heading style={headingStyle}>Lets reset your password.</Heading>
        <Link href={resetLink}>Reset Password</Link>
        <Text style={paragraphStyle}>
          This password reset link will be valid for 5 minutes. If this link
          does not work, copy and paste the following link into your
          browser&rsquo;s address bar.
        </Text>
        <code style={codeStyle}>{resetLink}</code>
        <Hr style={hrStyle} />
        <Text style={footerStyle}>
          If you didn&#39;t request this password reset, please ignore this
          message.
        </Text>
      </Container>
    </Body>
  </Html>
);

ResetPassword.PreviewProps = {
  resetLink: "https://github.com/gregermendle/remix-mailer",
} as ResetPasswordProps;

export default ResetPassword;

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

const paragraphStyle = {
  paddingTop: "14px",
};

const codeStyle = {
  fontSize: "12px",
  backgroundColor: "#ebebeb",
  padding: "4px 2px",
  borderRadius: "4px",
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
