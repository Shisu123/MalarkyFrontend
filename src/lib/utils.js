import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Set a reasonable expiration time for the token
  });

  // Send the token as a secure, HttpOnly cookie
  res.cookie('jwt', token, { 
    httpOnly: true, // Cookie is only accessible via HTTP, not JS
    secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Token will expire after 1 day
  });
};
