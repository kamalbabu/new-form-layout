let conversation=[
    {
        id:'001',
        type:'INFO',
        text:'Hello ! I am your virtual advisor. Let me help you fill out your applicaiton form.',
        option:''
    },
    {
        id:'002',
        type:'CHOICE',
        text:'Would you like to scan an identification document for a faster form filling experience?',
        option:'YES_OR_NO',
        response:{
            positive:{
                text:'Got it',
                nextId:'003'
            },
            negative:{
                text:'Ohh',
                nextId:'006'
            }
        }
    },
    {
        id:'003',
        type:'CHOICE',
        text:'Which identification document would you like to use?',
        option:'FLASH_FILL_OPTION',
        response:{
            positive:{
                text:'Ok',
                nextId:'004'
            },
            negative:{
                text:'Ohh',
                nextId:'006'
            }
        }
    },
    // {
    //     id:'004',
    //     type:'CHOICE',
    //     text:'How yould you provide the ID card?',
    //     option:'FLASH_FILL_METHOD_OPTION',
    //     response:{
    //         positive:{
    //             text:'Ok',
    //             nextId:'['
    //         },
    //         negative:{
    //             text:'Ohh No',
    //             nextId:''
    //         }
    //     }
    // },
    {
        id:'005',
        type:'INFO_PROCESS_FLASH_FILL',
        text:'Please wait while we process your document',
        option:''
    },
    {
        id:'006',
        type:'INFO',
        text:'We have prefilled some information for you from the document',
        option:''
    },
    {
        id:'007',
        type:'CHOICE',
        text:'Shall we proceed to next section?',
        option:'YES_OR_NO'
    }
];

export default conversation;