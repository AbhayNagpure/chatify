import { Resend } from 'resend';
import { createWelcomeEmailTemplate } from './emailTemplate.js';
import { ENV } from '../lib/env.js';

const emailNotification = async (name, email, clientURL) => {
    try {
        const resend = new Resend(ENV.RESEND_API_KEY);
        
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'tilakchandnagpure1980@gmail.com', // Force recipient to the verified test email so sandbox never fails
        subject: 'Welcome to Chatify, The protected chat platform',
        html: createWelcomeEmailTemplate(name, clientURL || 'http://localhost:5173')
        });
        
        console.log(`Success: Welcome email sent to tilakchandnagpure1980@gmail.com for signup of ${name} (${email})`);
    } catch (error) {
        console.error("Error in sending email:", error.message)
    }
}   

export default emailNotification;