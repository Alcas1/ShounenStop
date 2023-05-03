require('dotenv').config()
const { SENDGRID_API_KEY } = process.env
const sgMail = require('@sendgrid/mail')

exports.handler = async (event, context, callback) => {
  sgMail.setApiKey(SENDGRID_API_KEY)

  const payload = JSON.parse(event.body)
  const customerEmail = payload.userInfo.email.replace(/\./g,'')
  const customerName = payload.userInfo.firstName + " " + payload.userInfo.lastName


  const orderConfirmationCustomer = {
    personalizations: [
      {
        to: [
          {
            email: customerEmail,
            name: customerName,
          },
        ],
        dynamic_template_data: payload,
        subject: 'Order Confirmation!',
      },
    ],
    from: {
      email: 'shounenstop@gmail.com',
      name: 'Shounen Stop',
    },
    reply_to: {
      email: 'shounenstop@gmail.com',
      name: 'Shounen Stop',
    },
    template_id: 'd-92b3e2e517114c869eb5c7e221ba85e2',
  }

  const orderInformationStore = {
    personalizations: [
      {
        to: [
          {
            email: 'shounenstop@gmail.com',
            name: 'Shounen Stop',
          },
        ],
        dynamic_template_data: payload,
        subject: 'Shipping Information',
      },
    ],
    from: {
      email: 'shounenstop@gmail.com',
      name: 'Shounen Stop',
    },
    reply_to: {
      email: 'shounenstop@gmail.com',
      name: 'Shounen Stop',
    },
    template_id: 'd-7ccebcdda57b4ffb88d2bc21407cc1f5',
  }

  const orderConfirmationStore = {
    personalizations: [
      {
        to: [
          {
            email: 'shounenstop@gmail.com',
            name: 'Shounen Stop',
          },
        ],
        dynamic_template_data: payload,
        subject: 'Order Confirmation!',
      },
    ],
    from: {
      email: 'shounenstop@gmail.com',
      name: 'Shounen Stop',
    },
    reply_to: {
      email: customerEmail,
      name: customerName,
    },
    template_id: 'd-92b3e2e517114c869eb5c7e221ba85e2',
  }


  // console.log(orderConfirmation.personalizations[0].dynamic_template_data)
  // orderConfirmation.personalizations[0].dynamic_template_data.each((data)=>{
  //   console.log(data)
  // })

  console.log(
    JSON.stringify(
      orderConfirmationStore.personalizations[0].dynamic_template_data,
      null,
      20
    )
  )
  Object.keys(
    orderConfirmationStore.personalizations[0].dynamic_template_data.productData
  ).map(key => {
    // console.log(orderConfirmation.personalizations[0].dynamic_template_data.productData[key])
  })
  
  try {
    await sgMail.send(orderConfirmationCustomer)
    await sgMail.send(orderConfirmationStore)
    await sgMail.send(orderInformationStore)

    return {
      statusCode: 200,
      body: 'Message sent',
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: e.code,
      body: e.message,
    }
  }
}
