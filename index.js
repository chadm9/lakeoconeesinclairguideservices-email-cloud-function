const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.OCONEE_SINCLAIR_GUIDE_SERVICES_SENDGRID_KEY)

exports.helloWorld = (req, res) => {
    const name = req.body?.name ?? req.body?.name ?? null;
    const email = req.body?.email ?? req.body?.email ?? null;
    const message = req.body?.message ?? req.body?.message ?? null;

    const msg = {
        to: `${process.env.EMAIL_TO_ADDRESS}`, // Change to your recipient
        from: `${process.env.EMAIL_FROM_ADDRESS}`, // Change to your verified sender
        subject: `LakeOconeeSincliarGuidService Inquiry from ${req.body.name}`,
        text: `Sender Name: ${name}\nSender Email: ${email}\nSender Message: ${message}`,
    }

    sgMail.send(msg)
        .then((response) => {
            console.log(JSON.stringify(response))
            res.status(200).send('Email sent.');
        })
        .catch((error) => {
            console.error(JSON.stringify(error))
            res.status(500).send('Email failed to send.');
        })
};