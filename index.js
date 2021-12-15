const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.OCONEE_SINCLAIR_GUIDE_SERVICES_SENDGRID_KEY)

exports.sendEmail = (req, res) => {
    const body = JSON.parse(req.body)

    const msg = {
        to: `${process.env.EMAIL_TO_ADDRESS}`,
        from: `${process.env.EMAIL_FROM_ADDRESS}`,
        subject: `LakeOconeeSincliarGuidService Inquiry from ${body?.name}`,
        text: `Sender Name: ${body?.name}\nSender Email: ${body?.email}\nSender Message: ${body?.message}`,
    }

    sgMail.send(msg)
        .then((response) => {
            res.status(200).send('Email sent.');
        })
        .catch((error) => {
            console.error(JSON.stringify(error))
            res.status(500).send('Email failed to send.');
        })
};