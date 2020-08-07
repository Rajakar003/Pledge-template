const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');

module.exports = {

    pledgePDF: async (req, res, db, MongoClient, transporter, protocol, hostname, port) => {
        let result = await db.collection('Client_detail').find({ "_id": new MongoClient.ObjectID(req.body._id) }).toArray();
        console.log(result[0]);
        var owner = result[0].name
        var E_address = result[0].email;
        var Contact = result[0].MobileNo;
        var SignPath = result[0].SignImage;
        var userId = result[0]._id;
        var Image = result[0].PhotoImage;
        var head = result[0].header_logo;
        var code = result[0].CouponCode
        var fra = result[0].Frame;
        var bg = result[0].Bg_image


        const options = {
            format: "A5",
            orientation: "landscape",
            //border: "10mm",
            // header: {
            //     height: "45mm",
            //     contents: '<div style="text-align: center;">Author: Mohit Kumar</div>'
            // },
            // "footer": {
            //     "height": "28mm",
            //     "contents": {
            //         first: 'Cover page',
            //         2: 'Second page', // Any page number is working. 1-based index
            //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            //         last: 'Last Page'
            //     }
            // }
        }
        Imagepath = "RSK_" + owner + Math.random().toString(36).substr(2, 9) + '.pdf';
        var output = './documents/' + Imagepath;
        console.log("This is output:" + output)

        await pdf.create(html =
            `  



            

            <html>
            <head>
                <title></title>
            </head>
            <body>
            <div class="show_frame" style="width: 100%;float: left; box-sizing: border-box;height: 100%;background-image: url(http://${bg});background-position: left top;background-repeat: no-repeat;background-size: cover">
            <div style="width: 100%; height: 100%; float: left; background-image: url(http://${fra});background-position: left top; background-size: 100% 100%;background-repeat: no-repeat;padding: 20px 0px;box-sizing: border-box;">
            <div class="details_page" style="width: 530px;max-width:100%;margin:0 auto; background-color: #fff;">
            <div class="details_head" style="width: 100%;float: left;text-align: center;margin-top: 10px;"><img style="width: 100px;" src="http://${head}"></div>
            <div class="details_block" style="width: 100%; float: left;">
                            <div class="text_details" style=" width: 33%; float: left;">
                                <h3 style="text-align: center;text-decoration: underline;margin-bottom: 20px;font-size: 14px;">The Swachh Bharat Pledge</h3>
                                <p style="margin-top: 0px; margin-bottom: 0px; font-size: 10px;text-align: justify;">Mahatma Gandhi dreamt of a Swachh India. With the Swachh Bharat Mission, the country took a strong step in this direction. It is my duty to take this progress forward by keeping my surroundings clean</p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">I pledge that I will use a toilet and ensure all members of my family do the same I will wash my hands with soap multiple times a day and observe good hygienic practices<br>
                                    I will not spit in public<br>
                                    I will not litter my surroundings
                                    </p>
                                    <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">I will share the message of Swachhata with my community, my village or city and encourage others around me to follow these Swachh practices as well</p>
                                    <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">I will also undertake shramdaan for swachhata at least two hours a week</p>
                            </div>
                            <div class="pro_sec" style="width: 30%;float: left;margin-left: 2%; margin-top: 40px;">
                                <div style="width: 10%;float: left;">&nbsp;</div>
                                <div style="width: 80%;float: left;">
                                <div class="pro_photo" style="width: 100%;float: left;display: flex;flex-direction: column;align-items: center;">
                                    <p style="margin-top: 5px; margin-bottom: 0px;font-size: 12px;width: 100%; text-align: center;font-weight: 700;">${owner}</p>
                               
                                    <img src="http://${Image}" style="width: 100%;height: 90px;border: 1px solid #000;margin: 20px 0px;">




                                    <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px; width: 100%; text-align: center;">मैं हूँ स्वच्छाग्राही</p>
                                    <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;width: 100%; text-align: center;">I am a Swachhagrahi</p>
                                </div>
                                <img src="http://${SignPath}" class="signaturepad_frame" style="margin-top: 10px;width: 100%;float: left;height: 30px;">
                                   
                                 
                                 <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;width: 100%; text-align: center;float: left;">Signature/हस्ताक्षर</p>
                                </div>
                                 <div style="width: 10%;float: left;">&nbsp;</div>
                            </div>
                            <div class="text_details" style=" width: 33%;float: left;margin-left: 2%;">
                                <h3 style="text-align: center;text-decoration: underline;margin-bottom: 20px;font-size: 14px;">स्वच्छ भारत शपथ</h3>
                                <p style="margin-top: 0px; margin-bottom: 0px;font-size: 10px;text-align: justify;">महात्मा गांधी जी ने एक स्वच्छ भारत का सपना देखा था। स्वच्छ भारत मिशन के रूप में, देश ने इस दिशा में
                                    एक मजबूत कदम उठाया है। यह मेरा कर्तव्य है कि मैं अपने आसपास साफ-सफाई रखते हुए इस प्रगति को और
                                    आगे बढ़ांऊ।
                                </p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">
                                    मैं शपथ लेता / लेती हूं कि मैं शौचालय का प्रयोग करूँगा / करूँगी और यह सुनिश्चित करूँगा / करूँगी कि मेरे
                                    परिवार के सभी सदस्य स्वच्छता का पालन करें।
                                </p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">मैं दिन में अनेक बार हाथों को साबुन से धोऊँगा / धोऊँगी और साफ-सफाई की अच्छी आदतों का पालन करूँगा
                                    / करूँगी।
                                </p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">मैं सार्वजनिक स्थानों पर नहीं थूकूँगा / थूकूँगी।।</p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">मैं अपने आसपास कोई कचरा नहीं फैलाऊँगा / फैलाऊँगी।</p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">मैं अपने समुदाय, अपने गांव अथवा शहर में स्वच्छता के संदेश का प्रचार-प्रसार करूँगा /करूँगी और अपने
                                    आसपास के अन्य लोगों को भी इन स्वच्छ आदतों का पालन करने के लिए प्रोत्साहित करूँगा / करूँगी।</p>
                                <p style="margin-top: 5px; margin-bottom: 0px;font-size: 10px;text-align: justify;">मैं सप्ताह में कम से कम दो घंटे स्वच्छता के लिए श्रमदान भी करूँगा / करूँगी।</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </body>
        </html>








            
            
`
            // this was the location of saving the pdf, so we ne
            , options).toFile(output, function (err, results) {
                console.log("Inside PDF creation", output);
                if (err) return console.log(err);
                console.log(results, "this is the response Line No.81"); // { filename: '/app/businesscard.pdf' }

                db.collection('pledge_pdf').updateMany({ userId: new MongoClient.ObjectID(userId) }, {
                    $set: {
                        "Business_Card": output
                    }
                },
                    {
                        multi: true
                    });
                try {
                    transporter.sendMail({
                        from: {
                            name: 'PMO ',
                            address: 'rsk.splat@gmail.com'
                        },
                        to: 'rajakar003@gmail.com',
                        //to: result[0].email,
                        //cc: 'rsk.splat@gmail.com',
                        //bcc: 'swathi@splatstudio.in',
                        subject: 'Pledge ' + result[0].name + ' Code - ' + result[0].CouponCode,
                        html: `<p><b>Dear Swachhagrahi,</b></p>
                                    <p><i> Thank you for visiting the Rashtriya Swachhata Kendra and taking 
                                    the pledge to sustain a Swachh Bharat. The PDF copy of your pledge 
                                    certificate is attached with this email and you can now collect a 
                                    print out of the same from the souvenir shop.</i></p> 
                                    <p></p>
                                    <p>Your code is - <b>${code} </b></p>
                                  <p>Enclosure:  <b>${Imagepath}</b></p>
                                  <p>Regards,<br>
                                  Team Rashtriya Swachhata Kendra </p>
                                  `,
                        attachments: [{
                            filename: Imagepath,
                            path: output,
                        }]
                    }, (err, info) => {
                        if (err) {
                            return console.log(err);
                        } else {

                            if (info) {
                                console.log(info, "This is infoo of mail");
                                //res.send(JSON.stringify({ res: 'Mail Sent successfully' }));                                   
                                res.send(JSON.stringify({ res: 'Mail Sent successfully' }));
                            }
                            else {
                                res.send(JSON.stringify({ res: 'Need to check the Email once again' }));
                            }
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            });

    },

}