exports.NewInquiry = (email, fullName, contactNumber, msg) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>New Enquiry Alert</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
        <a href="https://ibb.co/tqX5DQH"><img class="logo" src="https://i.ibb.co/dPgyDjf/Rentez.png" alt="Rentez" border="0"></a>
            <div class="message">New Enquiry</div>
            <div class="body">
                <p>Hey dear,</p>
                <p>Congratulations, you got the enquiry from this email <span class="highlight">${email}</span>.
                </p>
                <p>Below is some detail about customer</p>
                <p>FullName : ${fullName}</p>
                <p>Email : ${email}</p>
                <p>phone Number : ${contactNumber}</p>
                <p>Message from customer : ${msg}</p>
            </div>
            </div>
    </body>
    
    </html>`;
};
