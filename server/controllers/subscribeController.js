import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';

export default async function subscribeMailingListController(req, res) {
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    const subscriberHash = md5(req.subscriber.email.toLowerCase());
    const subscribeDetails = {
        email_address: subscriber.email,
        status: 'subscribed',
        status_if_new: 'subscribed',
        merge_fields: {
            FNAME: subscriber.firstName,
            LNAME: subscriber.lastName,
        },
    };

    try {
        const response = await mailchimp.lists.setListMember(
            listId,
            subscriberHash,
            subscribeDetails
        );

        if (response) {
            return res.status(200).json({ message: 'Success' });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message || error.toString() });
    }
}
