import md5 from 'md5';

async function subscribeMailingListController(
    mcListId,
    subscriber,
    mailchimp,
    res
) {
    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    const subscriberHash = md5(subscriber.email.toLowerCase());

    try {
        const response = await mailchimp.lists.setListMember(
            listId,
            subscriberHash,
            {
                email_address: subscriber.email,
                status: 'subscribed',
                status_if_new: 'subscribed',
                merge_fields: {
                    FNAME: subscriber.firstName,
                    LNAME: subscriber.lastName,
                },
            }
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

export default subscribeMailingListController;
