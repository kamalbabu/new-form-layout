import options from "./optionMock";

let conversation=[
    {
        id:'001',
        type:'WELCOME',
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
    }
];

export default conversation;