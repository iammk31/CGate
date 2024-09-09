import nodemailer from "nodemailer";

export const sendQuery = async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MY_GMAIL,  // Admin Gmail
        pass: process.env.MY_GMAIL_PASS,
      },
    });

    // Create the email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.MY_GMAIL,
      subject: 'User Query Submission',
      text: `You have received a new query:\n\nFrom: ${email}\nMessage: ${message}`,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Query sent successfully!' });
  } catch (error) {
    console.error('Error sending query email:', error);
    return res.status(500).json({ message: 'Error sending query email' });
  }
};


