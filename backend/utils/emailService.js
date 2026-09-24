const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force Node to use IPv4 instead of IPv6 for the socket
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendAdminNotification = async (type, data) => {
  try {
    const transporter = createTransporter();
    
    let subject, htmlContent;
    
    if (type === 'consultation') {
      subject = `New Consultation Request from ${data.name}`;
      htmlContent = `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
        <p><strong>Service Requested:</strong> ${data.service}</p>
        <p><strong>Details:</strong> ${data.details || 'N/A'}</p>
        <br/>
        <p><a href="https://bluewater-capital.vercel.app/admin">View in Admin Panel</a></p>
      `;
    } else if (type === 'resource') {
      subject = `New Library Resource Request from ${data.name}`;
      htmlContent = `
        <h2>New Library Resource Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Organization:</strong> ${data.organization || 'N/A'}</p>
        <p><strong>Requested Document:</strong> ${data.requestedDocument}</p>
        <p><strong>Details:</strong> ${data.requestDetails || 'N/A'}</p>
        <br/>
        <p><a href="https://bluewater-capital.vercel.app/admin">View in Admin Panel</a></p>
      `;
    }

    await transporter.sendMail({
      from: `"Blue Water Capital Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to the admin's own email
      subject: subject,
      html: htmlContent
    });
    
    console.log(`Admin notification sent for ${type}`);
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

const sendClientConfirmation = async (type, data) => {
  try {
    const transporter = createTransporter();
    
    let subject = "Thank you for contacting Blue Water Capital";
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0b1f3a;">Hello ${data.name},</h2>
        <p>Thank you for reaching out to Blue Water Capital.</p>
        <p>We have successfully received your ${type === 'consultation' ? 'consultation request' : 'resource request'}. Our team is currently reviewing your details and will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The Blue Water Capital Team</strong></p>
        <p><a href="https://bluewater-capital.vercel.app" style="color: #398ecb;">www.bluewatercapital.com</a></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Blue Water Capital" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: subject,
      html: htmlContent
    });
    
    console.log(`Client confirmation sent for ${type}`);
  } catch (error) {
    console.error('Error sending client confirmation:', error);
  }
};

module.exports = {
  sendAdminNotification,
  sendClientConfirmation
};
