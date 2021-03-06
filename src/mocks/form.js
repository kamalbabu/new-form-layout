let formCategory =[
    {
        id:'FORM_CAT_PERSONAL',
        name:'Personal Details',
        progress:0
    },
    {
        id:'FORM_CAT_ID',
        name:'Identification Details',
        progress:0
    },
    {
        id:'FORM_CAT_ACCOUNTSETUP',
        name:'Account Preference',
        progress:0
    }
];


let formDetails=[
    {
        id:'2001',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'FULL_NAME',
        fieldName:'Name',
        option:[],
        value:''
    },
    {
        id:'2002',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'DATE_OF_BIRTH',
        fieldName:'Date of Birth',
        option:[],
        value:''
    },
    {
        id:'2003',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'GENDER',
        fieldName:'Gender',
        option:['Male','Female'],
        value:''
    },
    {
        id:'2004',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'EMAIL',
        fieldName:'Email Id',
        option:[],
        value:''
    },
    {
        id:'2005',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'PHONE_HOME',
        fieldName:'Phone(Home)',
        option:[],
        value:''
    },
    {
        id:'2006',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'PHONE_MOBILE',
        fieldName:'Phone(Mobile',
        option:[],
        value:''
    },
    {
        id:'2007',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'ADDRESS',
        fieldName:'Address',
        option:[],
        value:''
    },
    {
        id:'2008',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'NATIONALITY',
        fieldName:'Nationality',
        option:[],
        value:''
    },
    {
        id:'2009',
        cat:'FORM_CAT_PERSONAL',
        fieldId:'MARTIAL_STATUS',
        fieldName:'Martial Status',
        option:['Single','Married'],
        value:''
    },
    {
        id:'2010',
        cat:'FORM_CAT_ID',
        fieldId:'AADHAR',
        fieldName:'Aadhaar Number',
        option:[],
        value:''
    },
    {
        id:'2011',
        cat:'FORM_CAT_ID',
        fieldId:'PASSPORT',
        fieldName:'Passport Number',
        option:[],
        value:''
    },
    {
        id:'2012',
        cat:'FORM_CAT_ID',
        fieldId:'PAN',
        fieldName:'PAN Number',
        option:[],
        value:''
    },
    {
        id:'2013',
        cat:'FORM_CAT_ID',
        fieldId:'DRIVING_LICENSE',
        fieldName:'Driving License Number',
        option:[],
        value:''
    },
    {
        id:'2014',
        cat:'FORM_CAT_ACCOUNTSETUP',
        fieldId:'DRIVING_LICENSE',
        option:['Yes','No'],
        value:''
    }
];



let aadharData =[
    {
        id:'FULL_NAME',
        value:'John Smith'
    },
    {
        id:'DATE_OF_BIRTH',
        value:'01/03/1985'
    },
    {
        id:'GENDER',
        value:'Male'
    },
    {
        id:'EMAIL',
        value:'john@smith.com'
    },
    {
        id:'ADDRESS',
        value:'445 Mount Eden Road, Mount Eden, Auckland'
    },
    {
        id:'PHONE_HOME',
        value:'485-123-12353'
    },
    {
        id:'PHONE_MOBILE',
        value:'+919283837423'
    },
    {
        id:'NATIONALITY',
        value:'Indian'
    },
    {
        id:'MARTIAL_STATUS',
        value:'Single'
    },
    {
        id:'AADHAR',
        value:'9874 8574 38234'
    }    
]



let formInfo ={
    formCategory:formCategory,
    formDetails:formDetails,
    flashFillPersonal:aadharData
}


export default formInfo;