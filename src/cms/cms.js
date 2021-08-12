import CMS from 'netlify-cms-app';
import axios from 'axios';
import { Widget as IdWidget } from '@ncwidgets/id'

CMS.registerWidget(IdWidget)
CMS.init()
CMS.registerEventListener({
  name: 'postPublish',
  handler: ({ author, entry }) => {
    console.log(`entry.newRecord:`, entry.newRecord); // true
    console.log(`entry.collection:`, entry.collection); // 'articles'
    console.log(`entry.data:`, entry.data); // { ... }

    axios.get('https://us-central1-shounenstop.cloudfunctions.net/ValidatePayment')
        .then(function (response) {
            console.log(response);
        });

    if (entry.newRecord && entry.collection === 'articles') {
      // trigger webhook here
    }
  },
})
