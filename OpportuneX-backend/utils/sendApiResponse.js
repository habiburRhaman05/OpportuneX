// utils/sendApiResponse.js
const apiResponses = [
  {
    name: "UserRegistered",
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: {
      id: "user_001",
      name: "Habib Hassan",
      email: "habib@example.com"
    }
  },
  {
    name: "UserAlreadyExists",
    statusCode: 409,
    success: false,
    message: "User with this email already exists"
  },
  {
    name: "UserLoggedIn",
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
      refreshToken: "d8sfd9238r90asfj23r..."
    }
  },
  {
    name: "InvalidCredentials",
    statusCode: 401,
    success: false,
    message: "Invalid email or password"
  },
  {
    name: "EmailNotVerified",
    statusCode: 403,
    success: false,
    message: "Email not verified. Please verify your email to proceed"
  },
  {
    name: "AccountLocked",
    statusCode: 423,
    success: false,
    message: "Account is locked due to multiple failed login attempts. Please try again later or reset your password."
  },
  {
    name: "ValidationError",
    statusCode: 400,
    success: false,
    message: "Validation failed",
    errors: [
      { path: "email", message: "Valid email is required" },
      { path: "password", message: "Password must be at least 6 characters" }
    ]
  },
  {
    name: "AccessTokenExpired",
    statusCode: 401,
    success: false,
    message: "Access token expired or missing"
  },
  {
    name: "UserNotFound",
    statusCode: 404,
    success: false,
    message: "User not found"
  },
  {
    name: "ProfileUpdated",
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: {
      id: "user_001",
      name: "Habib Updated",
      profilePic: "https://cdn.example.com/habib.jpg"
    }
  },
  {
    name: "PasswordChanged",
    statusCode: 200,
    success: true,
    message: "Password changed successfully"
  },
  {
    name: "AccountDeleted",
    statusCode: 200,
    success: true,
    message: "Account deleted successfully"
  },
  {
    name: "ServerError",
    statusCode: 500,
    success: false,
    message: "Something went wrong on the server. Please try again later."
  },
  {
    name: "UserVerifiedSuccessfully",
   statusCode: 200,
  success: true,
  message: "Your email has been verified successfully. You can now log in."
  },
  {
    name: "InvalidOrExpiredToken",
    statusCode: 400,
  success: false,
  message: "Verification link is invalid or has expired"
  },
  {
    name:"AccountNotVerified",
    statusCode: 403,
  success: false,
  message: "Please verify your email before logging in"
  },{
    name:"AlreadyVerified",
        statusCode: 400,
  success: false,
  message: "Verification link is invalid or has expired"
  }
 
];


function sendApiResponse(res, responseName, data = null, errors = null) {
  const responseTemplate = apiResponses.find(r => r.name === responseName);
  if (!responseTemplate) {
    // fallback generic server error
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Unknown response name"
    });
  }

  const response = {
    statusCode: responseTemplate.statusCode,
    success: responseTemplate.success,
    message: responseTemplate.message,
  };

  if (data) response.data = data;
  if (errors) response.errors = errors;

  return res.status(responseTemplate.statusCode).json(response);
}

module.exports = sendApiResponse;
