let conversation=[
    {
        id:'001',
        type:'INFO',
        text:'Welcome to our brand new form filling experience. Lorem ipsum',
        option:''
    },
    {
        id:'002',
        type:'CHOICE',
        text:'Would you like to our Flash fill?',
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
        text:'Which option would you like to choose for flash fill',
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
    {
        id:'004',
        type:'CHOICE',
        text:'How yould you provide the ID card?',
        option:'FLASH_FILL_METHOD_OPTION',
        response:{
            positive:{
                text:'Ok',
                nextId:'['
            },
            negative:{
                text:'Ohh No',
                nextId:''
            }
        }
    },
    {
        id:'005',
        type:'INFO_PROCESS_FLASH_FILL',
        text:'Please wait while we process ..',
        option:''
    },
    {
        id:'006',
        type:'INFO',
        text:'We have successsully captured some data',
        option:''
    }
];

export default conversation;